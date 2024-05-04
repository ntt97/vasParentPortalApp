/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {logoutWithSaga} from '@actions/auth.action';
import Header from '@components/header/header.component';
import withLanguageChange from '@components/hoc-language/hoc-language';
import Text from '@components/text.component';
import colors from '@constants/colors';
import {fontFamilies, fontSizes} from '@constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {strings} from '@utils/i18n';
import NavigationActionsService from '@utils/navigation';
import {
  getProfileUser,
  getRelationship,
  PayloadUser,
  resetMessage,
  updateUser,
  uploadAvatar,
} from 'actions/user.action';
import {BACK_ARROW, PROFILE_DEFAULT} from 'assets';
import Button from 'components/button.component';
import Input from 'components/input.component';
import ToastComponent from 'components/toast.component';
import {ViewVertical} from 'components/viewBox.component';
import {CHANGEPASS_SCREEN} from 'constants/';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Alert, Image, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'reducers/';
import BaseService from 'services/';
import {decodeToken, getCurrentUser} from 'utils/helper';
import * as yup from 'yup';
import styles from './styles';

const ProfileSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .min(1, strings('userProfile_nameMinLength'))
      .max(255, strings('userProfile_nameMaxLength'))
      .required(strings('userProfile_inputRequired'))
      .nullable(),
    relationship: yup
      .string()
      .min(1, strings('userProfile_relationshipMinLength'))
      .max(100, strings('userProfile_relationshipMaxLength'))
      .required(strings('userProfile_inputRequired'))
      .nullable(),
    email: yup
      .string()
      .email(strings('userProfile_emailInvalid'))
      .required(strings('userProfile_inputRequired'))
      .nullable(),
    phone: yup
      .string()
      .min(1, strings('userProfile_phoneMinLength'))
      .max(50, strings('userProfile_phoneMaxLength'))
      .required(strings('userProfile_inputRequired'))
      .nullable(),
    // .matches(/^[0-9]*$/, 'Phone must be number'),
  });
};

// interface FormProfile {
//   name: string;
//   relationship: string;
//   email: string;
//   phone: string;
// }
// const initialValues = {
//   name: '',
//   email: '',
//   relationship: '',
//   phone: '',
// };

