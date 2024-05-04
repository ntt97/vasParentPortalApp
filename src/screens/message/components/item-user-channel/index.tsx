import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {Image} from 'react-native-elements';
import colors from 'constants/colors';
import * as appString from 'constants/appString';
import styles from './styles';
import moment from 'moment';
import {strings} from '@utils/i18n';
import {useSelector} from 'react-redux';
import {RootState} from 'reducers/';
import {AVATAR_GROUP} from '@assets/index';
//define
let onValueChange: any;
let groupChatId: string | '' = '';

const ItemUserChannel = (props: any) => {
  const {item} = props;
  const [countNotSeen, setCountNotSeen] = useState(0);
  const [userChat, setUserChat] = useState<any>({
    photoUrl: '',
    isOnline: 0,
    content: '',
    nickName: '',
    id: '',
    isGroup: 0,
  });
  const user: any = useSelector<RootState>(
    (state: RootState) => state.user.profile,
  );

  const countMessageNotSeen = (id: string) => {
    firestore()
      .collection(appString.MESSAGES)
      .doc(id)
      .collection(id)
      .orderBy('time', 'DESC')
      .limit(6)
      .get()
      .then(documentSnapshot => {
        let count = 0;
        documentSnapshot.forEach((change: any) => {
          if (change.data()?.isSeen === 0) {
            count++;
          }
        });
        setCountNotSeen(count);
      });
  };

  const countMessageNotSeenGroup = (id: string) => {
    firestore()
      .collection(appString.MESSAGES)
      .doc(id)
      .collection(id)
      .orderBy('time', 'DESC')
      .limit(6)
      .get()
      .then(documentSnapshot => {
        let count = 0;
        documentSnapshot.forEach((change: any) => {
          if (change.data()?.arrSeen?.includes(user.id) === false) {
            count++;
          }
        });
        setCountNotSeen(count);
      });
  };

  const getInfoUser = async (id: string) => {
    if (item.isGroup) {
      setUserChat({
        ...userChat,
        id: item.id,
        nickName: item.nickName ? item.nickName : 'DEFAULT USER',
        isGroup: 1,
        idSend: item.idSend,
      });
      return;
    }
    // onValueChange = database()
    //   .ref(`${appString.USERS}/${id}`)
    //   .on('value', snapshot => {

    //     if (snapshot && snapshot.val()?.id) {
    //       setUserChat(snapshot.val() as any)
    //     } else {

    setUserChat({
      ...userChat,
      id: item.id,
      nickName: item.nickName ? item.nickName : 'DEFAULT USER',
      nickNameChild: item.nickNameChild,
    });
    //   }
    // });
  };

  useEffect(() => {
    getInfoUser(item.id);

    return () => {
      // database()
      //   .ref(`${appString.USERS}/${item.id}`).off('value', onValueChange)
    };
  }, []);

  useEffect(() => {
    if (item.isGroup) {
      countMessageNotSeenGroup(item.id + '-' + item.idSend);
    } else {
      if (hashString(item.idSend) <= hashString(item.idTo)) {
        groupChatId = `${item.idSend}-${item.idTo}`;
      } else {
        groupChatId = `${item.idTo}-${item.idSend}`;
      }
      countMessageNotSeen(groupChatId);
    }
    return () => {};
  }, [item.content]);

  const renderContent = (item: any) => {
    if (item.isDelete) {
      return strings('RECALLED_MESSAGE');
    }
    return item.type === 1 ? item.content : '🖼 ' + strings('photo');
  };

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.onHandlePress(userChat)}>
      <View style={{display: 'flex', flex: 1}}>
        <View style={styles.itemLeft}>
          {userChat.photoUrl || userChat.isGroup ? (
            <Image
              style={styles.tinyLogo}
              source={
                !userChat.isGroup
                  ? {uri: `data:image/*;base64,${userChat.photoUrl}`}
                  : AVATAR_GROUP
              }
            />
          ) : (
            <View style={styles.textLogo}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {getInitials(item.nickName)}
              </Text>
            </View>
          )}
        </View>
        {/* {userChat.isOnline ? (<View style={styles.active}></View>) : (null)} */}
      </View>
      <View style={styles.itemRight}>
        <View style={{justifyContent: 'center', flex: 2.5}}>
          <Text numberOfLines={1} style={styles.txtName}>
            {capitalizeFirstLetter(item.nickName)}
          </Text>
          {userChat.nickNameChild ? (
            <Text
              style={
                (item?.isSeen === 0 && userChat?.id == item.idSend) ||
                (item?.isGroup && !item.arrSeen.includes(user.id))
                  ? styles.txtActive
                  : {color: 'gray', fontSize: 12}
              }
              numberOfLines={1}>
              {userChat.nickNameChild || ''}
            </Text>
          ) : null}
          {item.content ? (
            <Text
              style={
                (item?.isSeen === 0 && userChat?.id == item.idSend) ||
                (item?.isGroup && !item.arrSeen.includes(user.id))
                  ? styles.txtActive
                  : {color: 'gray', fontSize: 12}
              }
              numberOfLines={1}>
              {renderContent(item)}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Text
            style={
              (item?.isSeen === 0 && userChat?.id === item.idSend) ||
              (item?.isGroup && !item.arrSeen.includes(user.id))
                ? {color: 'black', fontSize: 12, fontWeight: 'bold'}
                : {color: 'gray', fontSize: 12}
            }>
            {moment(Number(item.time)).calendar(null, {
              sameDay: 'hh:mm A',
              lastDay: `[${strings('yesterday')}]`,
              lastWeek: 'ddd',
              sameElse: 'DD/MM/YYYY',
            })}
          </Text>
          {item?.isSeen === 0 &&
          userChat.id === item.idSend &&
          !item?.isGroup ? (
            <View style={styles.activeNew}>
              <Text
                style={{fontSize: 9, color: colors.white, fontWeight: 'bold'}}
                numberOfLines={1}>
                {countNotSeen > 5 ? '5+' : countNotSeen}
              </Text>
            </View>
          ) : null}
          {item?.isGroup && !item.arrSeen.includes(user.id) ? (
            <View style={styles.activeNew}>
              <Text
                style={{fontSize: 9, color: colors.white, fontWeight: 'bold'}}
                numberOfLines={1}>
                {countNotSeen > 5 ? '5+' : countNotSeen}
              </Text>
            </View>
          ) : null}
          <View></View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemUserChannel;

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
