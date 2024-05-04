import React, { useEffect } from 'react';
import { StatusBar, FlatList, Image, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ViewVertical } from 'components/viewBox.component';
import ToastComponent from 'components/toast.component';

import styles from './styles';
import { RootState } from 'reducers/';

import colors from 'constants/colors';
import { getListStudent, resetMessage } from '@actions/student.action';
import { decodeToken } from 'utils/helper';
import AsyncListItem from 'components/asyncListItem.component';
import Header from '@components/header/header.component';
import { strings } from '@utils/i18n';
import { BACK_ARROW } from 'assets/';
import { fontFamilies, fontSizes } from '@constants/fonts';
import NavigationActionsService from '@utils/navigation';
import Text from '@components/text.component';

export interface Student {
  name: string;
  dateOfBirth: string;
  avatar: string;
  gender: string;
  grade: string;
  year: string;
  status: boolean;
}

const StudentListScreen = (props: any) => {
  const dispatch = useDispatch();

  const list: any = useSelector<RootState>((state: RootState) => state.student.list);
  const message: any = useSelector<RootState>((state: RootState) => state.student.message.list);

  const { type, text } = message;

  const renderItem = ({ item, index }: any) => {
    return <AsyncListItem item={item} index={index} />;
  };

  if (type || text) {
    ToastComponent(type, text);
    dispatch(resetMessage());
  }

  useEffect(() => {
    decodeToken().then(user => {
      dispatch(getListStudent({ id: user.id }));
    });
  }, []);

  return (

    <ViewVertical style={{ backgroundColor: colors.background, width: '100%' }}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: colors.redBold,
          fontSize: fontSizes.small,
          fontWeight: 'bold',
          ...fontFamilies.medium,
          height: 'auto',
        }}
        mainText={strings('listMenu_student')}
        stylesHeader={styles.header}
        leftComponent={<Image resizeMode="cover" style={styles.backarrow} source={BACK_ARROW} />}
        leftAction={() => NavigationActionsService.pop()}
      />
      <ViewVertical style={styles.container}>
        <FlatList
          style={{ width: '100%' }}
          data={list}
          renderItem={renderItem}
          keyExtractor={(item: any, index: number) => index.toString()}
        />
      </ViewVertical>
    </ViewVertical>
  );
};

export default StudentListScreen;
