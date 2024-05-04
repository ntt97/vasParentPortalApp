/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  changeLanguageWithSaga,
  handleChangeLanguage,
} from '@actions/language.action';
import {setNumberMessageNotSeen} from '@actions/message.action';
import {setIconNotification} from '@actions/notification.action';
import {actGetTimeRecall} from '@actions/setting.action';
import {getListStudent} from '@actions/student.action';
import ButtonPrimary from '@components/buttonPrimary.component';
// import { strings } from '@utils/i18n';
import withLanguageChange from '@components/hoc-language/hoc-language';
import OverlayCustom from '@components/overlay-custom';
import colors from '@constants/colors';
import {
  ANNOUNCEMENT,
  CHAT_GROUP_SCREEN,
  CHAT_SCREEN,
  MESSAGE_SCREEN,
  NOTIFICATION_DETAIL,
  STUDENT_LIST,
  PARENT_MEETING,
  USER_PROFILE,
} from '@constants/index';
import {isIOS} from '@constants/platform';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n, {strings} from '@utils/i18n';
import {getProfileUser} from 'actions/user.action';
import {LOGO_RED, PROFILE_DEFAULT} from 'assets/';
import {ViewHorizontal, ViewVertical} from 'components/viewBox.component';
import * as appString from 'constants/appString';
import dayjs from 'dayjs';
import moment from 'moment';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

import IconAnt from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import VersionCheck from 'react-native-version-check';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'reducers/';
import BaseService from 'services/';
import {
  decodeToken,
  getCurrentUser,
  getNotificationLocal,
  getRefreshToken,
  setCurrentUser,
  setDefaultLanguage,
  setNotificationLocal,
  setRefreshToken,
  setToken,
} from 'utils/helper';
import NavigationActionsService from 'utils/navigation';

import styles from './styles';
interface AnnoucementProps {
  currentLanguage: string;
  componentId: any;
}

interface EventDetailItem {
  description: string;
  eventId: number;
  languageId: string;
  name: string;
}
interface AnnoucementProps {
  currentLanguage: string;
  componentId: any;
}

let subscriber: Function = function () {};