const UserProfile = (props: any) => {
  const [pathImg, setPathImg] = useState({});
  const [disable, setDisable] = useState(true);
  const [textButton, setTextButton] = useState(
    strings('userProfile_btnRequest'),
  );
  const [base, setBase] = useState('');
  const dispatch = useDispatch();

  const user: any = useSelector<RootState>(
    (state: RootState) => state.user.profile,
  );

  const message: any = useSelector<RootState>(
    (state: RootState) => state.user.message,
  );

  const relationship: any = useSelector<RootState>(
    (state: RootState) => state.user.relationship,
  );

  const listRelation = relationship.filter(
    (item: any) => item.languageId === props.currentLanguage,
  );
  const {type, text} = message;

  if (type || text) {
    ToastComponent(type, text);
    dispatch(resetMessage());
  }

  const submit = (values: PayloadUser, {resetForm}: any) => {
    const dataUpdate = {
      id: values.id,
      email: values.email,
      name: values.name,
      relationship: values.relationship,
      phone: values.phone,
      avatar: values.avatar,
    };

    dispatch(updateUser(dataUpdate));
    resetForm({});
    setDisable(true);
    setTextButton(strings('userProfile_btnRequest'));
  };

  const onChangeAvatar = () => {
    Alert.alert(
      strings('userProfile_imagePickerTitle'),
      undefined,
      [
        {
          text: strings('userProfile_imagePickerOptionTake'),
          onPress: openCamera,
          style: 'destructive',
        },
        {
          text: strings('userProfile_imagePickerOptionChoose'),
          onPress: openGallery,
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  const uploadFile = (file: any) => {
    const data = new FormData();
    const source = {uri: file.path};
    if (file.size > 100000) {
      ToastComponent('ERROR', strings('userProfile_msgImagePickerFail'));
      return;
    }
    setPathImg(source);

    const pathParts = file.path.split('/');

    data.append('file', {
      uri: file.path,
      type: file.mime,
      name: pathParts[pathParts.length - 1],
    });

    dispatch(uploadAvatar(data));
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        uploadFile(image);
      })
      .catch(e => {});
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then((image: any) => {
        uploadFile(image);
      })
      .catch(e => {});
  };

  const handleUpdate = () => {
    setDisable(false);
    setTextButton(strings('userProfile_btnSubmit'));
  };

  const getAvatar = async () => {
    try {
      if (user && user.avatar) {
        const base = await BaseService.instance.user.getAvatar(user.avatar);
        setBase(base);
      }
    } catch (e) {}
  };

  useEffect(() => {
    decodeToken().then(user => {
      dispatch(getProfileUser({id: user.id}));
    });
    getAvatar();
  }, [user.avatar]);

  useEffect(() => {
    dispatch(getRelationship());
  }, []);

  async function onClickLogout() {
    const fcmToken = await AsyncStorage.getItem('vas_fcmToken');
    const currentUser = await getCurrentUser();
    if (!JSON.parse(currentUser as any).id) return;
    const data = await database()
      .ref(`/users/${JSON.parse(currentUser as any).id}`)
      .once('value');
    const arrFcmToken = data?.val()?.pushToken || [];
    if (Array.isArray(arrFcmToken)) {
      const indexToken = arrFcmToken.indexOf(fcmToken);
      if (arrFcmToken.indexOf(fcmToken) !== -1) {
        arrFcmToken.splice(indexToken, 1);
      }
    }
    const arrToObject = Object.assign({}, arrFcmToken);
    database()
      .ref(`users/${JSON.parse(currentUser as any).id}`)
      .update({
        chattingWith: '',
        isOnline: 0,
        pushToken: arrToObject,
      });
    dispatch(logoutWithSaga());
  }

  function onPressChangePassword() {
    setTimeout(() => {
      NavigationActionsService.push(CHANGEPASS_SCREEN);
    }, 400);
  }

  return (
    <ViewVertical
      style={{
        backgroundColor: colors.background,
        width: '100%',
        flex: 1,
      }}>
      <Header
        noShadow={true}
        stylesHeaderText={{
          color: colors.redBold,
          fontSize: fontSizes.small,
          fontWeight: 'bold',
          ...fontFamilies.medium,
        }}
        mainText={'Parent Information'}
        stylesHeader={styles.header}
        leftComponent={
          <Image
            resizeMode="cover"
            style={styles.drawerIcon}
            source={BACK_ARROW}
          />
        }
        leftAction={() => NavigationActionsService.pop()}
      />
      <ViewVertical style={styles.container}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          scrollEnabled={true}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          // contentContainerStyle={styles.contentContainer}
          extraHeight={130}
          showsVerticalScrollIndicator={false}>
          <ViewVertical style={styles.avatarContainer}>
            <TouchableOpacity onPress={onChangeAvatar}>
              <Avatar
                source={
                  !Object.keys(pathImg).length
                    ? base && user && user.avatar
                      ? {uri: `data:image/*;base64,${base}`}
                      : PROFILE_DEFAULT
                    : pathImg
                }
                size={83}
                rounded
              />
              <Image
                source={require('assets/images/camera.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </ViewVertical>

          <Text style={styles.textStyle}>
            {strings('userProfile_headerTitle')}
          </Text>

          <Formik
            initialValues={user}
            validationSchema={ProfileSchema}
            onSubmit={submit}
            enableReinitialize={true}>
            {({
              handleSubmit,
              values,
              errors,
              isValid,
              setValues,
              handleBlur,
              touched,
              dirty,
            }) => (
              <ViewVertical style={styles.form}>
                <Input
                  label={strings('userProfile_labelName')}
                  value={values.name}
                  onChangeText={(field: string) =>
                    setValues({...values, name: field})
                  }
                  labelStyle={styles.labelStyle}
                  errorMessage={errors.name}
                  placeholder={strings('userProfile_labelName')}
                  // onBlur={handleBlur('name')}
                  errorStyle={styles.errorStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  autoCorrect={false}
                  disabled={disable}
                />

                <ViewVertical style={styles.pickerContainer}>
                  <Text style={styles.labelStyle}>
                    {strings('userProfile_labelRelationship')}
                  </Text>

                  <ViewVertical style={disable ? styles.pickerDisable : null}>
                    <RNPickerSelect
                      onValueChange={(field: string) =>
                        setValues({...values, relationship: field})
                      }
                      items={listRelation}
                      placeholder={{label: '', value: null}}
                      style={{
                        inputIOS: {
                          ...styles.inputIOS,
                          color: disable ? '#8ea0a8' : '#000000',
                        },
                        inputAndroid: {
                          ...styles.inputAndroid,
                          color: disable ? '#8ea0a8' : '#000000',
                        },
                      }}
                      value={values.relationship}
                      useNativeAndroidPickerStyle={false}
                      disabled={disable}
                    />
                  </ViewVertical>
                  <Text style={styles.errorSelectStyle}>
                    {!disable && !isValid && errors.relationship}
                  </Text>
                </ViewVertical>

                <Input
                  label={strings('userProfile_labelEmail')}
                  value={values.email}
                  onChangeText={(field: string) =>
                    setValues({...values, email: field})
                  }
                  keyboardType="email-address"
                  labelStyle={styles.labelStyle}
                  errorMessage={errors.email}
                  placeholder={strings('userProfile_labelEmail')}
                  // onBlur={handleBlur('email')}
                  errorStyle={styles.errorStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  autoCorrect={false}
                  disabled={disable}
                />

                <Input
                  label={strings('userProfile_labelContact')}
                  value={values.phone}
                  onChangeText={(field: string) =>
                    setValues({...values, phone: field})
                  }
                  keyboardType="numeric"
                  labelStyle={styles.labelStyle}
                  errorMessage={errors.phone}
                  placeholder={strings('userProfile_labelContact')}
                  // onBlur={handleBlur('phone')}
                  errorStyle={styles.errorStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  autoCorrect={false}
                  disabled={disable}
                />

                <Button
                  disabled={(!disable && !dirty) || !isValid}
                  onPress={() => {
                    if (disable) {
                      handleUpdate();
                      return;
                    }
                    isValid && handleSubmit();
                  }}
                  title={textButton}
                />
              </ViewVertical>
            )}
          </Formik>
          <ViewVertical style={{height: 10}} />
          <Text onPress={onPressChangePassword} style={styles.link}>
            {strings('listMenu_changePassword')}
          </Text>
          <Text onPress={onClickLogout} style={styles.link}>
            {strings('listMenu_logOut')}
          </Text>
        </KeyboardAwareScrollView>
      </ViewVertical>
    </ViewVertical>
  );
};

export default withLanguageChange(UserProfile);
