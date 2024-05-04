import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
} from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll';
// import RNFetchBlob from "rn-fetch-bloevb";
import ReactNativeBlobUtil from 'react-native-blob-util';

import {Image} from 'react-native-elements';
import moment from 'moment';
import Modal from '../../modal';
import styles from './styles';
import {getDefaultLanguage} from '@utils/helper';
import axios from 'axios';
import {API_TRANSLATE_KEY, URL_GOOGLE_TRANSLATE} from 'constants/config';
import ImageViewer from 'react-native-image-zoom-viewer';
import {strings} from '@utils/i18n';
import Hyperlink from 'react-native-hyperlink';
import {decode} from 'html-entities';
import colors from 'constants/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import * as appString from 'constants/appString';
import {useSelector} from 'react-redux';
import {RootState} from 'reducers/';
import BaseService from 'services';
//define value for image
const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;

let children: JSX.Element | null = null;

const ChatLineHolder = (props: any) => {
  const user: any = useSelector<RootState>(
    (state: RootState) => state.user.profile,
  );
  const {item, currentPeerUser, style} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [translate, setTranslate] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isLike, setIsLike] = useState<boolean>();

  const onShowImage = async (url: string) => {
    const images = [
      {
        // Simplest usage.
        url: url,
      },
    ];
    children = (
      <ImageViewer
        menuContext={{saveToLocal: 'save to the album', cancel: 'cancel'}}
        onSwipeDown={() => {
          setModalVisible(false);
        }}
        enableSwipeDown={true}
        onSave={(url: string) => checkPermission(url)}
        imageUrls={images}
      />
    );
    // show modal
    setModalVisible(true);
  };

  const getExtention = (filename: any) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const saveToGallery = async (url: any) => {
    let newImgUri = url.lastIndexOf('/');
    let imageName = url.substring(newImgUri);

    let dirs = ReactNativeBlobUtil.fs.dirs;
    let path =
      Platform.OS === 'ios'
        ? dirs['MainBundleDir'] + imageName
        : dirs.PictureDir + imageName;

    if (Platform.OS == 'android') {
      let date = new Date();
      // Image URL which we want to download
      let image_URL = url;
      // Getting the extention of the file
      let ext = getExtention(image_URL);
      ext = '.' + ext[0];
      // Get config and fs from RNFetchBlob
      // config: To pass the downloading related options
      // fs: Directory path where we want our image to download
      const {config, fs} = ReactNativeBlobUtil;
      let PictureDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            PictureDir +
            '/image_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            ext,
          description: 'Image',
        },
      };
      config(options)
        .fetch('GET', image_URL)
        .then(res => {
          // Showing alert after successful downloading
          // console.log('res -> ', JSON.stringify(res));
          // Alert.alert('Image Downloaded Successfully.');
          ToastAndroid.show(
            'Image Downloaded Successfully.',
            ToastAndroid.SHORT,
          );
        });
    } else {
      CameraRoll.save(url, 'photo')
        .then(onfulfilled => {
          // ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);
        })
        .catch(error => {
          // ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
        });
    }
  };
  const checkPermission = async (url: any) => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      saveToGallery(url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'App need this permission to access your storage',
            message: '',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          saveToGallery(url);
        } else {
          // If permission denied then show alert
          Alert.alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const toggleLike = async (item: any) => {
    // let body = {
    //   type: "Liked",
    //   userId: '',
    //   isLike: isLike,
    //   idSend: item.idSend,
    //   idTo: item.idTo,
    //   isGroup: item.isGroup ? true : false,
    //   data: item
    // }
    const query = firestore()
      .collection(appString.MESSAGES)
      .doc(`${currentPeerUser.id}-${currentPeerUser.idSend}`);
    if (item.likes && item.likes.includes(user.name)) {
      let body = {
        type: 'Liked',
        isLike: false,
        idSend: item.idSend,
        idTo: item.idTo,
        isGroup: item.isGroup ? true : false,
        data: item,
      };
      query
        .collection(`${currentPeerUser.id}-${currentPeerUser.idSend}`)
        .doc(item.time)
        .update({likes: firestore.FieldValue.arrayRemove(user.name)});

      const response = await BaseService.instance.user.trackingChat(body);
      if (response) {
        console.log('unlike', response);
      }
    } else {
      let body = {
        type: 'Liked',
        isLike: true,
        idSend: item.idSend,
        idTo: item.idTo,
        isGroup: item.isGroup ? true : false,
        data: item,
      };
      query
        .collection(`${currentPeerUser.id}-${currentPeerUser.idSend}`)
        .doc(item.time)
        .update({likes: firestore.FieldValue.arrayUnion(user.name)});

      const response = await BaseService.instance.user.trackingChat(body);
      if (response) {
        console.log('like', response);
      }
    }
    // const response = await BaseService.instance.user.trackingChat(body);
    // if (response) {
    //   // console.log('response', response)
    // }
  };
  const onTranslate = async (item: any) => {
    let body = {
      type: 'Translate',
      idSend: item.idSend,
      idTo: item.idTo,
      isGroup: item.isGroup ? true : false,
      data: item,
    };
    if (currentPeerUser && translate === '') {
      const toLanguage = (await getDefaultLanguage()) || 'en';
      let fromLanguage;
      if (toLanguage == 'en') {
        fromLanguage = 'vi';
      } else {
        fromLanguage = 'en';
      }

      const instance = axios.create();

      try {
        const res = await instance({
          method: 'post',
          url: `${URL_GOOGLE_TRANSLATE}?key=${API_TRANSLATE_KEY}`,
          data: {
            source: fromLanguage,
            target: toLanguage,
            q: item.content,
          },
        });

        setTranslate(
          decode(res?.data?.data?.translations[0]?.translatedText || ''),
        );

        const response = await BaseService.instance.user.trackingChat(body);
        if (response) {
          // console.log('response', response)
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsShow(!isShow);
  };

  return (
    <View style={[styles.container, {marginBottom: isShow ? 20 : 10}]}>
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        children={children}
      />
      {/* <View style={styles.itemLeft}>
        <Image
          style={styles.tinyLogo}
          source={{ uri: `data:image/*;base64,${currentPeerUser.photoUrl}` }}
        />
      </View> */}
      {item?.type !== 2 ? (
        <TouchableOpacity
          onPress={() => onTranslate(item)}
          activeOpacity={1}
          style={[
            styles.content,
            style,
            {
              marginLeft: 50,
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.gray,
              paddingBottom: 40,
            },
          ]}>
          <Hyperlink
            linkDefault={true}
            linkStyle={{textDecorationLine: 'underline'}}>
            <Text style={{color: '#000', fontSize: 18}}>{item.content}</Text>
          </Hyperlink>
          {isShow && translate !== '' ? (
            <Text style={{color: 'blue'}}> {'\n' + translate}</Text>
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            marginLeft: 50,
            width: W * 0.75,
            height: H * 0.15,
            marginRight: 40,
          }}
          onPress={() => onShowImage(item.content)}>
          <Image
            style={{
              width: W * 0.75,
              height: H * 0.15,
              aspectRatio: 2,
              marginTop: 5,
              marginBottom: 10,
            }}
            source={{uri: item.content}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </TouchableOpacity>
      )}
      {/* SHOW LIKE */}
      {!!item.likes.length ? (
        <View
          style={{
            width: 65,
            height: 30,
            borderRadius: 20,
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 5,
            right: 90,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.gray,
          }}>
          <Icon name="like1" size={15} color={colors.redBold} />
          <Text style={{marginLeft: 5}}>{item.likes.length}</Text>
        </View>
      ) : null}
      {/* LIKE */}
      <TouchableOpacity
        onPress={() => toggleLike(item)}
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 5,
          right: 50,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: colors.gray,
        }}>
        <Icon
          name={item.likes.includes(user.name) ? 'like1' : 'like2'}
          size={15}
          color={item.likes.includes(user.name) ? colors.redBold : colors.gray}
        />
      </TouchableOpacity>

      <Text
        style={{
          position: 'absolute',
          bottom: -15,
          right: 36,
          fontSize: 10,
          color: '#0000',
        }}>
        {isShow
          ? moment(Number(item.time)).calendar(null, {
              sameDay: 'hh:mm A',
              lastDay: `hh:mm A [${strings('yesterday')}]`,
              lastWeek: 'hh:mm A ddd',
              sameElse: 'hh:mm A DD/MM/YYYY',
            })
          : ''}
      </Text>
      {item.pending === 1 && !currentPeerUser ? (
        <ActivityIndicator size="small" color="#00ff00" />
      ) : null}
    </View>
  );
};
export default ChatLineHolder;
