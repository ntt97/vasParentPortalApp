import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NavigationActionsService from '@utils/navigation';
import IconAnt from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import colors from 'constants/colors';

import { ViewHorizontal, ViewVertical } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import ToastComponent from 'components/toast.component';
import { fontSizes, fontFamilies } from 'constants/fonts';
import { BACK_ARROW, PROFILE_DEFAULT } from 'assets';
import { RootState } from 'reducers/';
import { getCurrentStudent, resetMessage } from 'actions/student.action';
import { strings } from 'utils/i18n';
import BaseService from 'services/';
import Text from '@components/text.component';
import dayjs from 'dayjs';
import { Avatar } from 'react-native-elements';
import { ATTENDANCE_SCREEN, MEAL_SCREEN, STUDENT_PROFILE } from 'constants/';

interface form {
  studentId: string;
  fullname: string;
  dateOfBirth: string;
}

const listMenu = [
  {
    key: 'ATTENDANCE',
    name: 'Attendance',
    icon: 'tasks',
  },
  {
    key: 'STUDENT_PLANNER',
    name: 'Student Planner',
    icon: 'calendar-alt',
  },
  {
    key: 'MEAL_MENU',
    name: 'Medical Menu',
    icon: 'utensils',
  },
  {
    key: 'SCHOOL_BUS',
    name: 'School Bus',
    icon: 'bus',
  },
  {
    key: 'ECA',
    name: 'ECA',
    icon: 'users',
  },

  {
    key: 'MEDICAL',
    name: 'Medical',
    icon: 'medkit',
  },
  {
    key: 'REPORT',
    name: 'Report',
    icon: 'file-invoice',
  },
  {
    key: 'BILLING',
    name: 'Billing',
    icon: 'file-invoice-dollar',
  },
  {
    key: 'BEHAVIOR_POINT',
    name: 'Behavior Point',
    icon: 'thumbs-up',
  },
];

const BehaviorPointScreen = (props: any) => {
  const [date, setDate] = useState(new Date());
  const [base, setBase] = useState('');

  const dispatch = useDispatch();

  const current: any = useSelector<RootState>((state: RootState) => state.student.current);
  const language: any = useSelector<RootState>((state: RootState) => state.language.currentLanguage);
  const message: any = useSelector<RootState>((state: RootState) => state.student.message.current);

  const { type, text } = message;

  if (type || text) {
    ToastComponent(type, text);
    dispatch(resetMessage());
  }

  const getAvatar = async () => {
    try {
      if (current && current.avatar) {
        const base = await BaseService.instance.user.getAvatar(current.avatar);
        setBase(base);
      }
    } catch (e) {}
  };

  useEffect(() => {
    dispatch(getCurrentStudent({ studentId: props.studentId }));
    getAvatar();
    current && current.dateOfBirth ? setDate(new Date(current.dateOfBirth)) : '';
  }, [current && current.dateOfBirth]);

  return (
    <ViewVertical style={{ backgroundColor: colors.background, flex: 1 }}>
      <ViewVertical style={styles.container}>
        <Header
          noShadow={true}
          stylesHeaderText={{
            color: colors.redBold,
            fontSize: fontSizes.small,
            fontWeight: 'bold',
            ...fontFamilies.medium,
            height: 'auto',
          }}
          mainText={strings('BEHAVIOR_POINT') || 'Name'}
          stylesHeader={styles.header}
          leftComponent={<Image resizeMode="cover" style={styles.backarrow} source={BACK_ARROW} />}
          leftAction={() => NavigationActionsService.pop()}
        />

        <ViewHorizontal style={{ flex: 1 / 3, padding: 20, justifyContent: 'space-between', alignItems: 'center' }}>
          <Avatar
            rounded
            source={base && current && current.avatar ? { uri: `data:image/*;base64,${base}` } : PROFILE_DEFAULT}
            size={60}
            containerStyle={{ marginRight: 15 }}
          />

          <ViewVertical style={styles.form}>
            <ViewHorizontal>
              <Text style={styles.labelStyle}>{strings('studentProfile_labelName')}:</Text>
              <Text style={[styles.inputContainerStyle]}>{current.fullname || ''}</Text>
            </ViewHorizontal>

            <ViewHorizontal>
              <Text style={styles.labelStyle}>{strings('studentProfile_labelDate')}:</Text>
              <Text style={styles.inputContainerStyle}>
                {language == 'vi' ? dayjs(date).format('DD-MM-YYYY') : dayjs(date).format('DD-MMM-YYYY')}
              </Text>
            </ViewHorizontal>

            <ViewHorizontal>
              <Text style={styles.labelStyle}>{strings('studentProfile_labelYear')}:</Text>
              <Text style={styles.inputContainerStyle}>
                {current.gradeClass && current.gradeClass.yearGroup ? current.gradeClass.yearGroup.name : ''}
              </Text>
            </ViewHorizontal>

            <ViewHorizontal>
              <Text style={styles.labelStyle}>{strings('studentProfile_labelGrade')}:</Text>
              <Text style={styles.inputContainerStyle}>{current.gradeClass ? current.gradeClass.name : ''}</Text>
            </ViewHorizontal>

            <ViewHorizontal>
              <Text style={styles.labelStyle}>{strings('studentProfile_labelPupil')}:</Text>
              <Text style={styles.inputContainerStyle}>{current.pupilCode || ''}</Text>
            </ViewHorizontal>
          </ViewVertical>
        </ViewHorizontal>
        <ViewVertical style={{ flex: 2 / 3 }}>
          <ViewVertical style={styles.containerActivities}>
            {listMenu.map(item => {
              return (
                <ViewHorizontal key={item.key} style={styles.badgeContainer}>
                  <IconAnt name={'thumbs-up'} size={20} color={colors.newRed} />
                  <ViewVertical style={styles.itemRight}>
                    <Text numberOfLines={1} style={styles.textIcon}>
                      {item.name}
                      <Text style={{ color: '#06313E' }}> for </Text>
                      {item.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.textIconDesc}>
                      {item.name}
                    </Text>
                  </ViewVertical>
                </ViewHorizontal>
              );
            })}
          </ViewVertical>
        </ViewVertical>
      </ViewVertical>
    </ViewVertical>
  );
};

export default BehaviorPointScreen;
