import {
  LOGOUT_WITH_SAGA,
  LOGIN_WITH_SAGA_FAILED,
  LOGIN_WITH_SAGA,
  REGISTER_WITH_SAGA,
  REGISTER_WITH_SAGA_FAILED,
  ENTER_PASSWORD_REGISTER_WITH_SAGA_FAILED,
  ENTER_PASSWORD_REGISTER_WITH_SAGA,
  VERIFY_CODE_REGISTER_WITH_SAGA_FAILED,
  VERIFY_CODE_REGISTER_WITH_SAGA,
  FORGOT_PASSWORD_WITH_SAGA_FAILED,
  ENTER_PASSWORD_FORGOT_WITH_SAGA_FAILED,
  ENTER_PASSWORD_FORGOT_WITH_SAGA,
  VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA_FAILED,
  VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA,
  RESET_MESSAGE_FORGOT,
  // REGISTER_WITH_SAGA_SUCCESS,
  // VERIFY_CODE_WITH_SAGA_SUCCESS,
} from 'constants/index';

export interface AuthState {
  login: {
    isError: boolean;
  };
  register: {
    isError: boolean;
    message: string;
  };
  forgotPassword: {
    isError: boolean;
    message: string;
  };
}

const defaultState = {
  login: {
    isError: false,
  },
  register: {
    isError: false,
    message: '',
  },
  forgotPassword: {
    isError: false,
    message: '',
  },
};
export default function authReducer(
  state: AuthState = defaultState,
  action: any,
) {
  switch (action.type) {
    case LOGOUT_WITH_SAGA:
      return {...defaultState};

    case LOGIN_WITH_SAGA:
      return {...defaultState, login: {isError: false}};
    case LOGIN_WITH_SAGA_FAILED:
      return {...defaultState, login: {isError: true}};

    case REGISTER_WITH_SAGA:
      return {...defaultState, register: {isError: false, message: ''}};
    case REGISTER_WITH_SAGA_FAILED:
      return {
        ...defaultState,
        register: {
          isError: true,
          message: action.payload.message || 'Something went wrong!',
        },
      };

    case VERIFY_CODE_REGISTER_WITH_SAGA:
      return {...defaultState, register: {isError: false, message: ''}};
    case VERIFY_CODE_REGISTER_WITH_SAGA_FAILED: {
      return {
        ...defaultState,
        register: {
          isError: true,
          message: action.payload.message || 'Something went wrong!',
        },
      };
    }
    case ENTER_PASSWORD_REGISTER_WITH_SAGA:
      return {
        ...defaultState,
        register: {isError: false, message: ''},
      };
    case ENTER_PASSWORD_REGISTER_WITH_SAGA_FAILED:
      return {
        ...defaultState,
        register: {
          isError: true,
          message: action.payload.message || 'Something went wrong!',
        },
      };

    case FORGOT_PASSWORD_WITH_SAGA_FAILED:
      return {
        ...defaultState,
        forgotPassword: {
          isError: true,
          message: action.payload.message || 'Something went wrong!',
        },
      };

    case ENTER_PASSWORD_FORGOT_WITH_SAGA:
      return {
        ...defaultState,
        forgotPassword: {isError: false, message: ''},
      };
    case ENTER_PASSWORD_FORGOT_WITH_SAGA_FAILED:
      return {
        ...defaultState,
        forgotPassword: {
          isError: true,
          message: action.payload.message || 'Something went wrong!',
        },
      };
    case RESET_MESSAGE_FORGOT:
      return {
        ...defaultState,
        forgotPassword: {isError: false, message: ''},
      };

    case VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA:
      return {...defaultState, forgotPassword: {isError: false, message: ''}};
    case VERIFY_CODE_FORGOT_PASSWORD_WITH_SAGA_FAILED: {
      return {
        ...defaultState,
        forgotPassword: {
          isError: true,
          message: action.payload.message || 'Something went wrong!',
        },
      };
    }

    default:
      return state;
  }
}
