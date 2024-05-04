import {
  CHANGE_LANGUAGE,
  LANGUAGE_WITH_SAGA,
  LANGUAGE_WITH_SAGA_SUCCESS,
  CHANGE_LANGUAGE_WITH_SAGA,
} from 'constants/index';
import {PayloadAction} from 'types/types';

export interface PayloadLanguageList {
  value: string;
  label: string;
  iconId?: string;
  status?: boolean;
}

const languageWithSaga = (): PayloadAction<string, null> => {
  return {
    type: LANGUAGE_WITH_SAGA,
    payload: null,
  };
};

const languageWithSagaSuccess = (
  payload: PayloadLanguageList[],
): PayloadAction<string, PayloadLanguageList[]> => {
  return {
    type: LANGUAGE_WITH_SAGA_SUCCESS,
    payload,
  };
};

const handleChangeLanguage = (
  payload: string,
): PayloadAction<string, string> => {
  return {
    type: CHANGE_LANGUAGE,
    payload,
  };
};

const changeLanguageWithSaga = (
  payload: string,
): PayloadAction<string, string> => {
  return {
    type: CHANGE_LANGUAGE_WITH_SAGA,
    payload,
  };
};

export {
  handleChangeLanguage,
  languageWithSaga,
  languageWithSagaSuccess,
  changeLanguageWithSaga,
};
