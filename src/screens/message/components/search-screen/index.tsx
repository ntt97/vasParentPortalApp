import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import database from '@react-native-firebase/database';
import NavigationActionsService from 'utils/navigation';
import {CHAT_SCREEN} from '@constants/index';
import * as appString from 'constants/appString';
import styles from './styles';
import ItemUser from '../item-user';
import Header from 'components/header/header.component';
import colors from 'constants/colors';
import {fontSizes, fontFamilies} from 'constants/fonts';
import {BACK_ARROW} from 'assets';
import {getCurrentUser} from '@utils/helper';
import {strings} from '@utils/i18n';
import {useDispatch, useSelector} from 'react-redux';
import {filterListTeacher} from '@actions/teacher.action';
import {RootState} from 'reducers/';
import {ViewVertical} from '@components/viewBox.component';
interface PaginationData {
  page: number;
  limit: number;
  total: number;
}
const defaultPaginationData: PaginationData = {
  page: 1,
  limit: 15,
  total: 0,
};
function ClassScreen(props: any) {
  const [keySearch, setKeySearch] = useState('');
  const dispatch = useDispatch();
  const listTeacher: any = useSelector<RootState>(
    (state: RootState) => state.teacher.listTeacher,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    return () => {
      defaultPaginationData.page = 1;
      defaultPaginationData.limit = 15;
      defaultPaginationData.total = 0;
    };
  }, []);

  useEffect(() => {
    if (keySearch.trim().length <= 0) return;
    setIsRefreshing(false);
    let result: Array<never> = [];
    if (listTeacher && listTeacher.items) {
      result = listTeacher.items.map((item: any) => {
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
    }
    setData([...data, ...result]);
    if (listTeacher && listTeacher.page) {
      defaultPaginationData.total = listTeacher.total;
    }
  }, [listTeacher]);

  const onHandlePress = async (item: any) => {
    const userStr = await getCurrentUser();
    const user = JSON.parse(userStr as any);
    database()
      .ref(`/${appString.USERS}/${user.id}`)
      .update({chattingWith: item.id});
    //go to chat screen
    NavigationActionsService.push(CHAT_SCREEN, {user: user, item: item});
  };

  const onHandleSearch = async (text: any) => {
    setIsRefreshing(true);
    setKeySearch(text);
    setData([]);
    defaultPaginationData.page = 1;
    defaultPaginationData.limit = 15;
    defaultPaginationData.total = 0;
    const userStr = await getCurrentUser();
    const user = JSON.parse(userStr as any);
    if (text.trim().length > 0) {
      dispatch(
        filterListTeacher({
          key: text.trim(),
          parentId: user.id,
          page: 1,
          limit: 15,
        }),
      );
    } else {
      setIsRefreshing(false);
    }
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
      const userStr = await getCurrentUser();
      const user = JSON.parse(userStr as any);
      dispatch(
        filterListTeacher({
          key: keySearch,
          parentId: user.id,
          page: defaultPaginationData.page + 1,
          limit: defaultPaginationData.limit,
        }),
      );
      defaultPaginationData.page += 1;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: colors.redBold,
          fontSize: fontSizes.small,
          ...fontFamilies.medium,
          fontWeight: 'bold',
        }}
        stylesHeader={styles.header}
        leftComponent={
          <Image
            resizeMode="cover"
            style={styles.backarrow}
            source={BACK_ARROW}
          />
        }
        leftAction={() => NavigationActionsService.pop()}>
        <View style={{marginLeft: 50, marginTop: 0.5, marginBottom: 5}}>
          <TextInput
            style={styles.input}
            onChangeText={text => onHandleSearch(text)}
            value={keySearch}
            placeholder={strings('search_teacher')}
            autoCapitalize="none"
            underlineColorAndroid={'transparent'}
          />
        </View>
      </Header>

      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={item => (
            <ItemUser onHandlePress={onHandlePress} {...item} />
          )}
          keyExtractor={(item: any) => `${item.id}-${item.className}`}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={defaultPaginationData.limit - 11}
          ListFooterComponent={renderFooter}
          refreshing={isRefreshing}
          onRefresh={() => {}}
        />
      </View>
    </View>
  );
}
export default ClassScreen;

function onlyUnique(value: any, index: any, self: any) {
  return self.indexOf(value) === index;
}
