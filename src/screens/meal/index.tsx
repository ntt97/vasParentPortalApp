import styles from './styles';
import React, { useEffect, useState } from 'react';
import { ViewHorizontal, ViewVertical } from '@components/viewBox.component';
import { Image, ScrollView, Text, Group, TouchableOpacity } from 'react-native';
import colors from '@constants/colors';
import Header from '@components/header/header.component';
import { fontFamilies, fontSizes } from '@constants/fonts';
import { BACK_ARROW } from 'assets/';
import NavigationActionsService from '@utils/navigation';
import IconAnt from 'react-native-vector-icons/FontAwesome5';
import { strings } from '@utils/i18n';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers/';
import { getMealByDay, getMealByDaySuccess } from '@actions/meal.action';
const listDayWeek = [
  {
    id: 0,
    en: 'Mo',
    vi: 'T2',
    isDisable: false
  },
  {
    id: 1,
    en: 'Tu',
    vi: 'T3',
    isDisable: false
  },
  {
    id: 2,
    en: 'We',
    vi: 'T4',
    isDisable: false
  },
  {
    id: 3,
    en: 'Th',
    vi: 'T5',
    isDisable: false
  },
  {
    id: 4,
    en: 'Fr',
    vi: 'T6',
    isDisable: false
  },

];

