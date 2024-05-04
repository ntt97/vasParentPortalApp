import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import NavigationActionsService from 'utils/navigation';
import * as appString from 'constants/appString';
import {CHAT_SCREEN, CHAT_GROUP_SCREEN} from '@constants/index';
import styles from './styles';
import ItemUserChannel from '../item-user-channel';
import {getCurrentUser} from '@utils/helper';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'reducers/';
import colors from 'constants/colors';
import {strings} from '@utils/i18n';
import {ViewVertical} from '@components/viewBox.component';
import {
  filterListTeacherFirebase,
  filterListTeacherFirebaseSuccess,
} from '@actions/teacher.action';
import Header from 'components/header/header.component';
import {DRAWER_ICON, BACK_ARROW} from 'assets/';
import {fontSizes, fontFamilies} from '@constants/fonts';

let subscriber: Function = function () {};
let limit = 15;
let length = 0;

function ChannelScreen(props: any) {
  const [lastMSG, setLastMSG] = useState([]);
  const userRedux: any = useSelector<RootState>(
    (state: RootState) => state.user.profile,
  );
  const listParentFirebase: any = useSelector<RootState>(
    (state: RootState) => state.teacherFirebase.listTeacher,
  );
  const [keySearch, setKeySearch] = useState('');
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsRefresh(false);
  }, [listParentFirebase]);

  useEffect(() => {
    getLastMSG();
    return () => {
      subscriber();
      limit = 15;
      length = 0;
    };
  }, [userRedux.id]);

  const getLastMSG = async () => {
    let user: any = {};
    if (userRedux.id) {
      user = await userRedux;
    } else {
      const userStr = await getCurrentUser();
      user = JSON.parse(userStr as string) || {};
    }
    if (!user || !user.id) return;
    let result: any[] = [];

    subscriber = firestore()
      .collection(appString.MESSAGES)
      .where('arrId', 'array-contains', user.id)
      .orderBy('time', 'DESC')
      .limit(limit)
      .onSnapshot(snapshot => {
        snapshot.docs.forEach((data: any) => {
          if (data.data().isGroup) {
            result.push({
              ...data.data(),
              id: data.data().idTo,
              nickName: data.data().nickNameTo,
              isGroup: 1,
              arrId: data.data().arrId,
              idSend: data.data().idSend,
            });
          } else if (data.data().idTo === user.id) {
            result.push({
              ...data.data(),
              id: data.data().idSend,
              nickName: data.data().nickNameSend,
            });
            return;
          } else if (data.data().idSend === user.id) {
            result.push({
              ...data.data(),
              id: data.data().idTo,
              nickName: data.data().nickNameTo,
            });
            return;
          }
        });
        setLastMSG(result as any);
        result = [];
      });
  };

  //on click chat with user
  const onHandlePress = async (item: any) => {
    const userStr = await getCurrentUser();
    const user = JSON.parse(userStr as any);
    if (item.isGroup) {
      NavigationActionsService.push(CHAT_GROUP_SCREEN, {
        user: user,
        item: item,
      });
      return;
    }
    let url = `/${appString.USERS}/${user.id}`;
    database().ref(url).update({
      chattingWith: item.id,
    });
    NavigationActionsService.push(CHAT_SCREEN, {user: user, item: item});
  };

  const onHandleSearch = async (text: any) => {
    setIsRefresh(true);
    setKeySearch(text);
    if (text.trim().length > 0) {
      dispatch(
        filterListTeacherFirebase({parentId: userRedux.id, key: text.trim()}),
      );
    } else {
      setIsRefresh(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    if (lastMSG.length < length) {
      setIsLoading(false);
      return;
    }
    limit += 15;
    length = limit;
    let listMessage: object[] = [];
    const data = await firestore()
      .collection(appString.MESSAGES)
      .where('arrId', 'array-contains', userRedux.id)
      .orderBy('time', 'DESC')
      .limit(limit)
      .get();
    data.docs.forEach((data: any) => {
      if (data.data().isGroup) {
        listMessage.push({
          ...data.data(),
          id: data.data().idTo,
          nickName: data.data().nickNameTo,
          isGroup: 1,
          arrId: data.data().arrId,
        });
      } else if (data.data().idTo === userRedux.id) {
        listMessage.push({
          ...data.data(),
          id: data.data().idSend,
          nickName: data.data().nickNameSend as any,
        });
        return;
      } else if (data.data().idSend === userRedux.id) {
        listMessage.push({
          ...data.data(),
          id: data.data().idTo,
          nickName: data.data().nickNameTo,
        });
        return;
      }
    });

    setLastMSG(listMessage as any);
    setIsLoading(false);
  };
  function renderFooter() {
    if (lastMSG.length < 15 || !isLoading) {
      return null;
    }
    return (
      //Footer View with Load More button
      <ViewVertical style={styles.footer}>
        <ActivityIndicator color={colors.gray} style={{marginLeft: 8}} />
      </ViewVertical>
    );
  }
  const openDrawer = () => {
    NavigationActionsService.toggleDrawer(true);
  };
  const onBack = () => {
    NavigationActionsService.pop();
  };

  return (
    <View style={styles.container}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: colors.redBold,
          fontSize: fontSizes.small,
          fontWeight: 'bold',
          ...fontFamilies.medium,
        }}
        mainText={strings('chat')}
        stylesHeader={styles.header}
        leftComponent={
          props?.menu ? (
            <Image
              resizeMode="cover"
              style={styles.drawerIcon}
              source={DRAWER_ICON}
            />
          ) : (
            <Image
              resizeMode="cover"
              style={styles.drawerIcon}
              source={BACK_ARROW}
            />
          )
        }
        leftAction={props?.menu ? openDrawer : onBack}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => onHandleSearch(text)}
          value={keySearch}
          placeholder={strings('search_teacher')}
          autoCapitalize="none"
          underlineColorAndroid={'transparent'}
        />
      </View>
      <FlatList
        data={keySearch.length < 1 ? lastMSG : listParentFirebase}
        renderItem={item => (
          <ItemUserChannel onHandlePress={onHandlePress} {...item} />
        )}
        keyExtractor={(item: any) => `${item.time}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={15}
        ListFooterComponent={renderFooter}
        refreshing={isRefresh}
        onRefresh={() => {}}
      />
    </View>
  );
}
export default ChannelScreen;
