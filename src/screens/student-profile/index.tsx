import React, {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector, useDispatch} from 'react-redux';
import NavigationActionsService from '@utils/navigation';

import styles from './styles';
import colors from 'constants/colors';

import {ViewVertical} from 'components/viewBox.component';
import Header from 'components/header/header.component';
import Input from 'components/input.component';
import ListItem from 'components/listItem.component';
import Button from 'components/button.component';
import ToastComponent from 'components/toast.component';

import {fontSizes, fontFamilies} from 'constants/fonts';
import {BACK_ARROW, PROFILE_DEFAULT} from 'assets';
import {STUDENT_REPORT} from 'constants/index';

import {RootState} from 'reducers/';
import {
  updateStudent,
  getCurrentStudent,
  resetMessage,
} from 'actions/student.action';
import {strings} from 'utils/i18n';
import BaseService from 'services/';
import Text from '@components/text.component';
import dayjs from 'dayjs';

const StudentSchema = () => {
  return yup.object().shape({
    fullname: yup
      .string()
      .required(strings('studentProfile_inputRequired'))
      .min(1, strings('studentProfile_nameMinLength'))
      .max(250, strings('studentProfile_nameMaxLength'))
      .nullable(),
    year: yup.string(),
    gradeClass: yup.object(),
    pupilCode: yup.string(),
  });
};

const initialValues = {
  fullname: '',
  dateOfBirth: '',
  year: '',
  gradeClass: {},
  pupil: '',
};

interface form {
  studentId: string;
  fullname: string;
  dateOfBirth: string;
}

