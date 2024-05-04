import {put, takeLatest, call} from 'redux-saga/effects';
import {
  LOGOUT_WITH_SAGA,
  LOGIN_WITH_SAGA,
  HOME_SCREEN,
  LOGIN_SCREEN,
  REGISTER_WITH_SAGA,
  VERIFY_CODE_SCREEN,
  VERIFY_CODE_REGISTER_WITH_SAGA,
  ENTER_PASSWORD_SCREEN,
  FORGOT_PASSWORD_WITH_SAGA,
  ENTER_PASSWORD_REGISTER_WITH_SAGA,
  VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA,
  ENTER_PASSWORD_FORGOT_WITH_SAGA,
} from '@constants/index';
import {PayloadAction} from 'types/types';
import {
  PayloadLogin,
  loginWithSagaFailed,
  PayloadRegister,
  registerWithSagaFailed,
  PayloadVerifyRegister,
  enterPasswordRegisterWithSagaFailed,
  // registerWithSagaSuccess,
  // verifyWithSagaSuccess,
  // forgotPassWithSagaSuccess,
  forgotPassWithSagaFailed,
  PayloadEnterPasswordRegister,
  verifyCodeRegisterWithSagaFailed,
  PayloadVerifyForgotPassword,
  PayloadEnterPasswordForgot,
  enterPasswordForgotWithSagaFailed,
  verifyCodeForgotWithSagaFailed,
} from 'actions/auth.action';
import {navigationRootAction} from 'actions/navigation.action';
import NavigationActionsService from '@utils/navigation';
import BaseService from '../services';
import {setToken, getErrorMessage, setRefreshToken} from '@utils/helper';
import {BASE_URL} from '@constants/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* logout() {
  yield call(setToken, '');
  yield put(navigationRootAction({name: LOGIN_SCREEN}));
}

function* login(action: PayloadAction<string, PayloadLogin>) {
  const {email, password, deviceId, currentLanguage} = action.payload;
  NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.auth.login, {
      email,
      password,
      deviceId,
    });
    if (response && response.accessToken) {
      // console.log('response', response)
      yield call(BaseService.instance.language.changeLang, {
        languageId: currentLanguage || 'en',
        email,
      });
      yield call(setToken, response.accessToken);
      yield call(setRefreshToken, response.refreshToken);
      yield put(navigationRootAction({name: HOME_SCREEN}));
    } else {
      yield put(loginWithSagaFailed());
    }
  } catch (err) {
    yield put(loginWithSagaFailed());
  }
  NavigationActionsService.hideLoading();
}

function* register(action: PayloadAction<string, PayloadRegister>) {
  const {email, moveScreen} = action.payload;
  // NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.auth.register, {
      email,
    });

    if (response && response.success) {
      if (moveScreen) {
        NavigationActionsService.push(VERIFY_CODE_SCREEN, {
          inCase: 'register',
          email,
        });
      }
    } else {
      yield put(registerWithSagaFailed({message: getErrorMessage()}));
    }
  } catch (err) {
    yield put(registerWithSagaFailed({message: getErrorMessage(err)}));
  }
  NavigationActionsService.hideLoading();
}

function* verifyCodeRegister(
  action: PayloadAction<string, PayloadVerifyRegister>,
) {
  const {code, email, inCase} = action.payload;
  NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.auth.verifyCodeRegister, {
      code,
      email,
      inCase,
    });

    if (response && response.registrationToken) {
      NavigationActionsService.push(ENTER_PASSWORD_SCREEN, {
        code,
        email,
        registrationToken: response.registrationToken,
        inCase,
      });
    }
  } catch (err) {
    yield put(
      verifyCodeRegisterWithSagaFailed({message: getErrorMessage(err)}),
    );
  }
  NavigationActionsService.hideLoading();
}

