/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Keyboard, Image, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Input from 'components/input.component';
import Button from 'components/button.component';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BackgroundComponents } from 'components/background.component';
import colors from 'constants/colors';
import { fontSizes, fontFamilies } from 'constants/fonts';
import styles from './styles';
import { ViewVertical, ViewHorizontal } from 'components/viewBox.component';
import Header from 'components/header/header.component';
import NavigationActionsService from 'utils/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassWithSaga, enterPasswordForgotWithSaga, resetMessageForgot } from 'actions/auth.action';
import { BACK_ARROW_WHITE } from '@assets/index';

import Text from '@components/text.component';
import { RootState } from '@reducers/index';
import { strings } from '@utils/i18n';

interface ForgotPasswordProps {
  componentId: any;
}
export interface SubmitFormRegister {
  email: string;
}

const ForgotPassword = (props: ForgotPasswordProps) => {
  const [hideMessage, setHideMessage] = useState(true);

  const dispatch = useDispatch();
  const forgotPasswordError: any = useSelector<RootState>((state: RootState) => state.auth.forgotPassword);

  useEffect(() => {}, []);

  const submit = (values: SubmitFormRegister) => {
    setHideMessage(true);
    Keyboard.dismiss();
    const { email } = values;
    dispatch(forgotPassWithSaga({ email, moveScreen: true }));
  };

  if (forgotPasswordError.isError && hideMessage) {
    setTimeout(() => {
      dispatch(resetMessageForgot());
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
          mainText={strings('forgot_headerTitle')}
          stylesHeader={{
            alignItems: 'center',
          }}
          leftComponent={<Image resizeMode="cover" style={styles.backarrow} source={BACK_ARROW_WHITE} />}
          leftAction={() => NavigationActionsService.pop()}
        />
        <KeyboardAwareScrollView
          style={styles.scrollView}
          scrollEnabled={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.contentContainer}
        >
          <ViewVertical
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={styles.container}
          />
          <Formik
            initialValues={{ email: '' }}
            onSubmit={submit}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email(strings('forgot_emailFormat'))
                .required(strings('forgot_emailRequired')),
            })}
          >
            {({ handleSubmit, values, errors, isValid, setValues }) => (
              <ViewVertical style={styles.form}>
                <ViewVertical style={styles.containerLogin}>
                  <ViewHorizontal style={styles.viewTitle}>
                    <Text style={styles.loginTitle}>{strings('forgot_contentTitle')}</Text>
                  </ViewHorizontal>
                  <Input
                    value={values.email}
                    autoCapitalize="none"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(field: string) => setValues({ ...values, email: field })}
                    errorMessage={errors.email}
                    errorStyle={styles.errorStyle}
                    placeholder={strings('forgot_emailPlaceholder')}
                    autoCorrect={false}
                    placeholderTextColor={colors.placeholderTextColor}
                  />
                  <ViewHorizontal style={styles.viewDes}>
                    <Text style={styles.desForgot}>{strings('forgot_description')}</Text>
                  </ViewHorizontal>

                  {forgotPasswordError.isError && hideMessage && (
                    <ViewVertical style={styles.errorLoginContainer}>
                      <Text style={styles.errorStyle}>* {strings('login_emailError')}</Text>
                    </ViewVertical>
                  )}

                  <Button
                    onPress={() => {
                      isValid && handleSubmit();
                    }}
                    title={strings('forgot_btnSubmit')}
                  />
                </ViewVertical>
              </ViewVertical>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </ViewVertical>
    </BackgroundComponents>
  );
};

export default ForgotPassword;
