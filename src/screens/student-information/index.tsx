import React, { useCallback, useEffect, useState } from 'react';
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
import { ATTENDANCE_SCREEN, BEHAVIOR_POINT_SCREEN, MEAL_SCREEN, STUDENT_PROFILE, STUDENT_REPORT } from 'constants/';
import { setCurrentStudent } from '@actions/meeting.action';

const StudentInformation = (props: any) => {
  const [date, setDate] = useState(new Date());
  const [base, setBase] = useState('');
  const dispatch = useDispatch();
  const current: any = useSelector<RootState>((state: RootState) => state.student.current);
  const language: any = useSelector<RootState>((state: RootState) => state.language.currentLanguage);
  const message: any = useSelector<RootState>((state: RootState) => state.student.message.current);
  const [listMenu, setListMenu] = useState([]);
  const notifyAttendance: any = useSelector<RootState>((state: RootState) => state.studentNotification.attendance);
  const notifyMeal: any = useSelector<RootState>((state: RootState) => state.studentNotification.meal);

  const { type, text } = message;
  if (type || text) {
    ToastComponent(type, text);
    dispatch(resetMessage());
  }

  useEffect(() => {
    async function getAvatar() {
      try {
        if (current && current.avatar) {
          const base = await BaseService.instance.user.getAvatar(current.avatar);
          setBase(base);
        } else {
          setBase('');
        }
      } catch (e) {}
    }
    getAvatar();

    if (current && current.dateOfBirth) {
      setDate(new Date(current.dateOfBirth));
    }
  }, [current]);

  useEffect(() => {
    dispatch(getCurrentStudent({ studentId: props.studentId }));
  }, [dispatch, props.studentId]);

  useEffect(() => {
    async function getListMenuStudentInformation() {
      const resJson = await BaseService.instance.event.getListMenuStudentInformation();
      if (resJson[0] && resJson[0].value) {
        setListMenu(resJson[0].value);
      }
    }
    getListMenuStudentInformation();

    return () => {
      dispatch(setCurrentStudent({}));
    };
  }, [dispatch]);

  const renderBadge = (item: any) => {
    let index: any = -1;
    switch (item.key) {
      case 'MEAL_MENU':
        index = notifyMeal.findIndex((element: any) => element.studentId === props.studentId);
        return index !== -1 ? (
          <ViewVertical style={styles.activeNew}>
            <Text style={styles.textBadge} numberOfLines={1}>
              *
            </Text>
          </ViewVertical>
        ) : null;
      case 'ATTENDANCE':
        index = notifyAttendance.findIndex((element: any) => element.studentId === props.studentId);
        return index !== -1 ? (
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

  const onGotoEvery = (item: any) => {
    switch (item.key) {
      case 'MEAL_MENU':
        return NavigationActionsService.push(MEAL_SCREEN, {
          studentId: props.studentId,
          studentName: props.studentName,
        });
      case 'ATTENDANCE':
        return NavigationActionsService.push(ATTENDANCE_SCREEN, {
          studentId: props.studentId,
          studentName: props.studentName,
        });
      case 'BEHAVIOR_POINT':
        return NavigationActionsService.push(BEHAVIOR_POINT_SCREEN, {
          studentId: props.studentId,
          studentName: props.studentName,
        });
      case 'REPORT':
        return NavigationActionsService.push(STUDENT_REPORT, {
          student: current,
          avatar: base,
        });

      default:
        return null;
    }
  };

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
          mainText={strings('student_information') || 'Name'}
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
              <Text style={[styles.inputContainerStyle, { fontSize: fontSizes.smaller }]}>
                {current.fullname || ''}
              </Text>
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
            <Text
              onPress={() => {
                NavigationActionsService.push(STUDENT_PROFILE, {
                  studentId: props.studentId,
                  studentName: props.studentName,
                });
              }}
              style={styles.link}
            >
              {strings('userProfile_btnRequest')}
            </Text>
          </ViewVertical>
        </ViewHorizontal>
        <ViewVertical style={{ flex: 2 / 3 }}>
          <ViewHorizontal style={styles.containerActivities}>
            {listMenu.map((item: any) => {
              return (
                <TouchableOpacity key={item.key} onPress={() => onGotoEvery(item)} style={styles.badgeContainer}>
                  <ViewHorizontal style={styles.badge}>
                    <IconAnt name={item.icon} size={25} color={colors.white} />
                    {renderBadge(item)}
                  </ViewHorizontal>
                  <Text numberOfLines={1} style={styles.textIcon}>
                    {strings(item.name)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ViewHorizontal>
        </ViewVertical>
      </ViewVertical>
    </ViewVertical>
  );
};

export default StudentInformation;