function* enterPasswordRegister(
  action: PayloadAction<string, PayloadEnterPasswordRegister>,
) {
  const {email, registrationToken, password, rePassword, currentLanguage} =
    action.payload;
  NavigationActionsService.showLoading();
  try {
    const response = yield call(
      BaseService.instance.auth.enterPasswordRegister,
      {
        email,
        registrationToken,
        password,
        rePassword,
      },
    );

    if (response && response.accessToken) {
      const deviceId = yield call(AsyncStorage.getItem, 'vas_fcmToken');
      const res = yield call(
        BaseService.instance.auth.refreshToken,
        response.refreshToken,
        deviceId,
      );
      yield call(setToken, res.accessToken);
      yield call(setRefreshToken, res.refreshToken);
      yield call(BaseService.instance.language.changeLang, {
        languageId: currentLanguage || 'en',
        email,
      });
      yield put(navigationRootAction({name: HOME_SCREEN}));
    } else {
      yield put(
        enterPasswordRegisterWithSagaFailed({message: getErrorMessage()}),
      );
    }
  } catch (err) {
    yield put(
      enterPasswordRegisterWithSagaFailed({message: getErrorMessage(err)}),
    );
  }
  NavigationActionsService.hideLoading();
}

function* forgotPassword(action: PayloadAction<string, PayloadRegister>) {
  const {email, moveScreen} = action.payload;
  NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.auth.forgotPassword, {
      email,
    });
    if (response && response.success) {
      if (moveScreen) {
        NavigationActionsService.push(VERIFY_CODE_SCREEN, {
          inCase: 'forgot_password',
          email,
        });
      }
    } else {
      yield put(forgotPassWithSagaFailed({message: getErrorMessage()}));
    }
  } catch (err) {
    yield put(forgotPassWithSagaFailed({message: getErrorMessage(err)}));
  }
  NavigationActionsService.hideLoading();
}

function* verifyCodeForgotPassword(
  action: PayloadAction<string, PayloadVerifyForgotPassword>,
) {
  const {code, email, inCase} = action.payload;
  NavigationActionsService.showLoading();
  try {
    const response = yield call(
      BaseService.instance.auth.verifyCodeForgotPassword,
      {
        code,
        email,
        inCase,
      },
    );
    if (response && response.registrationToken) {
      NavigationActionsService.push(ENTER_PASSWORD_SCREEN, {
        code,
        email,
        registrationToken: response.registrationToken,
        inCase,
      });
    }
  } catch (err) {
    yield put(verifyCodeForgotWithSagaFailed({message: getErrorMessage(err)}));
  }
  NavigationActionsService.hideLoading();
}

function* enterPasswordForgot(
  action: PayloadAction<string, PayloadEnterPasswordForgot>,
) {
  const {email, registrationToken, password, rePassword} = action.payload;
  NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.auth.enterPasswordForgot, {
      email,
      registrationToken,
      password,
      rePassword,
    });

    if (response && response.accessToken) {
      yield call(setToken, response.accessToken);
      yield put(navigationRootAction({name: HOME_SCREEN}));
    } else {
      yield put(
        enterPasswordForgotWithSagaFailed({message: getErrorMessage()}),
      );
    }
  } catch (err) {
    yield put(
      enterPasswordForgotWithSagaFailed({message: getErrorMessage(err)}),
    );
  }
  NavigationActionsService.hideLoading();
}

function* authSaga() {
  yield takeLatest(LOGOUT_WITH_SAGA, logout);
  yield takeLatest(LOGIN_WITH_SAGA, login);
  yield takeLatest(REGISTER_WITH_SAGA, register);
  yield takeLatest(VERIFY_CODE_REGISTER_WITH_SAGA, verifyCodeRegister);
  yield takeLatest(ENTER_PASSWORD_REGISTER_WITH_SAGA, enterPasswordRegister);
  yield takeLatest(FORGOT_PASSWORD_WITH_SAGA, forgotPassword);

  yield takeLatest(
    VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA,
    verifyCodeForgotPassword,
  );
  yield takeLatest(ENTER_PASSWORD_FORGOT_WITH_SAGA, enterPasswordForgot);
}

export default authSaga;