const MealScreen = (props: any) => {
  const [indexWeek, setIndexWeek] = useState(0);
  const [currentDay, setCurrentDay] = useState(moment().clone());
  const language: any = useSelector<RootState>((state: RootState) => state.language.currentLanguage);
  const mealRes = useSelector<RootState>((state: RootState) => state.meal.data) as any;
  const isError = useSelector<RootState>((state: RootState) => state.meal.status) as any;
  const dispatch = useDispatch();

  async function getData(time: any) {
    dispatch(getMealByDay({ studentId: props.studentId, filterDate: time.format('X'), version: 'v1' }));
  }
  useEffect(() => {
    getData(currentDay)
  }, []);
  const onSelect = (index: number) => {
    let tmpTime = moment().clone().add(indexWeek, 'week').startOf('isoWeek');
    switch (index) {
      case 0:
        setCurrentDay(tmpTime);
        getData(tmpTime);
        return;
      case 1:
        let tmpTimeTu = tmpTime.add(1, 'day');
        getData(tmpTimeTu);
        setCurrentDay(tmpTimeTu);
        return;
      case 2:
        let tmpTimeWe = tmpTime.add(2, 'day');
        getData(tmpTimeWe);
        setCurrentDay(tmpTimeWe);
        return;
      case 3:
        let tmpTimeTh = tmpTime.add(3, 'day');
        getData(tmpTimeTh);
        setCurrentDay(tmpTimeTh);
        return
      case 4:
        let tmpTimeFr = tmpTime.add(4, 'day');
        getData(tmpTimeFr);
        setCurrentDay(tmpTimeFr);
        return
      default:
        return;
    }
  }
  const thingLanguage = (item: any) => {
    return language == 'en' ? item.en : item.vi || '';
  }

  const onNext = () => {
    if (moment().week() === moment().add(indexWeek, 'week').week()) {
      return;
    }
    let tmpTime = moment().clone().add(indexWeek + 1, 'week').startOf('isoWeek');
    getData(tmpTime);
    setCurrentDay(tmpTime);
    setIndexWeek(indexWeek + 1);

  }
  const onPre = () => {
    let tmpTime = moment().clone().add(indexWeek - 1, 'week').startOf('isoWeek');
    getData(tmpTime);
    setCurrentDay(tmpTime);
    setIndexWeek(indexWeek - 1);
  }

  const splitString = (str: string) => {
    return str?.split('\n') || ["", ""];
  }

  return (
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
        mainText={strings('MEAL_MENU') || 'Name'}
        stylesHeader={styles.header}
        leftComponent={<Image resizeMode="cover" style={styles.backarrow} source={BACK_ARROW} />}
        leftAction={() => { NavigationActionsService.pop(); dispatch(getMealByDaySuccess('error')); }}
      />
      <ScrollView style={{ flex: 1, padding: 20 }}>
        {/* Day */}
        <ViewVertical style={styles.blockDay}>
          <ViewHorizontal style={[styles.headerFlatCalendar]}>
            <TouchableOpacity onPress={onPre} style={{ paddingVertical: 12, paddingHorizontal: 20 }}><IconAnt name="chevron-left" size={20} color={colors.white} /></TouchableOpacity>
            <Text style={[styles.textTitleFlat]}>{`${strings("WEEK")} ${moment().add(indexWeek, 'week').week()} (${moment().add(indexWeek, 'week').startOf('isoWeek').format('DD/MM/YYYY')} - ${moment().add(indexWeek, 'week').endOf('isoWeek').format('DD/MM/YYYY')})`}</Text>
            <TouchableOpacity onPress={onNext} style={{ paddingVertical: 12, paddingHorizontal: 20 }}><IconAnt name="chevron-right" size={20} color={moment().week() === moment().add(indexWeek, 'week').week() ? colors.gray : colors.white} /></TouchableOpacity>

          </ViewHorizontal>
          <ViewHorizontal style={[styles.containerActivities, { borderWidth: 0, paddingLeft: 10 }]}>
            {listDayWeek?.map((item, index) => (
              <TouchableOpacity activeOpacity={0.9} onPress={() => onSelect(item.id)} style={[styles.itemDay, currentDay.format('dd') == thingLanguage(item) ? { backgroundColor: colors.newRed } : {}]} key={index}>
                <Text style={[styles.txtDay, currentDay.format('dd') == thingLanguage(item) ? { color: colors.white } : { color: item.isDisable ? colors.gray : '#06313E' }]}>{thingLanguage(item)}</Text>
              </TouchableOpacity>
            ))}
          </ViewHorizontal>
          {!isError ? (<ViewHorizontal style={[{ borderWidth: 0, alignItems: 'center', justifyContent: 'center' }]}>
            <Text style={styles.txtEn}>{strings("NO_DATA_ATTENDANCE")}</Text>
          </ViewHorizontal>) : null}
        </ViewVertical>
        {/* Breakfast */}
        {mealRes?.morning ? (
          <ViewVertical style={styles.blockBreackfast}>
            <ViewHorizontal style={styles.headerFlat}>
              <Text style={styles.textTitleFlat}>{strings('BREAKFAST')}</Text>
            </ViewHorizontal>
            <ViewVertical style={styles.containerActivities}>
              {mealRes?.morning?.map((item: string, index: number) => (
                <ViewHorizontal style={styles.containerItem}>
                  <ViewVertical style={styles.activeNew}>
                    <Text style={styles.textBadge}>{index + 1}</Text>
                  </ViewVertical>
                  <ViewVertical>
                    <Text style={styles.txtVi}>{splitString(item)[0] || ""}</Text>
                    <Text style={styles.txtEn}>{splitString(item)[1] || ""}</Text>
                  </ViewVertical>
                </ViewHorizontal>
              ))}
            </ViewVertical>
          </ViewVertical>
        ) : null}

        {/* Lunch */}
        {mealRes?.lunch ? (
          <ViewVertical style={styles.blockLunch}>
            <ViewHorizontal style={styles.headerFlat}>
              <Text style={styles.textTitleFlat}>{strings('LUNCH')}</Text>
            </ViewHorizontal>
            <ViewVertical style={styles.containerActivities}>
              {mealRes?.lunch?.map((item: string, index: number) => (
                <ViewHorizontal key={index} style={styles.containerItem}>
                  <ViewVertical style={styles.activeNew}>
                    <Text style={styles.textBadge}>{index + 1}</Text>
                  </ViewVertical>
                  <ViewVertical style={{ flex: 1 }}>
                    <Text style={styles.txtVi}>{splitString(item)[0] || ""}</Text>
                    <Text style={styles.txtEn}>{splitString(item)[1] || ""}</Text>
                  </ViewVertical>
                </ViewHorizontal>
              ))}
            </ViewVertical>
          </ViewVertical>
        ) : null}

        {/* Afternoon Snack */}
        {mealRes?.snack ? (
          <ViewVertical style={styles.blockAfternoonSnack}>
            <ViewHorizontal style={styles.headerFlat}>
              <Text style={styles.textTitleFlat}>{strings('AFTERNOON_SNACK')}</Text>
            </ViewHorizontal>
            <ViewVertical style={styles.containerActivities}>
              {mealRes?.snack?.map((item: string, index: number) => (
                <ViewHorizontal style={styles.containerItem}>
                  <ViewVertical style={styles.activeNew}>
                    <Text style={styles.textBadge}>{index + 1}</Text>
                  </ViewVertical>
                  <ViewVertical style={{ flex: 1 }}>
                    <Text style={styles.txtVi}>{splitString(item)[0] || ""}</Text>
                    <Text style={styles.txtEn}>{splitString(item)[1] || ""}</Text>
                  </ViewVertical>
                </ViewHorizontal>
              ))}
            </ViewVertical>
          </ViewVertical>
        ) : null}

        {/* Notes */}
        {mealRes?.Notes ? (
          <ViewVertical style={styles.blockNotes}>
            <ViewHorizontal style={styles.headerFlat}>
              <Text style={styles.textTitleFlat}>{strings("NOTE")}</Text>
            </ViewHorizontal>
            <ViewVertical style={styles.containerActivities}>
              <Text style={styles.txtNote}>
                {mealRes.Notes || ""}
              </Text>
            </ViewVertical>
          </ViewVertical>
        ) : null}

      </ScrollView>
    </ViewVertical>
  );
};

export default MealScreen;
