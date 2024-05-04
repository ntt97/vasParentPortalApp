import React, {useEffect, useState} from 'react';
import NavigationActionsService from '@utils/navigation';
import {
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
  AppState,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
} from 'react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {BACK_ARROW} from 'assets';
import ChatLineHolder from '../chat-line-holer';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import {ViewVertical} from '@components/viewBox.component';
import styles from './styles';
import Header from 'components/header/header.component';
import colors from 'constants/colors';
import * as appString from 'constants/appString';
import {fontSizes, fontFamilies} from 'constants/fonts';
import ToastComponent from 'components/toast.component';
import {strings} from '@utils/i18n';
import Icon from 'react-native-vector-icons/FontAwesome';
import BaseService from 'services';
import {useSelector} from 'react-redux';
import {RootState} from '@reducers/index';

let currentPeerUser: {id: any; nickName: string} | {id: ''; nickName: ''} = {
  id: '',
  nickName: '',
};
let currentUser: {id: any; nickName: string} | {id: ''; nickName: ''} = {
  id: '',
  nickName: '',
};
let groupChatId: string | '' = '';
let subscriber: Function = function () {};
let limit = 15;
let length = 0;
let limit100 = 0;
function ChatScreen(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [chatData, setChatData] = useState([]);
  const [chatInputContent, setChatInputContent] = useState('');
  const [isBlock, setIsBlock] = useState(false);
  const userRedux: any = useSelector<RootState>(
    (state: RootState) => state.user.profile,
  );

  const currentName =
    userRedux?.parentsChildren
      ?.map(
        (item: any) =>
          `${item.student.fullname} - ${item?.student?.gradeClass?.name || ''}`,
      )
      .join(', ')
      .toUpperCase() || '';
  const childName = `${capitalizeFirstLetter(userRedux?.name || '')} - ${
    userRedux?.relationship || ''
  }`;

  const onHandleChange = (text: React.SetStateAction<string>) => {
    setChatInputContent(text);
  };
  const getListHistory = () => {
    setIsLoading(true);
    let listMessage: never[] = [];
    subscriber = firestore()
      .collection(appString.MESSAGES)
      .doc(groupChatId)
      .collection(groupChatId)
      .orderBy('time', 'DESC')
      .limit(limit)
      .onSnapshot(documentSnapshot => {
        documentSnapshot.forEach((change: any) => {
          if (
            change.data().idTo === currentUser.id &&
            change.data()?.isSeen === 0
          ) {
            change.ref.update({isSeen: 1});
            firestore()
              .collection(appString.MESSAGES)
              .doc(groupChatId)
              .update({isSeen: 1});
          }
          listMessage.push(change.data() as never);
        });
        setChatData(listMessage);
        listMessage = [];
      });
  };

  const blockChat = async () => {
    const block = await BaseService.instance.teacher.getTeacherById(
      currentUser.id,
      currentPeerUser.id,
    );
    if (block) {
      setIsBlock(true);
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    if (props?.user && props?.item) {
      currentPeerUser = props?.item;
      currentUser = props?.user;
      if (hashString(currentUser.id) <= hashString(currentPeerUser.id)) {
        groupChatId = `${currentUser.id}-${currentPeerUser.id}`;
      } else {
        groupChatId = `${currentPeerUser.id}-${currentUser.id}`;
      }
      getListHistory();
      blockChat();
      const day = moment().format('L');
      firestore()
        .collection(appString.MESSAGES)
        .doc(groupChatId)
        .collection(groupChatId)
        .where('day', '=', day)
        .get()
        .then(res => {
          limit100 = res.docs.length;
        });
    }

    return () => {
      limit = 15;
      length = 0;
      limit100 = 0;
      subscriber();
      AppState.removeEventListener('change', handleAppStateChange);
      if (!currentUser.id) return;
      let url = `/${appString.USERS}/${currentUser.id}`;
      database().ref(url).update({
        chattingWith: '',
      });
    };
  }, []);

  const handleAppStateChange = async (params: any) => {
    if (params === 'active') {
      let url = `/${appString.USERS}/${currentUser.id}`;
      database().ref(url).update({
        chattingWith: currentPeerUser.id,
      });
      getListHistory();
    }
    if (params === 'background') {
      subscriber();
      limit = 15;
      length = 0;
    }
  };

  const _sendMessage = async () => {
    limit100++;
    if (limit100 === 101) {
      BaseService.instance.teacher.overLimitMessage(
        currentPeerUser.id,
        currentUser.id,
      );
    }
    if (chatInputContent.trim() === '') {
      return;
    }
    const day = moment().format('L');
    const timestamp = moment().valueOf().toString();
    const itemMessage = {
      idSend: currentUser.id,
      idTo: currentPeerUser.id,
      time: timestamp,
      content: chatInputContent.trim(),
      isSeen: 0,
      type: 1,
      pending: 1,
      day: day,
      nickNameSend: currentName || '',
      nickNameTo: currentPeerUser.nickName.toUpperCase(),
      nickNameChild: childName || '',
    };
    const query = firestore().collection(appString.MESSAGES).doc(groupChatId);
    query
      .collection(groupChatId)
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        query.collection(groupChatId).doc(timestamp).update({pending: 0});
      })
      .catch(err => {
        ToastComponent('ERROR', strings(err));
      });

    query.set({
      idSend: currentUser.id,
      nickNameSend: currentName || '',
      idTo: currentPeerUser.id,
      nickNameTo: currentPeerUser.nickName.toUpperCase(),
      nickNameChild: childName || '',
      time: timestamp,
      content: chatInputContent.trim(),
      isSeen: 0,
      type: 1,
      arrId: [currentUser.id, currentPeerUser.id],
    });

    setChatInputContent('');
  };

  const _renderChatLine = (item: any, index: number) => {
    let flag = false;

    if (index <= chatData.length - 2) {
      if (
        moment(Number((chatData[index] as any).time)).format('DD/MM/YY') !=
        moment(Number((chatData[index + 1] as any).time)).format('DD/MM/YY')
      ) {
        flag = true;
      }
    }

    if (index === chatData.length - 1) {
      flag = true;
    }

    if (item.idSend === currentUser.id) {
      return (
        <View style={{alignItems: 'flex-end'}}>
          {flag ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-start',
                width: '100%',
              }}>
              <Text style={{color: colors.gray}}>
                {moment(Number(item.time)).calendar(null, {
                  sameDay: 'hh:mm A',
                  lastDay: `[${strings('yesterday')}] hh:mm A`,
                  lastWeek: 'ddd hh:mm A',
                  sameElse: 'DD/MM/YYYY',
                })}
              </Text>
            </View>
          ) : null}
          <ChatLineHolder item={item} />
        </View>
      );
    }

    return (
      <View style={{alignItems: 'flex-start'}}>
        {flag ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
              width: '100%',
            }}>
            <Text style={{color: colors.gray}}>
              {moment(Number(item.time)).calendar(null, {
                sameDay: 'hh:mm A',
                lastDay: `[${strings('yesterday')}] hh:mm A`,
                lastWeek: 'ddd hh:mm A',
                sameElse: 'DD/MM/YYYY',
              })}
            </Text>
          </View>
        ) : null}
        <ChatLineHolder currentPeerUser={currentPeerUser} item={item} />
      </View>
    );
  };

  const openPickerImage = async () => {
    let quality = 1;
    const config = await BaseService.instance.event.getImageConfig();
    if (config) {
      quality = Number(config[0]?.value[1]?.value || 1);
    }

    ImagePicker.openPicker({
      compressImageQuality: quality,
    })
      .then(image => {
        uploadFile(image);
      })
      .catch(e => {
        ToastComponent('ERROR', strings(e));
      });
  };

  const openCamera = async () => {
    let quality = 1;
    const config = await BaseService.instance.event.getImageConfig();
    if (config) {
      quality = Number(config[0]?.value[1]?.value || 1);
    }

    ImagePicker.openCamera({
      compressImageQuality: quality,
    })
      .then(image => {
        uploadFile(image);
      })
      .catch(e => {
        ToastComponent('ERROR', strings(e));
      });
  };

  const uploadFile = async (image: any) => {
    let size = 10000000;
    const config = await BaseService.instance.event.getImageConfig();
    if (config) {
      size = Number(config[0]?.value[0]?.value || 1);
    }

    if (image.size > size) {
      ToastComponent('ERROR', strings('userProfile_msgImagePickerFail'));
      return;
    }
    const timestamp = moment().valueOf().toString();
    if (image) {
      const itemMessage = {
        idSend: currentUser.id,
        idTo: currentPeerUser.id,
        time: timestamp,
        content: image.path,
        type: 2,
        isSeen: 0,
        pending: 1,
        nickNameSend: currentName || '',
        nickNameTo: currentPeerUser.nickName.toUpperCase(),
        nickNameChild: childName || '',
      };
      const query = firestore().collection(appString.MESSAGES).doc(groupChatId);
      query
        .collection(groupChatId)
        .doc(timestamp)
        .set(itemMessage)
        .then(res => {
          let reference = storage().ref(`chat.images/${timestamp}`);
          reference.putFile(image.path).then(value => {
            query
              .collection(groupChatId)
              .doc(timestamp)
              .update({pending: 0, content: value.downloadURL})
              .catch(() => {
                // query.collection(groupChatId)
                //       .doc(timestamp)
              });
          });
        })
        .catch(err => {
          ToastComponent('ERROR', strings(err));
        });

      query.set({
        idSend: currentUser.id,
        nickNameSend: currentName,
        idTo: currentPeerUser.id,
        nickNameTo: currentPeerUser.nickName.toUpperCase(),
        nickNameChild: childName || '',
        time: timestamp,
        content: 'photo',
        isSeen: 0,
        type: 2,
        arrId: [currentUser.id, currentPeerUser.id],
      });
    }
  };
  const handleLoadMore = async () => {
    if (chatData.length < length) {
      setIsLoading(false);
      return;
    }
    limit += 15;
    length = limit;
    setIsLoading(true);
    let listMessage: never[] = [];
    const data = await firestore()
      .collection(appString.MESSAGES)
      .doc(groupChatId)
      .collection(groupChatId)
      .orderBy('time', 'desc')
      .limit(limit)
      .get();
    data.docs.forEach((item: any) => {
      listMessage.push(item.data() as never);
    });
    setChatData(listMessage);
    setIsLoading(false);
  };

  function renderFooter() {
    if (chatData.length < 15 || !isLoading) {
      return null;
    }
    return (
      //Footer View with Load More button
      <ViewVertical style={styles.footer}>
        <ActivityIndicator color={colors.gray} style={{marginLeft: 8}} />
      </ViewVertical>
    );
  }

  return (
    <View
      style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: colors.redBold,
          fontSize: fontSizes.small,
          ...fontFamilies.medium,
          fontWeight: 'bold',
        }}
        mainText={capitalizeFirstLetter(currentPeerUser.nickName)}
        stylesHeader={styles.header}
        leftComponent={
          <Image
            resizeMode="cover"
            style={styles.backarrow}
            source={BACK_ARROW}
          />
        }
        leftAction={() => NavigationActionsService.pop()}
      />
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          style={{flex: 1}}
          data={chatData}
          keyExtractor={(item: any) => item.time.toString()}
          renderItem={({item, index}) => _renderChatLine(item, index)}
          inverted
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={15}
          ListFooterComponent={renderFooter}
        />
      </View>
      {isBlock ? (
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={[
            {
              flexDirection: 'row',
              backgroundColor: '#FFF',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginLeft: 2,
              borderTopColor: colors.gray,
              borderTopWidth: 1,
            },
            Platform.OS == 'ios'
              ? {
                  paddingHorizontal: 10,
                  marginVertical: 10,
                  paddingTop: 5,
                }
              : {
                  flex: 0.1,
                },
          ]}>
          <View style={{flex: 1 / 10}}>
            <TouchableOpacity onPress={openPickerImage}>
              <Icon
                style={{marginLeft: 10}}
                name="image"
                size={20}
                color={colors.redBold}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1 / 10}}>
            <TouchableOpacity onPress={openCamera}>
              <Icon
                style={{marginLeft: 10}}
                name="camera"
                size={20}
                color={colors.redBold}
              />
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Aa"
            value={chatInputContent}
            onChangeText={text => onHandleChange(text)}
            style={
              Platform.OS == 'ios'
                ? {
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 4,
                    padding: 4,
                    borderColor: 'gray',
                    flex: 8 / 10,
                    paddingVertical: 10,
                    paddingTop: 10,
                  }
                : {
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 4,
                    padding: 4,
                    borderColor: 'gray',
                    flex: 8 / 10,
                  }
            }
            autoCapitalize="none"
            underlineColorAndroid={'transparent'}
            multiline={true}
            keyboardType={'ascii-capable'}
          />
          <View style={{flex: 1 / 10}}>
            <TouchableOpacity onPress={() => _sendMessage()}>
              <Icon
                style={{marginLeft: 10}}
                name="send"
                size={20}
                color={
                  chatInputContent.trim().length > 0
                    ? colors.redBold
                    : colors.gray
                }
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : null}
    </View>
  );
}
export default ChatScreen;

function capitalizeFirstLetter(string: string) {
  return string.replace(/[^\s]+/g, function (str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  });
}

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};
