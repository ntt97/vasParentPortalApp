import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ViewHorizontal, ViewVertical} from 'components/viewBox.component';
import styles from './styles';
import {Calendar, DateObject} from 'react-native-calendars';
import moment from 'moment';
import colors from 'constants/colors';
import Header from '@components/header/header.component';
import {strings} from '@utils/i18n';
import {
  BACK_ARROW,
  IC_STUDENT,
  IC_LOCATION,
  IC_CLOCK,
  IC_STUDENT_GRAY,
  IC_LOCATION_GRAY,
  IC_CLOCK_GRAY,
  IC_SHARE,
} from 'assets/';
import {fontFamilies, fontSizes} from '@constants/fonts';
import NavigationActionsService from '@utils/navigation';
import Text from '@components/text.component';
import BaseService from 'services';
import get from 'lodash.get';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

const THEME_COLOR: any = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#205072',
  selectedDayBackgroundColor: '#ffffff',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#205072',
  arrowColor: '#FFF',
  textMonthFontWeight: 'bold',
  textMonthFontSize: 14,
  monthTextColor: '#FFF',
  'stylesheet.calendar.main': {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: colors.white,
    },
  },
  'stylesheet.calendar.header': {
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 0,
      alignItems: 'center',
      backgroundColor: colors.redMeetingColor,
    },
  },
};
const SELECTED_DATE: any = {
  selected: true,
  disableTouchEvent: true,
  selectedColor: '#FFF',
  selectedTextColor: '#205072',
};

