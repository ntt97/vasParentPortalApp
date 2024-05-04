import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import NavigationActionsService from 'utils/navigation';
import {CHAT_SCREEN, SEARCH_SCREEN} from '@constants/index';
import * as appString from 'constants/appString';
import styles from './styles';
import ItemUser from '../item-user';

import {strings} from '@utils/i18n';
import BaseService from 'services/';
import {ViewVertical} from '@components/viewBox.component';
import colors from '@constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getCurrentUser} from '@utils/helper';
import Header from 'components/header/header.component';
import {BACK_ARROW, DRAWER_ICON} from 'assets/';
import {fontSizes, fontFamilies} from '@constants/fonts';
interface PaginationData {
  page: number;
  limit: number;
  total: number;
}
const defaultPaginationData: PaginationData = {
  page: 1,
  limit: 20,
  total: 0,
};
function ListUserScreen(props: any) {
  const [listUser, setListUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getListUser(defaultPaginationData.page, defaultPaginationData.limit);
    return () => {
      defaultPaginationData.page = 1;
      defaultPaginationData.limit = 20;
      defaultPaginationData.total = 0;
    };
  }, []);

  const getListUser = async (page: number = 1, limit: number = 20) => {
    const userStr = await getCurrentUser();
    const user = JSON.parse(userStr as any);
    setIsLoading(true);
    const data = await BaseService.instance.teacher.getListTeacher(
      user.id,
      limit,
      page,
    );

    if (data && data.items) {
      defaultPaginationData.total = data.total;
      defaultPaginationData.page = page;
      let result: Array<any> = [];
      result = data.items.map((item: any) => {
        return {
          id: item.id,
          nickName: item.name,
          studentFullName: item.teacherAcademyClasses
            .map((item: any) => {
              return item.student.fullname;
            })
            .filter(onlyUnique)
            .join(', '),
          className: item.teacherAcademyClasses
            .map((item: any) => {
              return item.academyClass.name;
            })
            .filter(onlyUnique)
            .join(', '),
        };
      });
      setListUser([...listUser, ...result] as any);
    }
    setIsLoading(false);
  };

  const onHandlePress = async (item: any) => {
    const userStr = await getCurrentUser();
    const user = JSON.parse(userStr as any);
    let url = `/${appString.USERS}/${user.id}`;
    database().ref(url).update({
      chattingWith: item.id,
    });
    NavigationActionsService.push(CHAT_SCREEN, {user: user, item: item});
  };

  function renderFooter() {
    if (
      defaultPaginationData.limit * defaultPaginationData.page <
        defaultPaginationData.total ||
      !isLoading
    ) {
      return null;
    }
    return (
      //Footer View with Load More button
      <ViewVertical style={styles.footer}>
        <ActivityIndicator color={colors.gray} style={{marginLeft: 8}} />
      </ViewVertical>
    );
  }

  const handleLoadMore = async () => {
    if (
      !isLoading &&
      defaultPaginationData.limit * defaultPaginationData.page <
        defaultPaginationData.total
    ) {
      getListUser(defaultPaginationData.page + 1, defaultPaginationData.limit);
    }
  };

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
        mainText={strings('teacher')}
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
        <TouchableOpacity
          onPress={() => {
            NavigationActionsService.push(SEARCH_SCREEN);
          }}
          style={styles.input}>
          {/* <Icon name="search" size={16} color={colors.gray} /> */}
          <Text
            style={{
              color: colors.gray,
              fontSize: fontSizes.smallest,
              marginLeft: 10,
            }}>
            {strings('search_teacher')}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listUser}
        renderItem={props => (
          <ItemUser onHandlePress={onHandlePress} {...props} />
        )}
        keyExtractor={(item: any) => `${item.id}${item.className}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={defaultPaginationData.limit}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
export default ListUserScreen;

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}
