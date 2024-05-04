import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  USER_TOKEN,
  USER_LANGUAGE,
  DEFAULT_LANGUAGE_INITIAL,
  USER_REFRESH_TOKEN,
} from '@constants/users';
import {CURRENT_USER} from '@constants/appString';
const jwtDecode = require('jwt-decode');

const setDefaultLanguage = async (language: string) => {
  return AsyncStorage.setItem(USER_LANGUAGE, language);
};

const getDefaultLanguage = async () => {
  return AsyncStorage.getItem(USER_LANGUAGE);
};

const setToken = async (value: string) => {
  return AsyncStorage.setItem(USER_TOKEN, value);
};

const getToken = async () => {
  return AsyncStorage.getItem(USER_TOKEN);
};

const setRefreshToken = async (value: string) => {
  return AsyncStorage.setItem(USER_REFRESH_TOKEN, value);
};

const getRefreshToken = () => {
  return AsyncStorage.getItem(USER_REFRESH_TOKEN);
};

const getErrorMessage = (error?: any, message = 'Something went wrong!') => {
  try {
    const result =
      error &&
      error.data &&
      error.data.message &&
      typeof error.data.message === 'string'
        ? error.data.message
        : message;
    return result;
  } catch (e) {
    return message;
  }
};

const decodeToken = async (value?: any) => {
  let token = value;
  if (!value) {
    token = await getToken();
  }
  return jwtDecode(token);
};

const isTokenExpired = async (value?: any) => {
  let token = value;
  if (!value) {
    token = await getToken();
  }
  const date = getTokenExpirationDate(token);
  if (date === undefined) return false;
  return !(date.valueOf() > new Date().valueOf());
};

const getTokenExpirationDate = (token: string): Date => {
  const decoded = jwtDecode(token);

  if (decoded.exp === undefined) return new Date();

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
};
const setCurrentUser = async (value?: any) => {
  return AsyncStorage.setItem(CURRENT_USER, value);
};
const getCurrentUser = async () => {
  return AsyncStorage.getItem(CURRENT_USER);
};

const setNotificationLocal = async (value?: any) => {
  return AsyncStorage.setItem('@NOTIFY_LOCAL', value);
};
const getNotificationLocal = async () => {
  return AsyncStorage.getItem('@NOTIFY_LOCAL');
};

export {
  setDefaultLanguage,
  getDefaultLanguage,
  setToken,
  getToken,
  getErrorMessage,
  decodeToken,
  isTokenExpired,
  setRefreshToken,
  getRefreshToken,
  setCurrentUser,
  getCurrentUser,
  setNotificationLocal,
  getNotificationLocal,
};