const StudentProfile = ({route}: any) => {
  const props = route.params;

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(true);
  const [textButton, setTextButton] = useState(
    strings('studentProfile_btnRequest'),
  );
  const [base, setBase] = useState('');
  const [isDateChange, setIsDateChange] = useState(true);

  const dispatch = useDispatch();

  const current: any = useSelector<RootState>(
    (state: RootState) => state.student.current,
  );
  const language: any = useSelector<RootState>(
    (state: RootState) => state.language.currentLanguage,
  );

  const message: any = useSelector<RootState>(
    (state: RootState) => state.student.message.current,
  );

  const submit = (values: any, {resetForm}: any) => {
    const {fullname} = values;

    const valuesSubmit = {
      studentId: current.id,
      dateOfBirth: date.toISOString(),
      fullname: fullname,
    };

    dispatch(updateStudent(valuesSubmit));
    current && current.dateOfBirth
      ? setDate(new Date(current.dateOfBirth))
      : '';
    resetForm({});
    setDisable(true);
    setTextButton(strings('studentProfile_btnRequest'));
  };

  const onChange = (selectedDate?: Date) => {
    const currentDate = selectedDate || date;

    setShow(false);
    setDate(currentDate);
    setIsDateChange(true);
  };

  const handleUpdate = () => {
    setDisable(false);
    setIsDateChange(false);
    setTextButton(strings('studentProfile_btnSubmit'));
  };

  const {type, text} = message;

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
    dispatch(getCurrentStudent({studentId: props.studentId}));
    getAvatar();
    current && current.dateOfBirth
      ? setDate(new Date(current.dateOfBirth))
      : '';
  }, [current && current.dateOfBirth]);

  return (
    <ViewVertical style={{backgroundColor: colors.background}}>
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
          mainText={props.studentName || 'Name'}
          stylesHeader={styles.header}
          leftComponent={
            <Image
              resizeMode="cover"
              style={styles.backarrow}
              source={BACK_ARROW}
            />
          }
          leftAction={() => NavigationActionsService.pop()}
        />
        <KeyboardAwareScrollView
          style={styles.scrollView}
          scrollEnabled={true}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          extraHeight={130}
          showsVerticalScrollIndicator={false}>
          <ViewVertical style={styles.headerStudent}>
            <ListItem
              containerStyle={{paddingLeft: 10}}
              title={current ? current.fullname : ''}
              subtitle={
                current && current.gradeClass ? current.gradeClass.name : ''
              }
              leftAvatar={{
                source:
                  base && current && current.avatar
                    ? {uri: `data:image/*;base64,${base}`}
                    : PROFILE_DEFAULT,
                size: 60,
              }}
            />
          </ViewVertical>
          <Formik
            initialValues={current ? current : initialValues}
            validationSchema={StudentSchema}
            onSubmit={submit}
            enableReinitialize={true}>
            {({handleSubmit, values, errors, isValid, setValues, dirty}) => (
              <ViewVertical style={styles.form}>
                <Input
                  label={strings('studentProfile_labelName')}
                  value={values.fullname}
                  onChangeText={(field: string) =>
                    setValues({...values, fullname: field})
                  }
                  labelStyle={styles.labelStyle}
                  errorMessage={errors.fullname}
                  placeholder={strings('studentProfile_labelName')}
                  autoCorrect={false}
                  errorStyle={styles.errorStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  disabled={disable}
                />
                <TouchableOpacity
                  onPress={() => setShow(true)}
                  disabled={disable}>
                  <View pointerEvents="none" style={{width: '100%'}}>
                    <Input
                      label={strings('studentProfile_labelDate')}
                      value={
                        language == 'vi'
                          ? dayjs(date).format('DD-MM-YYYY')
                          : dayjs(date).format('DD-MMM-YYYY')
                      }
                      labelStyle={styles.labelStyle}
                      errorMessage={errors.dateOfBirth}
                      placeholder="19-Fed-2010"
                      autoCorrect={false}
                      editable={false}
                      inputContainerStyle={styles.inputContainerStyle}
                      disabled={disable}
                    />
                  </View>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={show}
                  mode="date"
                  onConfirm={onChange}
                  onCancel={() => setShow(false)}
                  date={date}
                  maximumDate={new Date()}
                  minimumDate={new Date('01/01/2000') || undefined}
                  display="spinner"
                  locale={language}
                />
                <Input
                  label={strings('studentProfile_labelYear')}
                  value={
                    values.gradeClass && values.gradeClass.yearGroup
                      ? values.gradeClass.yearGroup.name
                      : ''
                  }
                  // onChangeText={(field: string) => setValues({ ...values, year: field })}
                  labelStyle={styles.labelStyle}
                  // errorMessage={errors.year}
                  placeholder="Y05"
                  autoCorrect={false}
                  errorStyle={styles.errorStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  disabled={true}
                />

                <Input
                  label={strings('studentProfile_labelGrade')}
                  value={values.gradeClass ? values.gradeClass.name : ''}
                  // onChangeText={(field: string) => setValues({ ...values, grade: field })}
                  labelStyle={styles.labelStyle}
                  // errorMessage={errors.grade}
                  placeholder="5B"
                  autoCorrect={false}
                  errorStyle={styles.errorStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  disabled={true}
                />

                <Input
                  label={strings('studentProfile_labelPupil')}
                  value={values.pupilCode}
                  // onChangeText={(field: string) => setValues({ ...values, pupilCode: field })}
                  labelStyle={styles.labelStyle}
                  // errorMessage={errors.pupilCode}
                  placeholder="5B"
                  autoCorrect={false}
                  errorStyle={styles.errorStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  disabled={true}
                />

                <Button
                  disabled={(!isDateChange && !dirty && !disable) || !isValid}
                  onPress={() => {
                    if (disable) {
                      handleUpdate();
                      return;
                    }
                    isValid && handleSubmit();
                  }}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={styles.buttonStyle}
                  containerStyle={styles.buttonContainer}
                  title={textButton}
                />
              </ViewVertical>
            )}
          </Formik>
          <ViewVertical>
            <Button
              onPress={() =>
                NavigationActionsService.push(STUDENT_REPORT, {
                  student: current,
                  avatar: base,
                })
              }
              title={strings('studentProfile_labelReport')}
              type="clear"
              buttonStyle={styles.reportButtonStyle}
              containerStyle={styles.reportButtonContainer}
              titleStyle={styles.reportTitleStyle}
            />
          </ViewVertical>
        </KeyboardAwareScrollView>
      </ViewVertical>
    </ViewVertical>
  );
};

export default StudentProfile;
