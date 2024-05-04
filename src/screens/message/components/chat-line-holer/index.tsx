import {IC_TRASH} from '@assets/index';
import {RootState} from '@reducers/index';
import {getDefaultLanguage, getToken} from '@utils/helper';
import {strings} from '@utils/i18n';
import axios from 'axios';
import * as appString from 'constants/appString';
import colors from 'constants/colors';
import {API_TRANSLATE_KEY, URL_GOOGLE_TRANSLATE} from 'constants/config';
import {decode} from 'html-entities';
import moment from 'moment';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image as IMGDefault,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll';
// import RNFetchBlob from "rn-fetch-blob";
import ReactNativeBlobUtil from 'react-native-blob-util';

import {Image} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Hyperlink from 'react-native-hyperlink';
import ImageViewer from 'react-native-image-zoom-viewer';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Modal from '../modal';
import styles from './styles';
import {isIOS} from '@constants/platform';
import BaseService from 'services';
//define value for image
const W = Dimensions.get('window').width;
const H = Dimensions.get('window').height;
let children: JSX.Element | null = null;

const ChatLineHolder = (props: any) => {
  const {item, currentPeerUser, style} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [translate, setTranslate] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isShowShowBtnDelete, setIsShowBtnDelete] = useState(false);
  const timeRecall: any = useSelector<RootState>(
    (state: RootState) => state.setting.timeRecall,
  );

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
    setIsShowBtnDelete(false);
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
          // console.log('Storage Permission Granted.');
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
    setIsShowBtnDelete(false);
  };

  const onLongPressMSG = () => {
    if (moment().diff(moment(Number(item.time)), 'days') > timeRecall) {
      return;
    }
    setIsShowBtnDelete(true);
  };

  const onPressReCall = async (item: any) => {
    let body = {
      type: 'Recalled',
      idSend: item.idSend,
      idTo: item.idTo,
      isGroup: item.isGroup ? true : false,
      data: item,
    };

    let groupChatId = '';
    if (hashString(item.idSend) <= hashString(item.idTo)) {
      groupChatId = `${item.idSend}-${item.idTo}`;
    } else {
      groupChatId = `${item.idTo}-${item.idSend}`;
    }

    const query = firestore().collection(appString.MESSAGES).doc(groupChatId);
    query
      .collection(groupChatId)
      .doc(item.time)
      .update({isDelete: 1, pending: 0});
    query.update({isDelete: 1});
    const response = await BaseService.instance.user.trackingChat(body);

    // console.log('response', response)
    if (response) {
      // console.log('response', response.success)
    }
    setIsShowBtnDelete(false);
  };

  return (
    <View
      style={[
        styles.container,
        {marginBottom: isShow ? 20 : 10, position: 'relative'},
      ]}>
      {!currentPeerUser && isShowShowBtnDelete && (
        <TouchableOpacity
          onPress={() => onPressReCall(item)}
          style={[
            styles.containerDelete,
            currentPeerUser ? styles.leftDelete : styles.rightDelete,
          ]}>
          <IMGDefault style={styles.icontrash} source={IC_TRASH}></IMGDefault>
        </TouchableOpacity>
      )}
      <Modal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        children={children}
      />
      {currentPeerUser ? (
        <View style={styles.itemLeft}>
          {currentPeerUser.photoUrl ? (
            <Image
              style={styles.tinyLogo}
              source={{uri: `data:image/*;base64,${currentPeerUser.photoUrl}`}}
            />
          ) : (
            <View style={styles.textLogo}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 8}}>
                {getInitials(currentPeerUser.nickName)}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View></View>
      )}
      {item?.type != 2 || item?.isDelete == 1 ? (
        <TouchableOpacity
          onPress={() => onTranslate(item)}
          onLongPress={onLongPressMSG}
          disabled={item?.isDelete}
          style={[
            styles.content,
            style,
            {
              marginLeft: !currentPeerUser ? 5 : 40,
              backgroundColor: currentPeerUser ? '#F1F1F1' : colors.colorMSG,
            },
            item?.isDelete && {backgroundColor: '#BEBEBE'},
          ]}>
          <Hyperlink
            linkDefault={true}
            linkStyle={{textDecorationLine: 'underline'}}>
            <Text
              style={[
                {color: currentPeerUser ? '#000' : '#ffffff', fontSize: 18},
                item?.isDelete ? {fontStyle: 'italic'} : {},
              ]}>
              {item?.isDelete ? strings('RECALLED_MESSAGE') : item.content}
            </Text>
          </Hyperlink>
          {isShow && translate !== '' ? (
            <Text style={{color: 'blue'}}> {'\n' + translate}</Text>
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={item?.isDelete}
          style={{marginLeft: 40}}
          onPress={() => onShowImage(item.content)}
          onLongPress={onLongPressMSG}>
          <Image
            style={{
              width: W * 0.6,
              height: H * 0.15,
              aspectRatio: 2,
              marginTop: 5,
              marginBottom: 10,
              marginRight: isIOS ? 10 : 25,
              marginLeft: 5,
              borderRadius: 10,
            }}
            source={{uri: item.content}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </TouchableOpacity>
      )}

      <Text
        style={
          currentPeerUser
            ? {
                position: 'absolute',
                bottom: -15,
                left: 40,
                fontSize: 10,
                color: '#171616',
              }
            : {
                position: 'absolute',
                bottom: -15,
                right: 36,
                fontSize: 10,
                color: '#171616',
              }
        }>
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
      {!currentPeerUser ? (
        <Icon
          style={{
            position: 'absolute',
            bottom: item.type == 2 ? 10 : 0,
            right: 10,
          }}
          name="check-all"
          size={20}
          color={item.isSeen ? colors.colorMSG : colors.gray}
        />
      ) : null}
    </View>
  );
};
export default ChatLineHolder;

function getInitials(str: string) {
  let names = str?.split(' ') || [],
    initials = names[0]?.substring(0, 1)?.toUpperCase() || '';
  if (names.length > 1) {
    initials += names[names.length - 1]?.substring(0, 1)?.toUpperCase() || '';
  }
  return initials;
}

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};
