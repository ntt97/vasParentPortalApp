/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Input from '@components/input.component';
import Button from '@components/button.component';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BackgroundComponents} from '@components/background.component';
import colors from '@constants/colors';
import {fontSizes, fontFamilies} from '@constants/fonts';
import styles from './styles';
import {ViewVertical, ViewHorizontal} from '@components/viewBox.component';
import Header from '@components/header/header.component';
// import NavigationActionsService from '@utils/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  enterPasswordRegisterWithSaga,
  enterPasswordForgotWithSaga,
} from 'actions/auth.action';
// import { BACK_ARROW_WHITE } from 'assets';
import Text from '@components/text.component';
import {RootState} from '@reducers/index';
import {strings} from '@utils/i18n';
import {CheckBox, Overlay} from 'react-native-elements';
import HTML from 'react-native-render-html';
import withLanguageChange from '@components/hoc-language/hoc-language';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EnterPasswordProps {
  componentId: any;
  inCase: 'register' | 'forgot_password';
  email: string;
  registrationToken: string;
  currentLanguage: string;
}
export interface SubmitFormEnterPassword {
  password: string;
  rePassword: string;
  termConditions: boolean;
}

const EnterPassword = ({route}: any) => {
  const props = route.params;

  const dispatch = useDispatch();
  const registerError: any = useSelector<RootState>(
    (state: RootState) => state.auth.register,
  );
  const forgotPasswordError: any = useSelector<RootState>(
    (state: RootState) => state.auth.forgotPassword,
  );
  const [term, setTerm] = useState(false);
  // disable user click Back Button on Android
  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const submit = (values: SubmitFormEnterPassword) => {
    const {password, rePassword} = values;
    const {email, registrationToken, currentLanguage} = props;
    Keyboard.dismiss();
    if (props.inCase === 'register') {
      dispatch(
        enterPasswordRegisterWithSaga({
          email,
          registrationToken,
          password,
          rePassword,
          currentLanguage,
        }),
      );
    } else {
      dispatch(
        enterPasswordForgotWithSaga({
          email,
          registrationToken,
          password,
          rePassword,
        }),
      );
    }
  };

  const toggleTerm = () => {
    setTerm(!term);
  };

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
      // setFirebaseToken(fcmTokenLocal);
    } else {
      const fcmToken = await messaging().getToken();
      // user has a device token

      if (fcmToken) {
        await AsyncStorage.setItem('vas_fcmToken', fcmToken);
        // setFirebaseToken(fcmToken);
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

  return (
    <BackgroundComponents>
      <ViewVertical style={styles.container}>
        <Header
          isShowRight={false}
          noShadow={true}
          stylesHeaderText={{
            color: colors.white,
            fontSize: fontSizes.small,
            ...fontFamilies.medium,
            height: 'auto',
          }}
          mainText={
            props.inCase === 'register'
              ? strings('enterPassword_headerTitle_register')
              : strings('enterPassword_headerTitle_forgot')
          }
          stylesHeader={{
            alignItems: 'center',
          }}
          // leftComponent={<Image resizeMode="cover" style={styles.backarrow} source={BACK_ARROW_WHITE} />}
          // leftAction={() => NavigationActionsService.pop()}
        />
        <KeyboardAwareScrollView
          style={styles.scrollView}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainer}>
          <ViewVertical
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={styles.container}
          />
          <Formik
            initialValues={{
              password: '',
              rePassword: '',
              termConditions: false,
            }}
            onSubmit={submit}
            validationSchema={yup.object().shape({
              password: yup
                .string()
                .min(8, strings('enterPassword_passwordMinLength'))
                .required(strings('enterPassword_passwordRequired')),
              rePassword: yup
                .string()
                .required(strings('enterPassword_rePasswordRequired'))
                .oneOf(
                  [yup.ref('password'), null],
                  strings('enterPassword_rePasswordNotMatch'),
                ),
              termConditions: yup
                .bool()
                .oneOf(
                  [props.inCase === 'register' ? true : false],
                  strings('enterPassword_termsConditionsRequired'),
                ),
            })}>
            {({handleSubmit, values, errors, isValid, setValues}) => (
              <ViewVertical style={styles.form}>
                <ViewVertical style={styles.containerLogin}>
                  <ViewHorizontal style={styles.viewTitle}>
                    <Text style={styles.loginTitle}>
                      {strings('enterPassword_contentTitle')}
                    </Text>
                  </ViewHorizontal>
                  <Input
                    label={strings('enterPassword_labelPassword')}
                    labelStyle={styles.labelStyle}
                    value={values.password}
                    autoCapitalize="none"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(field: string) =>
                      setValues({...values, password: field})
                    }
                    errorMessage={errors.password}
                    errorStyle={styles.errorStyle}
                    autoCorrect={false}
                    placeholderTextColor={colors.placeholderTextColor}
                    containerStyle={{marginTop: 15}}
                    secureTextEntry={true}
                  />
                  <Input
                    label={strings('enterPassword_labelRePassword')}
                    labelStyle={styles.labelStyle}
                    value={values.rePassword}
                    autoCapitalize="none"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(field: string) =>
                      setValues({...values, rePassword: field})
                    }
                    errorMessage={errors.rePassword}
                    errorStyle={styles.errorStyle}
                    autoCorrect={false}
                    placeholderTextColor={colors.placeholderTextColor}
                    containerStyle={{marginTop: 15}}
                    secureTextEntry={true}
                  />
                  {props.inCase === 'register' && (
                    <React.Fragment>
                      <ViewHorizontal style={styles.wraperChbox}>
                        <CheckBox
                          containerStyle={styles.checkboxContainer}
                          textStyle={{color: '#FFFFFF'}}
                          checkedColor={'#FFFFFF'}
                          checked={values.termConditions}
                          onPress={() =>
                            setValues({
                              ...values,
                              termConditions: !values.termConditions,
                            })
                          }
                        />
                        <TouchableOpacity onPress={toggleTerm}>
                          <Text style={styles.txtTerm}>
                            {strings('enterPassword_termsConditions')}
                          </Text>
                        </TouchableOpacity>
                      </ViewHorizontal>
                      {errors.termConditions && (
                        <ViewVertical style={styles.errorChboxContainer}>
                          <Text style={styles.txtErrorChbox}>
                            {errors.termConditions}
                          </Text>
                        </ViewVertical>
                      )}
                    </React.Fragment>
                  )}
                  {props.inCase === 'register' && registerError.isError && (
                    <ViewVertical style={styles.errorLoginContainer}>
                      <Text style={styles.errorStyle}>
                        * {registerError.message}
                      </Text>
                    </ViewVertical>
                  )}

                  {props.inCase === 'forgot_password' &&
                    forgotPasswordError.isError && (
                      <ViewVertical style={styles.errorLoginContainer}>
                        <Text style={styles.errorStyle}>
                          * {forgotPasswordError.message}
                        </Text>
                      </ViewVertical>
                    )}

                  <Button
                    onPress={() => {
                      isValid && handleSubmit();
                    }}
                    title={
                      props.inCase === 'register'
                        ? strings('enterPassword_btnSubmit_register')
                        : strings('enterPassword_btnSubmit_forgot')
                    }
                  />
                </ViewVertical>
              </ViewVertical>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </ViewVertical>
      <Overlay
        isVisible={term}
        onBackdropPress={toggleTerm}
        overlayStyle={styles.overlayStyle}>
        <ScrollView>
          <HTML html={strings('TERM_AND_CONDITIONS')} />
        </ScrollView>
      </Overlay>
    </BackgroundComponents>
  );
};

export default withLanguageChange(EnterPassword);
