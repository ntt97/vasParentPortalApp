import React, {useEffect, useState, useLayoutEffect} from 'react';
import {StatusBar, Keyboard, Image, Platform, View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Button as ButtonLib} from 'react-native-elements';
import Input from 'components/input.component';
import Button from 'components/button.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BackgroundComponents} from 'components/background.component';
import colors from 'constants/colors';
import styles from './styles';
import {ViewVertical, ViewHorizontal} from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {loginWithSaga, registerWithSaga} from 'actions/auth.action';
import Text from '@components/text.component';
import {FORGOT_PASSWORD_SCREEN} from '@constants/index';
import {LOGO} from 'assets';
import OverlayLanguage from '@components/overlay-language/overlay-language-component';
import {RootState} from '@reducers/index';
import {selectMenuIndex} from '@actions/navigation.action';
import I18n, {strings} from '@utils/i18n';

import BaseService from '../../services';
import SelectLanguage from '@components/select-language/select-language.component';
import {getDefaultLanguage, setDefaultLanguage} from '@utils/helper';
import {handleChangeLanguage} from '@actions/language.action';
import withLanguageChange from '@components/hoc-language/hoc-language';
import DeviceInfo from 'react-native-device-info';
import dayjs from 'dayjs';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isIOS} from '@constants/platform';

export interface SubmitFormLogin {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [errorCheckEmail, setErrorCheckEmail] = useState('');
  const [hideMessage, setHideMessage] = useState(true);

  const [errorsEmail, setEroorEmail] = useState('');

  /*
   * allowLogin :
   * 0: default case
   * 1: login case
   * 2: register case
   */

  const [allowLogin, setAllowLogin] = useState(0);
  const [firebaseToken, setFirebaseToken] = useState('');
  const isLoginError = useSelector<RootState>(
    (state: RootState) => state.auth.login.isError,
  );

  useLayoutEffect(() => {
    if (isIOS) {
      StatusBar.setBarStyle('light-content');
    }
  }, []);
  useEffect(() => {
    NavigationActionsService.initInstance(navigation);
    dispatch(selectMenuIndex({selectedMenuIndex: 0}));
    checkPermission();
  }, []);

