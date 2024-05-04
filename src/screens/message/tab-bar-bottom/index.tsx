import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {IC_CHAT, IC_CHAT_ACTIVE, IC_GROUP, IC_GROUP_ACTIVE} from 'assets';
import Text from '@components/text.component';
import {useSelector} from 'react-redux';
import {RootState} from 'reducers/';
import colors from 'constants/colors';
import BaseService from 'services';
import {getCurrentUser} from '@utils/helper';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {strings} from '@utils/i18n';

const TabBarBottom = (props: any) => {
  const messageNotSeen: any = useSelector<RootState>(
    (state: RootState) => state.message.count,
  );
  // const [sumOnline,setSumOnline] = useState(0);
  // const countUserOnline = async () => {
  //   let i = 0;
  //   const userStr = await getCurrentUser();
  //   const parentId = JSON.parse(userStr as string).id
  //   if (!parentId) return;
  //   const listAllUser = await BaseService.instance.teacher.getListTeacher(parentId, 1000, 1);
  //   if (listAllUser && listAllUser.length > 0) {
  //     for (const item of listAllUser.items) {
  //       const data: any = await database().ref(`users/${item.id}`).once("value");
  //       if (data?.val()?.isOnline) {
  //         i++;
  //       }
  //     }
  //     setSumOnline(i);
  //   }

  // }
  useEffect(() => {
    // countUserOnline()
  }, []);

  return (
    <View style={styles.bottom}>
      <TouchableOpacity
        onPress={() => props.changeContent('channel')}
        style={styles.bottomRight}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon
            name="message-circle"
            size={30}
            color={
              props.currentScreen === 'channel' ? colors.redBold : colors.gray
            }
          />
          <Text
            style={{
              fontSize: 12,
              color:
                props.currentScreen === 'channel'
                  ? colors.redBold
                  : colors.gray,
            }}>
            {strings('chat')}
          </Text>
          {messageNotSeen && messageNotSeen > 0 ? (
            <View
              style={{
                backgroundColor: 'red',
                position: 'absolute',
                top: -7,
                right: 18,
                width: messageNotSeen > 99 ? 23 : 20,
                height: 20,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#fff',
              }}>
              <Text
                numberOfLines={1}
                style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
                {messageNotSeen > 99 ? '99+' : messageNotSeen}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.changeContent('list')}
        style={styles.bottomLeft}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Icon1
            name="account-group-outline"
            size={30}
            color={
              props.currentScreen === 'list' ? colors.redBold : colors.gray
            }
          />

          <Text
            style={{
              fontSize: 12,
              color:
                props.currentScreen === 'list' ? colors.redBold : colors.gray,
            }}>
            {strings('teacher')}
          </Text>
          {/* {sumOnline > 0 ? (
            <View
              style={{
                backgroundColor: colors.active,
                position: 'absolute',
                top: -5,
                right: -7,
                width: sumOnline > 99 ? 23 : 20,
                height: 20,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#fff',
              }}
            >
              <Text numberOfLines={1} style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                {sumOnline > 99 ? "90+" : sumOnline}
              </Text>
            </View>
          ) : (null)} */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TabBarBottom;
