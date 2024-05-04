import {
  LOGIN_WITH_SAGA,
  LOGIN_WITH_SAGA_SUCCESS,
  LOGIN_WITH_SAGA_FAILED,
  LOGOUT_WITH_SAGA,
  REGISTER_WITH_SAGA,
  REGISTER_WITH_SAGA_FAILED,
  VERIFY_CODE_REGISTER_WITH_SAGA,
  REGISTER_WITH_SAGA_SUCCESS,
  // VERIFY_CODE_REGISTER_WITH_SAGA_SUCCESS,
  ENTER_PASSWORD_REGISTER_WITH_SAGA,
  FORGOT_PASSWORD_WITH_SAGA,
  FORGOT_PASSWORD_WITH_SAGA_SUCCESS,
  FORGOT_PASSWORD_WITH_SAGA_FAILED,
  ENTER_PASSWORD_REGISTER_WITH_SAGA_FAILED,
  VERIFY_CODE_REGISTER_WITH_SAGA_FAILED,
  VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA,
  ENTER_PASSWORD_FORGOT_WITH_SAGA,
  ENTER_PASSWORD_FORGOT_WITH_SAGA_FAILED,
  VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA_FAILED,
  RESET_MESSAGE_FORGOT,
} from '@constants/index';
import { PayloadAction } from 'types/types';

export interface PayloadLogin {
  email: string;
  password: string;
  deviceId: string;
  currentLanguage?: string;
}

const logoutWithSaga = (): PayloadAction<string, undefined> => {
  return {
    type: LOGOUT_WITH_SAGA,
    payload: undefined,
  };
};

const loginWithSaga = (payload: PayloadLogin): PayloadAction<string, PayloadLogin> => {
  return {
    type: LOGIN_WITH_SAGA,
    payload,
  };
};

const loginWithSagaSuccess = (payload: PayloadLogin): PayloadAction<string, PayloadLogin> => {
  return {
    type: LOGIN_WITH_SAGA_SUCCESS,
    payload,
  };
};

const loginWithSagaFailed = (): PayloadAction<string, undefined> => {
  return {
    type: LOGIN_WITH_SAGA_FAILED,
    payload: undefined,
  };
};

export interface PayloadRegister {
  email: string;
  moveScreen?: boolean;
}

const registerWithSaga = (payload: PayloadRegister): PayloadAction<string, PayloadRegister> => {
  return {
    type: REGISTER_WITH_SAGA,
    payload,
  };
};

const registerWithSagaFailed = (payload: any): PayloadAction<string, undefined> => {
  return {
    type: REGISTER_WITH_SAGA_FAILED,
    payload: payload,
  };
};

const verifyCodeRegisterWithSagaFailed = (payload: { message: string }): PayloadAction<string, { message: string }> => {
  return {
    type: VERIFY_CODE_REGISTER_WITH_SAGA_FAILED,
    payload,
  };
};

export interface PayloadEnterPasswordRegister {
  email: string;
  registrationToken: string;
  password: string;
  rePassword: string;
  currentLanguage?: string;
}

const enterPasswordRegisterWithSaga = (
  payload: PayloadEnterPasswordRegister,
): PayloadAction<string, PayloadEnterPasswordRegister> => {
  return {
    type: ENTER_PASSWORD_REGISTER_WITH_SAGA,
    payload: payload,
  };
};

const enterPasswordRegisterWithSagaFailed = (payload: {
  message: string;
}): PayloadAction<
  string,
  {
    message: string;
  }
> => {
  return {
    type: ENTER_PASSWORD_REGISTER_WITH_SAGA_FAILED,
    payload,
  };
};

export interface PayloadVerifyRegister {
  code: string;
  email: string;
  inCase: string;
}
const verifyCodeRegisterWithSaga = (payload: PayloadVerifyRegister): PayloadAction<string, PayloadVerifyRegister> => {
  return {
    type: VERIFY_CODE_REGISTER_WITH_SAGA,
    payload,
  };
};

export interface PayloadForgotPassword {
  email: string;
  moveScreen?: boolean;
}

const forgotPassWithSaga = (payload: PayloadForgotPassword): PayloadAction<string, PayloadForgotPassword> => {
  return {
    type: FORGOT_PASSWORD_WITH_SAGA,
    payload,
  };
};

const forgotPassWithSagaFailed = (payload: { message: string }): PayloadAction<string, { message: string }> => {
  return {
    type: FORGOT_PASSWORD_WITH_SAGA_FAILED,
    payload,
  };
};

export interface PayloadVerifyForgotPassword {
  code: string;
  email: string;
  inCase: string;
}
const verifyCodeForgotWithSaga = (
  payload: PayloadVerifyForgotPassword,
): PayloadAction<string, PayloadVerifyForgotPassword> => {
  return {
    type: VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA,
    payload,
  };
};

export interface PayloadEnterPasswordForgot {
  email: string;
  registrationToken: string;
  password: string;
  rePassword: string;
}

const enterPasswordForgotWithSaga = (
  payload: PayloadEnterPasswordForgot,
): PayloadAction<string, PayloadEnterPasswordForgot> => {
  return {
    type: ENTER_PASSWORD_FORGOT_WITH_SAGA,
    payload: payload,
  };
};

const enterPasswordForgotWithSagaFailed = (payload: {
  message: string;
}): PayloadAction<
  string,
  {
    message: string;
  }
> => {
  return {
    type: ENTER_PASSWORD_FORGOT_WITH_SAGA_FAILED,
    payload,
  };
};

const resetMessageForgot = () => {
  return {
    type: RESET_MESSAGE_FORGOT,
  };
};

const verifyCodeForgotWithSagaFailed = (payload: { message: string }): PayloadAction<string, { message: string }> => {
  return {
    type: VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA_FAILED,
    payload,
  };
};

export {
  logoutWithSaga,
  loginWithSaga,
  loginWithSagaSuccess,
  loginWithSagaFailed,
  registerWithSaga,
  registerWithSagaFailed,
  enterPasswordRegisterWithSaga,
  verifyCodeRegisterWithSaga,
  verifyCodeRegisterWithSagaFailed,
  forgotPassWithSaga,
  forgotPassWithSagaFailed,
  enterPasswordRegisterWithSagaFailed,
  verifyCodeForgotWithSaga,
  enterPasswordForgotWithSaga,
  enterPasswordForgotWithSagaFailed,
  verifyCodeForgotWithSagaFailed,
  resetMessageForgot,
};