  async function checkPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  }

  async function getFcmToken() {
    let fcmTokenLocal = await AsyncStorage.getItem('vas_fcmToken');

    if (fcmTokenLocal) {
      setFirebaseToken(fcmTokenLocal);
    } else {
      const fcmToken = await messaging().getToken();
      // user has a device token

      if (fcmToken) {
        await AsyncStorage.setItem('vas_fcmToken', fcmToken);
        setFirebaseToken(fcmToken);
      }
    }
  }
  async function requestPermission() {
    try {
      await messaging().requestPermission();
      getFcmToken();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  }

  if (isLoginError || (errorCheckEmail && hideMessage)) {
    setTimeout(() => {
      setHideMessage(false);
    }, 5000);
  }

  async function checkEmailRegister(email: string) {
    NavigationActionsService.showLoading();
    try {
      const response = await BaseService.instance.auth.checkEmailRegister(
        email,
      );
      // NavigationActionsService.hideLoading();
      if (response.data.success) {
        // go to register
        setAllowLogin(1);
        dispatch(registerWithSaga({email, moveScreen: true}));
      } else {
        // login case
        setAllowLogin(2);
        NavigationActionsService.hideLoading();
      }
    } catch (err) {
      setAllowLogin(0);
      const message = err && err.message ? err.message : 'Email not found';
      setErrorCheckEmail(message);
      NavigationActionsService.hideLoading();
    }
  }

  const submit = async (values: SubmitFormLogin) => {
    const {email, password} = values;
    setHideMessage(true);
    setErrorCheckEmail('');
    if (allowLogin === 0) {
      checkEmailRegister(email);
    } else {
      Keyboard.dismiss();
      const defaultKeyLanguage = await getDefaultLanguage();
      dispatch(
        loginWithSaga({
          email,
          password,
          deviceId: firebaseToken || DeviceInfo.getUniqueId(),
          currentLanguage: defaultKeyLanguage || 'en',
        }),
      );
    }
  };

  function onChangeLanguage(value: string) {
    I18n.defaultLocale = value;
    I18n.locale = value;
    dayjs.locale(value);
    setDefaultLanguage(value);
    dispatch(handleChangeLanguage(value));
  }

  return (
    <BackgroundComponents>
      <OverlayLanguage />
      <ViewVertical style={styles.container}>
        <Header noShadow={true} isShowRight={false} />
        <KeyboardAwareScrollView
          style={styles.scrollView}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainer}>
          <ViewVertical
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={styles.container}>
            <Image resizeMode="contain" source={LOGO} style={styles.logo} />
          </ViewVertical>
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={submit}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email('login_emailFormat')
                .required('login_emailRequired'),
              password:
                allowLogin === 2
                  ? yup.string().required(strings('login_passwordRequired'))
                  : yup.string(),
            })}>
            {({handleSubmit, values, errors, isValid, setValues}) => (
              <ViewVertical style={styles.form}>
                <ViewVertical style={styles.containerLogin}>
                  <ViewHorizontal style={styles.viewTitle}>
                    <Text style={styles.loginTitle}>
                      {strings('login_title')}
                    </Text>
                  </ViewHorizontal>
                  <Input
                    label={strings('login_labelEmail')}
                    value={values.email}
                    autoCapitalize="none"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(field: string) =>
                      setValues({...values, email: field})
                    }
                    errorMessage={
                      errors.email ? strings(`${errors.email}`) : ''
                    }
                    placeholder={strings('login_emailPlaceholder')}
                    autoCorrect={false}
                    errorStyle={styles.errorStyle}
                    placeholderTextColor={colors.placeholderTextColor}
                    maxLength={100}
                    onChange={() => setAllowLogin(0)}
                  />
                  {allowLogin === 2 && (
                    <Input
                      label={strings('login_labelPassword')}
                      value={values.password}
                      autoCapitalize="none"
                      underlineColorAndroid={'transparent'}
                      onChangeText={(field: string) =>
                        setValues({...values, password: field})
                      }
                      errorMessage={errors.password}
                      placeholder={strings('login_passwordPlaceholder')}
                      autoCorrect={false}
                      errorStyle={styles.errorStyle}
                      placeholderTextColor={colors.placeholderTextColor}
                      containerStyle={{marginTop: 15}}
                      secureTextEntry={true}
                    />
                  )}
                  {isLoginError && hideMessage && (
                    <ViewVertical style={styles.errorLoginContainer}>
                      <Text style={styles.errorStyle}>
                        {strings('login_loginError')}
                      </Text>
                    </ViewVertical>
                  )}
                  {!!errorCheckEmail && hideMessage && (
                    <ViewVertical style={styles.errorLoginContainer}>
                      <Text style={styles.errorStyle}>
                        {strings('login_emailError')}
                      </Text>
                    </ViewVertical>
                  )}
                  <Button
                    onPress={() => {
                      isValid && handleSubmit();
                    }}
                    title={strings('login_btnLogin')}
                  />
                  <ViewHorizontal style={styles.viewTitle}>
                    <ButtonLib
                      titleStyle={styles.forgotText}
                      buttonStyle={styles.buttonFooterStyle}
                      containerStyle={styles.btnFooterContainer}
                      title={strings('login_forgotPassword')}
                      onPress={() =>
                        NavigationActionsService.push(FORGOT_PASSWORD_SCREEN, {
                          inCase: 'forgot_password',
                        })
                      }
                    />
                  </ViewHorizontal>
                </ViewVertical>
              </ViewVertical>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </ViewVertical>
      <ViewVertical style={styles.containerLanguage}>
        <SelectLanguage
          style={styles.sideLanguage}
          pickerStyle={{
            inputIOS: styles.pickerStyleInputIOS,
            inputAndroid: styles.pickerStyleInputAndroid,
          }}
          whiteArrow={true}
          emitChangeLanguage={onChangeLanguage}
        />
      </ViewVertical>
    </BackgroundComponents>
  );
};

export default withLanguageChange(LoginScreen);
