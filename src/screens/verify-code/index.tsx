/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import {StatusBar, Keyboard, View, BackHandler, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BackgroundComponents} from 'components/background.component';
import colors from 'constants/colors';
import {fontSizes, fontFamilies} from 'constants/fonts';
import styles from './styles';
import {ViewVertical, ViewHorizontal} from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import {useDispatch, useSelector} from 'react-redux';
import {
  verifyCodeRegisterWithSaga,
  verifyCodeForgotWithSaga,
  registerWithSaga,
  forgotPassWithSaga,
} from 'actions/auth.action';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {BACK_ARROW_WHITE} from 'assets';

import Text from '@components/text.component';
import {RootState} from '@reducers/index';
import {strings} from '@utils/i18n';

const VerifyCode = ({navigation, route}: any) => {
  const props = route.params;

  const verifyCase = props.inCase;
  const [code, setCode] = useState('');
  const [required, setRequired] = useState('');
  const registerError: any = useSelector<RootState>(
    (state: RootState) => state.auth.register,
  );
  const forgotPasswordError: any = useSelector<RootState>(
    (state: RootState) => state.auth.forgotPassword,
  );
  const [hideMessage, setHideMessage] = useState(true);
  const dispatch = useDispatch();

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

  function resendVerifyCode() {
    if (props.inCase === 'register') {
      dispatch(registerWithSaga({email: props.email, moveScreen: false}));
    }
    if (props.inCase === 'forgot_password') {
      dispatch(forgotPassWithSaga({email: props.email, moveScreen: false}));
    }
  }

  const submit = () => {
    if (code.length !== 6) {
      setRequired(strings('verifyCode_requiredCode'));
      return;
    }
    if (code.length === 6) {
      setRequired('');
      setHideMessage(true);
      Keyboard.dismiss();
      if (verifyCase === 'register') {
        dispatch(
          verifyCodeRegisterWithSaga({
            inCase: verifyCase,
            code,
            email: props.email,
          }),
        );
      } else {
        dispatch(
          verifyCodeForgotWithSaga({
            inCase: verifyCase,
            code,
            email: props.email,
          }),
        );
      }
      setCode('');
    }
  };

  if (registerError.isError || forgotPasswordError.isError) {
    setTimeout(() => {
      setHideMessage(false);
    }, 5000);
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
            verifyCase === 'register'
              ? strings('verifyCode_headerTitle_register')
              : strings('verifyCode_headerTitle_forgetPassword')
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

          <ViewVertical style={styles.form}>
            <ViewVertical style={styles.containerLogin}>
              <ViewHorizontal style={styles.viewTitle}>
                <Text style={styles.loginTitle}>
                  {strings('verifyCode_contentTitle')}
                </Text>
              </ViewHorizontal>

              <View style={styles.containerOTP}>
                <OTPInputView
                  style={{
                    width: '80%',
                    height: 60,
                  }}
                  keyboardType="number-pad"
                  pinCount={6}
                  autoFocusOnLoad
                  onCodeChanged={code => setCode(code)}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  code={code}
                />
              </View>
              <ViewHorizontal style={styles.viewDes}>
                <Text style={styles.desForgot}>
                  {strings('verifyCode_description')}
                </Text>
              </ViewHorizontal>

              {props.inCase === 'register' &&
                registerError.isError &&
                hideMessage && (
                  <ViewVertical style={styles.errorLoginContainer}>
                    <Text style={styles.errorStyle}>
                      * {strings('forgot_codeError')}
                    </Text>
                  </ViewVertical>
                )}
              {props.inCase === 'forgot_password' &&
                forgotPasswordError.isError &&
                hideMessage && (
                  <ViewVertical style={styles.errorLoginContainer}>
                    <Text style={styles.errorStyle}>
                      * {strings('forgot_codeError')}
                    </Text>
                  </ViewVertical>
                )}
              {required.length > 0 && (
                <ViewVertical style={styles.errorLoginContainer}>
                  <Text style={styles.errorStyle}>* {required}</Text>
                </ViewVertical>
              )}
              <Button
                onPress={submit}
                titleStyle={{
                  fontSize: fontSizes.smaller,
                  color: colors.white,
                  ...fontFamilies.bold,
                }}
                buttonStyle={styles.btnSubmitStyle}
                containerStyle={styles.buttonContainer}
                title={strings('verifyCode_btnSubmit')}
              />

              <ViewHorizontal style={styles.viewDes}>
                <Text style={styles.desForgot}>
                  {strings('verifyCode_didNotRecieveCode')}{' '}
                </Text>
                <Button
                  type="clear"
                  buttonStyle={{padding: 0, margin: 0, borderWidth: 0}}
                  onPress={resendVerifyCode}
                  titleStyle={styles.underlineResend}
                  title={strings('verifyCode_resend')}
                />
              </ViewHorizontal>
            </ViewVertical>
          </ViewVertical>
        </KeyboardAwareScrollView>
      </ViewVertical>
    </BackgroundComponents>
  );
};

export default VerifyCode;
