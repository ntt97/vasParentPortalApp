import {
  SET_PROFILE_USER,
  GET_MESSAGE_USER,
  RESET_MESSAGE_USER,
  GET_MESSAGE_CHANGEPASS,
  RESET_MESSAGE_CHANGEPASS,
  SET_RELATIONSHIP,
} from 'constants/index';

export interface UserState {
  profile: any;
  message: {
    type: string;
    text: string;
  };
  changePassword: {
    type: string;
    text: string;
  };
  relationship: any[];
}

const defaultState = {
  profile: {},
  message: {
    type: '',
    text: '',
  },
  changePassword: {
    type: '',
    text: '',
  },
  relationship: [
    {
      value: '',
      label: '',
    },
  ],
};

export default function userReducer(
  state: UserState = defaultState,
  action: any,
) {
  switch (action.type) {
    case SET_PROFILE_USER:
      return {...state, profile: action.payload};
    case GET_MESSAGE_USER:
      const {type, text} = action.payload;
      return {
        ...state,
        message: {type, text},
      };
    case RESET_MESSAGE_USER:
      return {
        ...state,
        message: {},
      };

    case GET_MESSAGE_CHANGEPASS:
      return {
        ...state,
        changePassword: {...action.payload},
      };
    case RESET_MESSAGE_CHANGEPASS:
      return {
        ...state,
        changePassword: {},
      };

    case SET_RELATIONSHIP:
      return {
        ...state,
        relationship: [...action.payload],
      };
    default:
      return state;
  }
}
