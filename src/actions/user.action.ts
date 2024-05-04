import {
  GET_PROFILE_USER_SAGA,
  SET_PROFILE_USER,
  UPDATE_USER_SAGA,
  CHANGE_PASSWORD_SAGA,
  UPLOAD_AVATAR_SAGA,
  GET_MESSAGE_USER,
  RESET_MESSAGE_USER,
  GET_MESSAGE_CHANGEPASS,
  RESET_MESSAGE_CHANGEPASS,
  GET_RELATIONSHIP_SAGA,
  SET_RELATIONSHIP,
} from 'constants/index';
import {PayloadAction} from 'types/types';

export interface DefaulPayload {
  id: string;
}

export interface PayloadUser extends DefaulPayload {
  name: string;
  avatar: string;
  relationship: string;
  email: string;
  phone: string;
}

export interface PayloadPassword extends DefaulPayload {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface PayloadUpload extends DefaulPayload {
  data: FormData;
}

export interface PayloadRelationship {
  value: string;
  label: string;
  languageId: string;
}

type Type = 'SUCCESS' | 'ERROR';

export interface PayloadMessage {
  type: Type;
  text?: string;
}

const getProfileUser = (
  payload: DefaulPayload,
): PayloadAction<string, DefaulPayload> => {
  return {
    type: GET_PROFILE_USER_SAGA,
    payload,
  };
};

const saveProfileUser = (
  payload: PayloadUser,
): PayloadAction<string, PayloadUser> => {
  return {
    type: SET_PROFILE_USER,
    payload,
  };
};

const updateUser = (
  payload: PayloadUser,
): PayloadAction<string, PayloadUser> => {
  return {
    type: UPDATE_USER_SAGA,
    payload,
  };
};

const changePassword = (
  payload: PayloadPassword,
): PayloadAction<string, PayloadPassword> => {
  return {
    type: CHANGE_PASSWORD_SAGA,
    payload,
  };
};

const setMessage = (
  payload: PayloadMessage,
): PayloadAction<string, PayloadMessage> => {
  return {
    type: GET_MESSAGE_USER,
    payload,
  };
};

const resetMessage = () => {
  return {
    type: RESET_MESSAGE_USER,
  };
};

const uploadAvatar = (payload: any): PayloadAction<string, any> => {
  return {
    type: UPLOAD_AVATAR_SAGA,
    payload,
  };
};

const setMessageChangePass = (
  payload: PayloadMessage,
): PayloadAction<string, PayloadMessage> => {
  return {
    type: GET_MESSAGE_CHANGEPASS,
    payload,
  };
};

const resetMessageChangePass = () => {
  return {
    type: RESET_MESSAGE_CHANGEPASS,
  };
};

const getRelationship = () => {
  return {
    type: GET_RELATIONSHIP_SAGA,
  };
};

const setRelationship = (
  payload: PayloadRelationship[],
): PayloadAction<string, PayloadRelationship[]> => {
  return {
    type: SET_RELATIONSHIP,
    payload,
  };
};

export {
  getProfileUser,
  saveProfileUser,
  updateUser,
  changePassword,
  uploadAvatar,
  setMessage,
  resetMessage,
  setMessageChangePass,
  resetMessageChangePass,
  getRelationship,
  setRelationship,
};
