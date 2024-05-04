import {LANGUAGE_WITH_SAGA_SUCCESS, CHANGE_LANGUAGE} from 'constants/index';
import {PayloadAction} from 'types/types';
import {PayloadLanguageList} from '@actions/language.action';

export interface LanguageState {
  listLanguage: {value: string; label: string}[];
  currentLanguage: string;
}

const defaultState: LanguageState = {
  listLanguage: [],
  currentLanguage: '',
};
export default function languageReducer(
  state: LanguageState = defaultState,
  action: PayloadAction<string, any>,
) {
  switch (action.type) {
    case LANGUAGE_WITH_SAGA_SUCCESS:
      return {
        ...state,
        listLanguage: [...action.payload],
      };
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.payload,
      };
    }
    default:
      return state;
  }
}
