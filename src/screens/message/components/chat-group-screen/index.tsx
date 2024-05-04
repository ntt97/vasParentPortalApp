import React, {useEffect, useState} from 'react';
import NavigationActionsService from '@utils/navigation';
import {View, FlatList, Image, ActivityIndicator, Text} from 'react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {BACK_ARROW} from 'assets';
import ChatLineHolder from './chat-line-holer-group';
import moment from 'moment';
import {ViewVertical} from '@components/viewBox.component';
import styles from './styles';
import Header from 'components/header/header.component';
import colors from 'constants/colors';
import * as appString from 'constants/appString';
import {fontSizes, fontFamilies} from 'constants/fonts';
import {strings} from '@utils/i18n';

let currentPeerUser:
  | {id: any; nickName: string; idSend: string}
  | {id: ''; nickName: ''; idSend: ''} = {id: '', nickName: '', idSend: ''};
let currentUser: {id: any; nickName: string} | {id: ''; nickName: ''} = {
  id: '',
  nickName: '',
};
let groupChatId: string | '' = '';
let subscriber: Function = function () {};
let limit = 15;
let length = 0;

function ChatGroupScreen(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [chatData, setChatData] = useState([]);

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
          if (!change.data()?.arrSeen?.includes(currentUser.id)) {
            change.ref.update({
              arrSeen: firestore.FieldValue.arrayUnion(currentUser.id),
            });
            firestore()
              .collection(appString.MESSAGES)
              .doc(groupChatId)
              .update({
                arrSeen: firestore.FieldValue.arrayUnion(currentUser.id),
              });
          }
          listMessage.push(change.data() as never);
        });
        setChatData(listMessage);
        listMessage = [];
      });
  };

  useEffect(() => {
    if (props?.user && props?.item) {
      currentPeerUser = props?.item;
      currentUser = props?.user;
      groupChatId = `${currentPeerUser.id}-${currentPeerUser.idSend}`;
      getListHistory();
    }

    return () => {
      limit = 15;
      length = 0;
      subscriber();
      if (!currentUser.id) return;
      let url = `/${appString.USERS}/${currentUser.id}`;
      database().ref(url).update({
        chattingWith: '',
      });
    };
  }, []);

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
            <Text style={{color: colors.black}}>
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
    </View>
  );
}
export default ChatGroupScreen;

function capitalizeFirstLetter(string: string) {
  let newStr: string = string;
  let arrClassName = string.split('-');
  if (arrClassName.length > 1) {
    newStr = arrClassName[1];
  }
  let result = newStr.replace(/[^\s]+/g, function (str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  });
  if (arrClassName.length > 1) {
    return `${arrClassName[0].toUpperCase()}-${result}`;
  }
  return result;
}