const HomeScreen = (props: AnnoucementProps) => {
  const dispatch = useDispatch();
  let notificationOpenedListener: () => void;
  let notificationListener: () => void;

  const eventNotSeen: any = useSelector<RootState>(
    (state: RootState) => state.notification.eventNotSeen,
  );
  const user: any = useSelector<RootState>(
    (state: RootState) => state.user.profile,
  );
  const messageNotSeen: any = useSelector<RootState>(
    (state: RootState) => state.message.count,
  );
  const [refreshing, setRefreshing] = useState(false);
  const current: any = useSelector<RootState>(
    (state: RootState) => state.notification.current,
  );
  const [avatar, setAvatar] = useState('');
  const [listActive, setListActive] = useState([]);
  const language: any = useSelector<RootState>(
    (state: RootState) => state.language.currentLanguage,
  );
  const [listEvent, setListEvent] = useState([]);
  const list: any = useSelector<RootState>(
    (state: RootState) => state.student.list,
  );
  const notifyAttendance: any = useSelector<RootState>(
    (state: RootState) => state.studentNotification.attendance,
  );
  const notifyMeal: any = useSelector<RootState>(
    (state: RootState) => state.studentNotification.meal,
  );
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [base, setbase] = useState('');

  const [_token, set_token] = useState<any>();
  const [_userID, set_userID] = useState<any>();
  const updateFcmToken = async () => {
    try {
      const deviceId = (await AsyncStorage.getItem('vas_fcmToken')) || '';
      const refreshToken = (await getRefreshToken()) || '';
      const res: any = await BaseService.instance.auth.refreshToken(
        refreshToken,
        deviceId,
      );

      setToken(res.accessToken);
      setRefreshToken(res.refreshToken);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    // firebase.notifications().setBadge(0);
    if (!isIOS) {
      firestore().settings({
        cacheSizeBytes: 101048576,
        persistence: true,
      });
    }

    if (isIOS) {
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  const getListId = () => {
    const result: Array<any> = list.map((item: any) => {
      return item?.student?.gradeClass?.yearGroup?.campus?.id || '';
    });
    const newResult = [...(new Set(result) as any)];
    return newResult;
  };

  useEffect(() => {
    checkUpdateApp();
    createAccountFirebase();
    return () => {
      subscriber();
    };
  }, [user.id]);

  useEffect(() => {
    decodeToken().then(user => {
      dispatch(getProfileUser({id: user.id}));
      dispatch(getListStudent({id: user.id}));
    });
    // messageListener();
    NavigationActionsService.initInstance('HOME_COMPONENT_ID');
    // const channel = new firebase.notifications.Android.Channel(
    //   'event',
    //   'Event notification',
    //   firebase.notifications.Android.Importance.Max,
    // );
    // firebase.notifications().android.createChannel(channel);
    getListMenuHome();
    generateTokenForVas();
    setStudentNotification();
    dispatch(actGetTimeRecall({key: 'RECALL_INTERVAL'}));
    updateFcmToken();
    return () => {
      notificationListener();
      notificationOpenedListener();
    };
  }, []);

  useEffect(() => {
    getListEvent();
    return () => {};
  }, [language, current]);

  const getAvatar = async () => {
    try {
      if (user && user.avatar) {
        const base = await BaseService.instance.user.getAvatar(user.avatar);
        setAvatar(`data:image/*;base64,${base}`);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getAvatar();
    setAvatar_firebase();
    return () => {};
  }, [user.avatar]);

  const setStudentNotification = async () => {
    const data: any = await getNotificationLocal();
    if (data) {
      dispatch(setNotificationLocal(JSON.parse(data)));
    }
  };

  async function getListEvent() {
    let eventNotSeen: number = 0;
    setRefreshing(true);
    try {
      let arr: Array<any> = [];
      const eventTop: any = await BaseService.instance.notification.getPinTop({
        pinOnTop: true,
        limit: 3,
        languageId: language,
      });

      arr = [...eventTop.data];
      const event: any = await BaseService.instance.notification.getPinTop({
        pinOnTop: false,
        limit: 5,
        languageId: language,
      });
      arr = [...arr, ...event.data];
      setListEvent(arr as any);

      arr.forEach(item => {
        if (item?.eventSchools[0]?.seen == false) {
          eventNotSeen++;
        }
      });
      dispatch(setIconNotification(eventNotSeen));
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.error({
        message: error,
        path: '/getListEvent in home.tsx',
      });
      return Promise.reject(error);
    }
  }

  const onPressNotification = async (notification: any) => {
    const userStr = await getCurrentUser();
    const user = JSON.parse(userStr as any);

    if (notification && notification.eventId) {
      NavigationActionsService.push(NOTIFICATION_DETAIL, {
        id: parseInt(notification.eventId),
      });
    }
    if (
      notification &&
      notification.idSend &&
      notification.idTo &&
      notification.nickNameTo &&
      !notification?.isGroup
    ) {
      database()
        .ref(`/${appString.USERS}/${user.id}`)
        .update({chattingWith: notification.idSend});
      NavigationActionsService.push(CHAT_SCREEN, {
        user: user,
        item: {id: notification.idSend, nickName: notification.nickNameSend},
      });
    }
    if (notification?.isGroup) {
      const arrId = notification.arrId.split(',');
      NavigationActionsService.push(CHAT_GROUP_SCREEN, {
        user: user,
        item: {
          id: notification.idSend,
          nickName: notification.nickNameSend,
          arrId: arrId,
          idSend: notification.idSend,
          idTo: notification.idTo,
        },
      });
    }
  };
  async function setAvatar_firebase() {
    if (user.avatar && user.avatar.length > 0) {
      let base_local = '';
      base_local = await BaseService.instance.user.getAvatar(user.avatar);
      if (base_local) {
        setbase(base_local);
      }
    }
  }

  async function createAccountFirebase() {
    const fcmToken = await AsyncStorage.getItem('vas_fcmToken');
    if (user.id) {
      const data = await database().ref(`/users/${user.id}`).once('value');
      const arrFcmToken = data?.val()?.pushToken || [];
      if (Array.isArray(arrFcmToken)) {
        if (arrFcmToken.indexOf(fcmToken) === -1) {
          arrFcmToken.push(fcmToken);
        }
      }
      const arrToObject = Object.assign({}, arrFcmToken);
      const objUser = {
        chattingWith: '',
        nickName: user.name,
        id: user.id,
        photoUrl: base,
        pushToken: arrToObject,
        isOnline: 1,
      };

      await setCurrentUser(JSON.stringify(objUser));
      const query = database().ref(`/users/${objUser.id}`);
      query.set(objUser);
      // database()
      //   .ref('.info/connected')
      //   .on('value', snapshot => {
      //     // If we're not currently connected, don't do anything.
      //     if (snapshot.val() == false) {
      //       return;
      //     }
      //     // If we are currently connected, then use the 'onDisconnect()'
      //     // method to add a set which will only trigger once this
      //     // client has disconnected by closing the app,
      //     // losing internet, or any other means.
      //     query
      //       .onDisconnect()
      //       .update({ isOnline: 0 })
      //       .then(() => {
      //         // The promise returned from .onDisconnect().set() will
      //         // resolve as soon as the server acknowledges the onDisconnect()
      //         // request, NOT once we've actually disconnected:
      //         // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

      //         // We can now safely set ourselves as 'online' knowing that the
      //         // server will mark us as offline once we lose connection.
      //         query.update({ isOnline: 1 });
      //       });
      //   });

      subscriber = firestore()
        .collection(appString.MESSAGES)
        .where('idTo', '==', user.id)
        .where('isSeen', '==', 0)
        .onSnapshot(snapshot => {
          let count = 0;
          snapshot.docs.forEach((data: any) => {
            count++;
          });
          dispatch(setNumberMessageNotSeen({count: count}));
        });
    }
  }

  async function getListMenuHome() {
    const resJson = await BaseService.instance.event.getListMenuHome();
    if (resJson[0] && resJson[0].value) {
      setListActive(resJson[0].value);
    }
  }

  async function generateTokenForVas() {
    const res = await BaseService.instance.event.generateTokenForVas();
    if (res) {
      set_token(res.token);
      set_userID(res.userId);
    }
  }

  async function messageListener() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    // notificationListener = firebase
    //   .notifications()
    //   .onNotification(notification => {
    //     const localNotif = new firebase.notifications.Notification()
    //       .setTitle(notification.title)
    //       .setBody(notification.body)
    //       .setData(notification.data)
    //       .setSound('default');
    //     if (Platform.OS === 'android') {
    //       localNotif.android.setChannelId('event');
    //     }
    //     // firebase.notifications().displayNotification(localNotif);
    //     if (notification && notification?.data?.eventId) {
    //       dispatch(setIconNotification(eventNotSeen + 1));
    //     }
    //   });
    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    // notificationOpenedListener = firebase
    //   .notifications()
    //   .onNotificationOpened(notificationOpen => {
    //     const {data, notificationId} = notificationOpen.notification;
    //     onPressNotification(data);
    //     firebase.notifications().removeDeliveredNotification(notificationId);
    //   });
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    // const notificationOpen = await firebase
    //   .notifications()
    //   .getInitialNotification();
    // if (notificationOpen) {
    //   const {data, notificationId} = notificationOpen.notification;
    //   onPressNotification(data);
    //   // firebase.notifications().removeDeliveredNotification(notificationId);
    //   /*
    //    * Triggered for data only payload in foreground
    //    * */
    //   // let messageListener = firebase.messaging().onMessage(message => {
    //   //   console.log(JSON.stringify(message));
    //   // });
    // }
  }
  function handleRefresh() {
    getListEvent();
  }

  function onChangeLanguage() {
    let value = 'en';
    if (language === 'en') {
      value = 'vi';
    } else {
      value = 'en';
    }
    I18n.defaultLocale = value;
    I18n.locale = value;
    moment.locale(value);
    dayjs.locale(value);
    setDefaultLanguage(value);
    dispatch(handleChangeLanguage(value));
    dispatch(changeLanguageWithSaga(value));
  }

  function getFlag(languageId: string) {
    switch (languageId) {
      case 'vi':
        return require('../../assets/images/ic_lang_vi.png');
      case 'en':
        return require('../../assets/images/ic_lang_eng.png');
      default:
        return null;
    }
  }

  const renderBadge = (item: any) => {
    switch (item.key) {
      case 'MESSAGE':
        return messageNotSeen && messageNotSeen > 0 ? (
          <ViewVertical style={styles.activeNew}>
            <Text style={styles.textBadge} numberOfLines={1}>
              {messageNotSeen > 99 ? '5s+' : messageNotSeen}
            </Text>
          </ViewVertical>
        ) : null;
      case 'ANNOUNCEMENTS':
        return eventNotSeen && eventNotSeen > 0 ? (
          <ViewVertical style={styles.activeNew}>
            <Text style={styles.textBadge} numberOfLines={1}></Text>
          </ViewVertical>
        ) : null;
      case 'STUDENT':
        return notifyAttendance.length > 0 || notifyMeal.length > 0 ? (
          <ViewVertical style={styles.activeNew}>
            <Text style={styles.textBadge} numberOfLines={1}>
              *
            </Text>
          </ViewVertical>
        ) : null;
      default:
        return null;
    }
  };

  const onGotoEvery = async (item: any) => {
    const res = await BaseService.instance.event.generateTokenForVas();
    switch (item.key) {
      case 'MESSAGE':
        return NavigationActionsService.push(MESSAGE_SCREEN);
      case 'ANNOUNCEMENTS':
        return NavigationActionsService.push(ANNOUNCEMENT);
      case 'STUDENT':
        return NavigationActionsService.push(STUDENT_LIST);
      case 'PARENT_MEETING':
        return NavigationActionsService.push(PARENT_MEETING);
      case 'OURFEES':
        if (res) {
          let link = item.link.replace(`{{token}}`, res.token);
          return Linking.openURL(link);
        }
      default:
        if (res) {
          if (item.link) {
            let link_default = item.link.replace(`{{token}}`, res.token);
            return Linking.openURL(link_default);
          } else {
            return null;
          }
        } else {
          return null;
        }
    }
  };

  const checkUpdateApp = async () => {
    const res = await VersionCheck.needUpdate();
    const isNeeded = res?.isNeeded;
    if (isNeeded) {
      setIsUpdate(true);
      return;
    }
  };

  const onUpdateApp = async () => {
    const res = await VersionCheck.needUpdate();
    const isNeeded = res.isNeeded;
    if (isNeeded) {
      Linking.openURL(res.storeUrl);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() => onGotoEvery(item)}
        style={styles.badgeContainer}>
        <ViewHorizontal style={styles.badge}>
          <IconAnt name={item.icon} size={25} color={colors.white} />
          {renderBadge(item)}
        </ViewHorizontal>
        <Text numberOfLines={1} style={styles.textIcon}>
          {strings(item.name)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ViewVertical style={styles.container}>
      {/* HEADER */}
      <ViewHorizontal style={styles.header}>
        <Image source={LOGO_RED} resizeMode={'contain'} />
        <ViewHorizontal style={styles.titleHeader}>
          <Text numberOfLines={1} style={styles.mainText}>
            VAS PARENT PORTAL
          </Text>
        </ViewHorizontal>
        <ViewHorizontal style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={onChangeLanguage}
            style={styles.languageContainer}>
            <Image source={getFlag(language)} resizeMode="contain" />
          </TouchableOpacity>
          <Avatar
            onPress={() => NavigationActionsService.push(USER_PROFILE)}
            source={
              avatar && user && user.avatar ? {uri: avatar} : PROFILE_DEFAULT
            }
            size={50}
            rounded
          />
        </ViewHorizontal>
      </ViewHorizontal>

      {/* LIST INFO */}
      <ViewVertical style={styles.listNotify}>
        <ViewHorizontal style={styles.headerFlat}>
          <IconAnt
            name="bullhorn"
            style={{marginRight: 14}}
            size={20}
            color={colors.white}
          />
          <Text style={styles.textTitleFlat}>{strings('an_event')}</Text>
        </ViewHorizontal>
        <FlatList
          data={listEvent}
          keyExtractor={(item: any) => {
            return '' + item.id;
          }}
          style={styles.flatContainer}
          renderItem={data => {
            const eventItem: any = data.item;
            const eventDetail: EventDetailItem | undefined =
              eventItem.eventDetails.find(
                (event: any) => event.languageId === props.currentLanguage,
              );
            const eventSchools: any = eventItem.eventSchools || [];
            const isSeen =
              eventSchools[0] && eventSchools[0].seen ? true : false;
            if (eventDetail) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    NavigationActionsService.push(NOTIFICATION_DETAIL, {
                      id: eventItem.id,
                    });
                  }}>
                  <ViewHorizontal
                    key={eventItem.id}
                    style={[
                      styles.boxItem,
                      eventSchools[0] && eventSchools[0].seen
                        ? ''
                        : {backgroundColor: colors.lightRed},
                    ]}>
                    <ViewVertical style={styles.iconPin}>
                      {eventItem.pinOnTop ? (
                        <Icon name="pin" size={25} color={colors.mainColor} />
                      ) : null}
                    </ViewVertical>
                    <ViewVertical style={{flex: 1}}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.itemTitle,
                          eventItem.pinOnTop
                            ? {color: colors.mainColor, fontWeight: 'bold'}
                            : {},
                          isSeen ? {} : styles.styleActive,
                        ]}>
                        {getListId().length > 1
                          ? `[${eventItem?.eventSchools
                              .map((item: any) => item.campus.prefix)
                              .join('-')}] `
                          : ''}
                        {`${eventDetail.name}`}
                      </Text>
                      <Text
                        style={[
                          styles.itemDate,
                          isSeen ? {} : styles.styleActive,
                        ]}>
                        {dayjs(eventItem.approvedAt).format('DD-MM-YYYY')}
                      </Text>
                    </ViewVertical>
                    <ViewVertical style={{justifyContent: 'center'}}>
                      <IconAnt
                        name="chevron-right"
                        size={15}
                        color={colors.mainColor}
                      />
                    </ViewVertical>
                  </ViewHorizontal>
                </TouchableOpacity>
              );
            }
            return null;
          }}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </ViewVertical>
      <ViewVertical style={styles.activities}>
        <ViewHorizontal style={styles.headerFlat}>
          <IconAnt
            name="th-list"
            style={{marginRight: 14}}
            size={20}
            color={colors.white}
          />
          <Text style={styles.textTitleFlat}>{strings('active_title')}</Text>
        </ViewHorizontal>
        <ViewHorizontal style={styles.containerActivities}>
          <FlatList
            data={listActive}
            renderItem={renderItem}
            numColumns={3}
            style={{
              height: 180,
            }}></FlatList>

          {/* {listActive.map((item: any) => {
            return (
              <TouchableOpacity key={item.key} onPress={() => onGotoEvery(item)} style={styles.badgeContainer}>
                <ViewHorizontal style={styles.badge}>
                  <IconAnt name={item.icon} size={25} color={colors.white} />
                  {renderBadge(item)}
                </ViewHorizontal>
                <Text numberOfLines={1} style={styles.textIcon}>{strings(item.name)}</Text>
              </TouchableOpacity>
            )
          })} */}
        </ViewHorizontal>
      </ViewVertical>

      <OverlayCustom
        title={strings('title_update_app')}
        description={strings('desc_update_app')}
        modalVisible={isUpdate}
        setModalVisible={setIsUpdate}
        isClickBackdropHide={false}
        footerChildren={() => (
          <ViewHorizontal style={{justifyContent: 'center', flex: 1}}>
            <ButtonPrimary
              title={strings('button_update')}
              style={{paddingHorizontal: 40}}
              onPress={onUpdateApp}
            />
          </ViewHorizontal>
        )}
      />
    </ViewVertical>
  );
};

export default withLanguageChange(HomeScreen);
