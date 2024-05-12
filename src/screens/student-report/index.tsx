import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles';
import {ViewVertical} from 'components/viewBox.component';
import ListItem from 'components/listItem.component';
import Text from '@components/text.component';
import Table from '@components/table.components';
import RNPickerSelect from 'react-native-picker-select';

import NavigationActionsService from '@utils/navigation';
import {getListReportStudent, getAllList} from 'actions/student.action';
import {RootState} from 'reducers/';
import {PDF_SCREEN} from 'constants/index';
import {strings} from 'utils/i18n';
import {PROFILE_DEFAULT, DOWN_ARROW_BLACK, DOWN_ARROW_WHITE} from 'assets';

const StudentReport = ({route}: any) => {
  const props = route.params;
  const [year, setYear] = useState(0);
  const [period, setPeriod] = useState(0);
  const [arrPeriod, setArrPeriod] = useState<any>([]);
  const dispatch = useDispatch();

  const {student, avatar} = props;

  const students: any = useSelector<RootState>(
    (state: RootState) => state.student,
  );

  const {schoolYears, terms, periods, reports} = students;

  const rightElement = () => {
    return (
      <TouchableOpacity
        style={styles.btnClose}
        onPress={() => {
          setPeriod(0);
          setYear(0);
          NavigationActionsService.pop();
        }}>
        <Icon name="close" size={24} color={'#8B1D1F'} />
      </TouchableOpacity>
    );
  };

  const columns = [
    {
      title: strings('studentReport_labelName'),
      dataIndex: 'name',
      width: '70%',
    },
    {
      title: strings('studentReport_labelAction'),
      dataIndex: 'link',
      render: (link: any) => {
        return (
          <TouchableOpacity
            onPress={() =>
              NavigationActionsService.push(PDF_SCREEN, {
                link,
                id: student.id,
              })
            }
            style={{width: '100%'}}>
            <Text style={styles.textView}>
              {strings('studentReport_labelView')}
            </Text>
          </TouchableOpacity>
        );
      },
      width: '30%',
    },
  ];

  const changeYear = (id: number) => {
    setYear(id);
    const arrTerms = terms.filter((value: any) => value.schoolYearId === id);
    const arrPeriods = periods.filter((period: any) =>
      arrTerms.find((x: any) => x.id === period.term_id),
    );
    if (arrPeriods.length > 0) {
      const rename = renameField(arrPeriods);

      setArrPeriod(rename);
      changePeriod(rename[rename.length - 1].value);
      // if (id == schoolYears[schoolYears.length - 1].value && period == 0) {
      //   changePeriod(rename[rename.length - 1].value);
      //   return;
      // }
    } else {
      setPeriod(0);
      setArrPeriod([]);
    }
  };
  const changePeriod = (period_id: number) => {
    setPeriod(period_id || 0);
    if (period_id && period != period_id)
      dispatch(
        getListReportStudent({studentId: student.id, period: period_id || 0}),
      );
  };

  if (year === 0 && schoolYears.length > 0 && terms.length > 0) {
    changeYear(schoolYears[schoolYears.length - 1].value);
  }

  function renameField(arrays: any) {
    let arrLate = arrays.map((obj: any) => {
      const objTemp = {value: '', label: ''};
      objTemp['value'] = obj['id'];
      objTemp['label'] = obj['name'];
      return objTemp;
    });
    return arrLate;
  }

  useEffect(() => {
    dispatch(getAllList({studentId: student.id}));
  }, []);

  return (
    <ViewVertical style={styles.container}>
      <ListItem
        containerStyle={styles.itemContainer}
        title={student ? student.fullname : ''}
        subtitle={student && student.gradeClass ? student.gradeClass.name : ''}
        leftAvatar={{
          source: avatar
            ? {uri: `data:image/*;base64,${avatar}`}
            : PROFILE_DEFAULT,
          size: 60,
        }}
        rightElement={rightElement()}
        bottomDivider></ListItem>

      <Text style={styles.textStyle}>
        {strings('studentReport_headerTitle')}
      </Text>

      <Text style={styles.pickerText}>
        {strings('studentReport_labelYear')}
      </Text>
      <ViewVertical style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={changeYear}
          placeholder={{}}
          style={{
            inputIOS: {...styles.inputIOS},
            inputAndroid: {...styles.inputAndroid},
          }}
          useNativeAndroidPickerStyle={false}
          value={year}
          items={schoolYears}
        />
      </ViewVertical>

      <Text style={styles.pickerText}>
        {strings('studentReport_labelPeriod')}
      </Text>
      <ViewVertical style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={changePeriod}
          placeholder={{}}
          style={{
            inputIOS: {...styles.inputIOS},
            inputAndroid: {...styles.inputAndroid},
          }}
          useNativeAndroidPickerStyle={false}
          value={period || 0}
          items={arrPeriod}
        />
      </ViewVertical>

      <Table
        columns={columns}
        dataSource={period ? reports : []}
        style={{width: '100%'}}
      />
    </ViewVertical>
  );
};

export default StudentReport;
