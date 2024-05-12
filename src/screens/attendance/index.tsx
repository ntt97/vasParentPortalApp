import styles from './styles';
import React, {useEffect, useState} from 'react';
import {ViewHorizontal, ViewVertical} from '@components/viewBox.component';
import {
  Image,
  ScrollView,
  Text,
  Modal,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from 'react-native';
import colors from '@constants/colors';
import Header from '@components/header/header.component';
import {fontFamilies, fontSizes} from '@constants/fonts';
import {BACK_ARROW} from 'assets/';
import NavigationActionsService from '@utils/navigation';
import IconAnt from 'react-native-vector-icons/FontAwesome5';
import IconAntA from 'react-native-vector-icons/AntDesign';
import {strings} from '@utils/i18n';
import {RootState} from 'reducers/';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {
  getAttendanceByDay,
  getAttendanceByDayFailed,
} from '@actions/attendance';

const MealScreen = ({route}: any) => {
  const props = route.params;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState('');
  const attendanceRes = useSelector<RootState>(
    (state: RootState) => state.attendance,
  ) as any;
  const language: any = useSelector<RootState>(
    (state: RootState) => state.language.currentLanguage,
  );
  const [currentDay, setCurrentDay] = useState({time: moment(), isChange: 0});

  async function getData() {
    dispatch(
      getAttendanceByDay({
        studentId: props.studentId,
        filterMonth: currentDay.time.format('X'),
        langId: language,
        version: 'v1',
      }),
    );
  }
  useEffect(() => {
    getData();
  }, []);
  async function inCreaseAMonth() {
    if (
      moment(currentDay.time.format('YYYY-MM')).isSameOrAfter(
        moment().format('YYYY-MM'),
      )
    ) {
      return;
    }
    const newTime = currentDay.time.add(1, 'M');
    dispatch(
      getAttendanceByDay({
        studentId: props.studentId,
        filterMonth: newTime.format('X'),
        langId: language,
        version: 'v1',
      }),
    );
    setCurrentDay({...currentDay, time: newTime});
  }
  async function deCreaseAMonth() {
    const newTime = currentDay.time.add(-1, 'M');
    dispatch(
      getAttendanceByDay({
        studentId: props.studentId,
        filterMonth: newTime.format('X'),
        langId: language,
        version: 'v1',
      }),
    );
    setCurrentDay({...currentDay, time: newTime});
  }

  return (
    <ViewVertical style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <ViewVertical style={styles.modalView}>
            <ViewHorizontal style={styles.headerModal}>
              <View />
              <Text style={styles.modalText}>{strings('NOTE')}</Text>
              <IconAnt
                onPress={() => setModalVisible(!modalVisible)}
                name="times-circle"
                size={25}
                color={colors.newRed}
              />
            </ViewHorizontal>

            <ViewVertical style={styles.modalTextDesc}>
              <Text style={styles.txtDesc}>{note}</Text>
            </ViewVertical>
          </ViewVertical>
        </View>
      </Modal>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: colors.redBold,
          fontSize: fontSizes.small,
          fontWeight: 'bold',
          ...fontFamilies.medium,
          height: 'auto',
        }}
        mainText={strings('ATTENDANCE') || 'Name'}
        stylesHeader={styles.header}
        leftComponent={
          <Image
            resizeMode="cover"
            style={styles.backarrow}
            source={BACK_ARROW}
          />
        }
        leftAction={() => {
          NavigationActionsService.pop();
          dispatch(getAttendanceByDayFailed('error'));
        }}
      />
      <ScrollView style={{flex: 1, padding: 20}}>
        <ViewHorizontal style={[styles.headerFlatCalendar, {marginBottom: 15}]}>
          <TouchableOpacity
            style={{paddingVertical: 12, paddingHorizontal: 20}}
            onPress={deCreaseAMonth}>
            <IconAnt name="chevron-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={[styles.textTitleFlat, {color: colors.white}]}>
            {currentDay.time.format('MMMM, YYYY')}
          </Text>
          <TouchableOpacity
            style={{paddingVertical: 12, paddingHorizontal: 20}}
            onPress={inCreaseAMonth}>
            <IconAnt
              name="chevron-right"
              size={20}
              color={
                moment(currentDay.time.format('YYYY-MM')).isSameOrAfter(
                  moment().format('YYYY-MM'),
                )
                  ? colors.gray
                  : colors.white
              }
            />
          </TouchableOpacity>
        </ViewHorizontal>
        {!attendanceRes.status ? (
          <ViewHorizontal
            style={[
              {borderWidth: 0, alignItems: 'center', justifyContent: 'center'},
            ]}>
            <Text style={[styles.txtGreen]}>
              {strings('NO_DATA_ATTENDANCE')}
            </Text>
          </ViewHorizontal>
        ) : null}

        <ViewHorizontal>
          <ViewHorizontal
            style={[
              styles.item,
              {
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                borderWidth: 0,
              },
            ]}>
            <Text style={styles.txtDay}></Text>
          </ViewHorizontal>
          <ViewHorizontal
            style={[styles.item, {borderWidth: 0, alignItems: 'flex-end'}]}>
            <Text style={[styles.txtBlue, {color: colors.newRed}]}>
              {!attendanceRes.status ? '' : strings('morning')}
            </Text>
          </ViewHorizontal>
          <ViewHorizontal
            style={[styles.item, {borderWidth: 0, alignItems: 'flex-end'}]}>
            <Text style={[styles.txtGreen, {color: colors.newRed}]}>
              {!attendanceRes.status ? '' : strings('afternoon')}
            </Text>
          </ViewHorizontal>
        </ViewHorizontal>

        {Object.values(attendanceRes.data).map((week: any) => {
          if (!week) {
            return;
          }
          return (
            <ViewVertical key={week?.name || ''} style={styles.blockBreackfast}>
              <ViewHorizontal style={{flex: 1}}>
                <ViewVertical
                  style={{
                    width: 20,
                    backgroundColor: colors.newRed,
                    marginTop: 5,
                  }}
                />
                <ViewHorizontal style={styles.headerFlat}>
                  <Text style={styles.textTitleFlat}>{week?.name || ''}</Text>
                </ViewHorizontal>
              </ViewHorizontal>
              <ViewVertical style={styles.containerActivities}>
                {week?.items?.map((item: any, index: number) => {
                  return (
                    <ViewHorizontal key={index} style={styles.itemDay}>
                      <ViewHorizontal
                        style={[
                          styles.item,
                          {
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                          },
                        ]}>
                        <Text style={styles.txtDay}>{item.attendanceDate}</Text>
                        <IconAntA
                          onPress={() => {
                            setModalVisible(true), setNote(item.Note);
                          }}
                          name="infocirlceo"
                          size={15}
                          color={'#881D1F'}
                        />
                      </ViewHorizontal>
                      <ViewHorizontal style={styles.item}>
                        <Text
                          style={[
                            styles.txtBlue,
                            {color: item?.Morning?.corlor || colors.black},
                          ]}>
                          {item?.Morning?.name || ''}
                        </Text>
                      </ViewHorizontal>
                      <ViewHorizontal style={styles.item}>
                        <Text
                          style={[
                            styles.txtGreen,
                            {color: item?.Afternoon?.corlor || colors.black},
                          ]}>
                          {item?.Afternoon?.name || ''}
                        </Text>
                      </ViewHorizontal>
                    </ViewHorizontal>
                  );
                })}
              </ViewVertical>
            </ViewVertical>
          );
        })}
        <View style={{height: 100}}></View>
      </ScrollView>
    </ViewVertical>
  );
};

export default MealScreen;