const ParentMeetingScreen = () => {
  const [dateSelected, setDateSelected] = useState<any>(
    moment().format('YYYY-MM-DD'),
  );
  const [meetingData, setMeetingData] = useState<any[]>([]);
  const [dateExistMeeting, setDateExistMeeting] = useState<any>({});
  const [meetingSelected, setMeetingSelected] = useState<any[]>([]);
  const [monthSelected, setMonthSelected] = useState(
    moment().format('YYYY-MM'),
  );

  const sortMeeting = useCallback((meetings: any[]) => {
    const activeMeetings: any[] = [];
    const disableMeetings: any[] = [];

    meetings.forEach(item => {
      if (checkDisableMeeting(item)) {
        disableMeetings.push({...item, isOutOfTime: true});
      } else {
        activeMeetings.push(item);
      }
    });

    disableMeetings.sort(sortTime);

    disableMeetings.sort(sortTime);

    return [...activeMeetings, ...disableMeetings];
  }, []);

  const getMeetingInCurrentMonth = useCallback(async () => {
    // const monthSelected = moment().format('YYYY-MM');
    NavigationActionsService.showLoading();
    const response = await BaseService.instance.meeting.getMeeting({
      date: monthSelected,
      page: 1,
      limit: 500,
    });
    const data: any[] = response.data || [];
    setMeetingData(data);

    const result: any = {};
    data.forEach(item => {
      const formatDate = moment(item.date).format('YYYY-MM-DD');
      result[formatDate] = true;
    });
    setDateExistMeeting(result);
    NavigationActionsService.hideLoading();
  }, [monthSelected]);

  useEffect(() => {
    // get list meeting at current date
    const filterMeeting = meetingData.filter(item => {
      return item.date === dateSelected;
    });
    setMeetingSelected(sortMeeting(filterMeeting));
  }, [meetingData, sortMeeting, dateSelected]);

  useEffect(() => {
    getMeetingInCurrentMonth();
  }, [getMeetingInCurrentMonth]);

  const handleMonthChange = (date: DateObject) => {
    setMeetingSelected([]);
    setMonthSelected(moment(date.dateString).format('YYYY-MM'));
  };

  const onDayPress = (date: DateObject, state: string) => {
    const result = moment(date.dateString).format('YYYY-MM-DD');

    if (state !== 'disabled') {
      setDateSelected(result);

      const filterMeeting = meetingData.filter(item => {
        return item.date === result;
      });

      setMeetingSelected(sortMeeting(filterMeeting));
    }
  };

  function sortTime(a: any, b: any) {
    const aTime = Date.parse('9/19/2014 ' + a.startTime);
    const bTime = Date.parse('9/19/2014 ' + b.startTime);

    if (aTime < bTime) {
      return -1;
    }

    if (aTime > bTime) {
      return 1;
    }

    return 0;
  }

  const getBrColor = (date: DateObject, state: string) => {
    let isSelected = false;

    if (state === 'today') {
      return 'rgba(229,101,101,0.5)';
    }

    if (dateSelected) {
      isSelected = !moment(dateSelected).diff(date.dateString);
    }

    if (isSelected) {
      return '#FFF';
    }

    return '#FFF';
  };

  const styleColorDate = (date: DateObject, state: string): any => {
    return {
      textAlign: 'center',
      color: '#205072',
    };
  };

  const getBorderStyle = (date: DateObject, state: string): any => {
    let isSelected = false;
    if (dateSelected) {
      isSelected = !moment(dateSelected).diff(date.dateString);
    }

    return {
      borderColor:
        isSelected && state !== 'today' ? colors.redMeetingColor : colors.white,
      borderWidth: 1,
    };
  };

  const styleBackgroundColor = (date: DateObject, state: string): any => {
    return {
      borderRadius: 20,
      backgroundColor: getBrColor(date, state),
      width: 40,
      height: 40,
      justifyContent: 'center',
      ...getBorderStyle(date, state),
    };
  };

  const renderDot = useCallback(
    (date: DateObject, state: string) => {
      const dateFormat = moment(date.dateString).format('YYYY-MM-DD');
      if (dateExistMeeting[dateFormat]) {
        return (
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 5,
              backgroundColor: colors.redMeetingColor,
              position: 'absolute',
              left: 18,
              bottom: 3,
            }}
          />
        );
      }
      return null;
    },
    [dateExistMeeting],
  );

  const checkDisableMeeting = (itemMeeting: any) => {
    if (
      moment(itemMeeting.date + ' ' + itemMeeting.endTime).isBefore(
        moment().format(),
      )
    ) {
      return true;
    }
    return false;
  };

  const onPressSaveCalenda = async (item: any) => {
    const title =
      await `${item.meeting.name} - ${item.student.fullname} - ${item.student.gradeClass.name}`;
    if (Platform.OS == 'ios') {
    }

    AddCalendarEvent.presentEventCreatingDialog({
      title: title,
      startDate: moment(`${item?.date} ${item?.startTime}`)
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      endDate: moment(`${item?.date} ${item?.endTime}`)
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      location: item.student.gradeClass.yearGroup.campus.name,
    })
      .then(
        (eventInfo: {
          calendarItemIdentifier: string;
          eventIdentifier: string;
        }) => {
          console.warn('JSON.stringify(eventInfo)', JSON.stringify(eventInfo));
        },
      )
      .catch((error: string) => {
        console.warn(error);
      });
  };
  return (
    <ViewVertical style={{backgroundColor: colors.background, flex: 1}}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: colors.redMeetingColor,
          fontSize: fontSizes.small,
          fontWeight: 'bold',
          ...fontFamilies.medium,
          height: 'auto',
        }}
        mainText={strings('parentMeeting_title')}
        stylesHeader={styles.header}
        leftComponent={
          <Image
            resizeMode="cover"
            style={styles.backArrow}
            source={BACK_ARROW}
          />
        }
        leftAction={() => NavigationActionsService.pop()}
      />
      <ScrollView>
        <ViewVertical style={styles.container}>
          <Calendar
            style={{borderWidth: 1, borderColor: '#BEBEBE', marginBottom: 20}}
            markedDates={{
              [dateSelected]: SELECTED_DATE,
            }}
            monthFormat={'MMMM, yyyy'}
            hideExtraDays={true}
            firstDay={1}
            theme={THEME_COLOR}
            onMonthChange={handleMonthChange}
            dayComponent={({date, state}) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    onDayPress(date, state);
                  }}>
                  <View style={styleBackgroundColor(date, state)}>
                    <Text style={styleColorDate(date, state)}>{date.day}</Text>
                    {renderDot(date, state)}
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />

          {meetingSelected.length === 0 ? (
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '400',
                fontStyle: 'italic',
                color: 'black',
              }}>
              {strings('parentMeeting_eventNoFound')}
            </Text>
          ) : null}

          {meetingSelected.map(item => {
            const gradeName = get(item, 'student.gradeClass.name', '');
            const location = get(
              item,
              'student.gradeClass.yearGroup.campus.name',
              '',
            );

            const time =
              moment(item.startTime, 'HH:mm:ss').format('HH:mm') +
              ' - ' +
              moment(item.endTime, 'HH:mm:ss').format('HH:mm');

            const isDisableMeeting = !!item.isOutOfTime;

            return (
              <View
                key={item.id}
                style={
                  isDisableMeeting
                    ? styles.boxMeetingDisable
                    : styles.boxMeeting
                }>
                <Text
                  style={
                    isDisableMeeting ? styles.titleBoxDisable : styles.titleBox
                  }>
                  {strings('parentMeeting_titleCalendarMeeting')}
                </Text>
                {!isDisableMeeting ? (
                  <TouchableOpacity
                    onPress={() => onPressSaveCalenda(item)}
                    style={{
                      position: 'absolute',
                      right: 20,
                      bottom: 10,
                      zIndex: 999,
                    }}>
                    <Image source={IC_SHARE}></Image>
                  </TouchableOpacity>
                ) : null}
                <ViewHorizontal style={styles.itemTextIcon}>
                  <Image
                    source={isDisableMeeting ? IC_STUDENT_GRAY : IC_STUDENT}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                  <Text
                    style={isDisableMeeting ? {color: colors.inactive} : {}}>
                    {item.student.fullname + ' - ' + gradeName}
                  </Text>
                </ViewHorizontal>
                <ViewHorizontal style={styles.itemTextIcon}>
                  <Image
                    source={isDisableMeeting ? IC_LOCATION_GRAY : IC_LOCATION}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                  <Text
                    style={isDisableMeeting ? {color: colors.inactive} : {}}>
                    {location}
                  </Text>
                </ViewHorizontal>
                <ViewHorizontal
                  style={{...styles.itemTextIcon, marginBottom: 0}}>
                  <Image
                    source={isDisableMeeting ? IC_CLOCK_GRAY : IC_CLOCK}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                  <Text
                    style={isDisableMeeting ? {color: colors.inactive} : {}}>
                    {time}
                  </Text>
                </ViewHorizontal>
              </View>
            );
          })}
        </ViewVertical>
      </ScrollView>
    </ViewVertical>
  );
};

export default ParentMeetingScreen;
