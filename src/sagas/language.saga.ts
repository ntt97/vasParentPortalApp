import { put, takeLatest, call } from 'redux-saga/effects';
import { LANGUAGE_WITH_SAGA, CHANGE_LANGUAGE_WITH_SAGA } from 'constants/';
import NavigationActionsService from '@utils/navigation';
import BaseService from '../services';
import { languageWithSagaSuccess } from '@actions/language.action';
import { PayloadAction } from 'types/types';
import { decodeToken } from '@utils/helper';

function* getLanguage() {
  NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.language.getAll);
    if (Array.isArray(response.data)) {
      const result = [];
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].status) {
          result.push({
            value: response.data[i].id,
            label: response.data[i].name,
          });
        }
      }

      yield put(languageWithSagaSuccess(result));
    }
  } catch (err) {}
  NavigationActionsService.hideLoading();
}

function* changeLanguageSaga(action: PayloadAction<string, string>) {
  try {
    const user = yield decodeToken();
    const response = yield call(BaseService.instance.language.changeLang, {
      languageId: action.payload,
      email: user.email,
    });
  } catch (err) {}
}

function* languageSaga() {
  yield takeLatest(LANGUAGE_WITH_SAGA, getLanguage);
  yield takeLatest(CHANGE_LANGUAGE_WITH_SAGA, changeLanguageSaga);
}

export default languageSaga;
