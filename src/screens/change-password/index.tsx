import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';

import Header from 'components/header/header.component';
import {ViewVertical} from 'components/viewBox.component';
import Input from 'components/input.component';
import Button from 'components/button.component';
import ToastComponent from 'components/toast.component';

import styles from './styles';
import colors from 'constants/colors';
import {BACK_ARROW} from 'assets';
import {fontSizes, fontFamilies} from 'constants/fonts';
import NavigationActionsService from '@utils/navigation';
import {
  changePassword,
  PayloadPassword,
  resetMessageChangePass,
} from 'actions/user.action';
import {RootState} from 'reducers/';
import {decodeToken} from 'utils/helper';
import {strings} from 'utils/i18n';
import {HOME_SCREEN} from 'constants/index';
import {selectMenuIndex} from '@actions/navigation.action';

const PasswordSchema = () => {
  return yup.object().shape({
    oldPassword: yup
      .string()
      .strict(true)
      .trim(strings('changePassword_passwordHasSpaces'))
      .required(strings('changePassword_inputRequired'))
      .min(8, strings('changePassword_passwordMinLength')),
    password: yup
      .string()
      .strict(true)
      .trim(strings('changePassword_passwordHasSpaces'))
      .required(strings('changePassword_inputRequired'))
      .min(8, strings('changePassword_passwordMinLength')),
    confirmPassword: yup
      .string()
      .strict(true)
      .trim(strings('changePassword_passwordHasSpaces'))
      .required(strings('changePassword_inputRequired'))
      .oneOf([yup.ref('password')], strings('changePassword_passwordNotMatch')),
  });
};
const initialValues: PayloadPassword = {
  id: '',
  oldPassword: '',
  password: '',
  confirmPassword: '',
};

const ChangePassScreen = ({route}: any) => {
  const props = route.params;
  const dispatch = useDispatch();

  const submit = async (values: PayloadPassword) => {
    const user = await decodeToken();
    values['id'] = user.id;

    dispatch(changePassword(values));
  };

  const message: any = useSelector<RootState>(
    (state: RootState) => state.user.changePassword,
  );
  const {type, text} = message;
  if (type || text) {
    ToastComponent(type, text);
    if (type == 'SUCCESS') {
      setTimeout(() => {
        NavigationActionsService.pop();
        dispatch(selectMenuIndex({selectedMenuIndex: 0}));
      }, 1000);
    }
    dispatch(resetMessageChangePass());
  }

  useEffect(() => {});

  return (
    <ViewVertical style={{backgroundColor: colors.background}}>
      <ViewVertical style={styles.container}>
        <Header
          noShadow={true}
          stylesHeaderText={{
            color: colors.redBold,
            fontSize: fontSizes.small,
            ...fontFamilies.medium,
            fontWeight: 'bold',
          }}
          mainText={strings('changePassword_headerTitle')}
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
        <Formik
          initialValues={initialValues}
          validationSchema={PasswordSchema}
          onSubmit={submit}>
          {({
            handleSubmit,
            values,
            errors,
            isValid,
            setValues,
            handleBlur,
            touched,
          }) => (
            <ViewVertical style={styles.form}>
              <Input
                label={strings('changePassword_labelOldPass')}
                value={values.oldPassword}
                onChangeText={(field: string) =>
                  setValues({...values, oldPassword: field})
                }
                labelStyle={styles.labelStyle}
                errorMessage={touched.oldPassword && errors.oldPassword}
                placeholder={strings('changePassword_labelOldPass')}
                autoCorrect={false}
                inputContainerStyle={styles.inputContainerStyle}
                onBlur={handleBlur('oldPassword')}
                errorStyle={styles.errorStyle}
                secureTextEntry={true}
              />
              <Input
                label={strings('changePassword_labelNewPass')}
                value={values.password}
                onChangeText={(field: string) =>
                  setValues({...values, password: field})
                }
                labelStyle={styles.labelStyle}
                errorMessage={touched.password && errors.password}
                placeholder={strings('changePassword_labelNewPass')}
                autoCorrect={false}
                inputContainerStyle={styles.inputContainerStyle}
                onBlur={handleBlur('password')}
                errorStyle={styles.errorStyle}
                secureTextEntry={true}
              />
              <Input
                label={strings('changePassword_labelConfirmPass')}
                value={values.confirmPassword}
                onChangeText={(field: string) =>
                  setValues({...values, confirmPassword: field})
                }
                labelStyle={styles.labelStyle}
                errorMessage={touched.confirmPassword && errors.confirmPassword}
                placeholder={strings('changePassword_labelConfirmPass')}
                autoCorrect={false}
                inputContainerStyle={styles.inputContainerStyle}
                onBlur={handleBlur('confirmPassword')}
                errorStyle={styles.errorStyle}
                secureTextEntry={true}
              />
              <Button
                onPress={() => {
                  isValid && handleSubmit();
                }}
                title={strings('changePassword_btnSubmit')}
              />
            </ViewVertical>
          )}
        </Formik>
      </ViewVertical>
    </ViewVertical>
  );
};

export default ChangePassScreen;
