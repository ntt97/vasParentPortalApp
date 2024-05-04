import { put, takeLatest, call } from 'redux-saga/effects';
import { NOTIFY_WITH_SAGA, CURRENT_NOTIFY_SAGA } from 'constants/';
import NavigationActionsService from '@utils/navigation';
import BaseService from '../services';
import {
  getAllNotifyWithSagaSuccess,
  getAllNotifyWithSagaFailed,
  ParamsGetNotify,
  DefaulPayload,
  getCurrentNotifySuccess,
  getCurrentNotifyFailed,
  setLoadingNotify,
} from '@actions/notification.action';
import { PayloadAction } from 'types/types';
import { store } from '@store/configureStore';
import { decodeToken } from '@utils/helper';

function* getNotify(action: PayloadAction<string, ParamsGetNotify>) {
  // NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.notification.getAll, action.payload);
    yield put(
      getAllNotifyWithSagaSuccess({
        newEvents: response.data,
        pagination: { ...action.payload.pagination },
        languageId: action.payload.languageId,
        eventNotSeen: response.eventNotSeen,
      }),
    );

    // delay loading because api finish too fast
    setTimeout(() => {
      store.dispatch(setLoadingNotify(false));
    }, 500);
  } catch (err) {
    yield put(getAllNotifyWithSagaFailed());
    store.dispatch(setLoadingNotify(false));
  } finally {
    store.dispatch(setLoadingNotify(false));
  }
  store.dispatch(setLoadingNotify(false));
}

function* getCurrent(action: PayloadAction<string, DefaulPayload>) {
  // NavigationActionsService.showLoading();
  try {
    const data = yield call(BaseService.instance.notification.getCurrent, action.payload);

    const user = yield call(decodeToken);
    yield call(BaseService.instance.notification.updateSeen, {
      parentId: user.id,
      eventId: action.payload.id,
    });

    yield put(getCurrentNotifySuccess(data));
  } catch (err) {
    yield put(getCurrentNotifyFailed());
  }
  // NavigationActionsService.hideLoading();
}

function* notificationSaga() {
  yield takeLatest(NOTIFY_WITH_SAGA, getNotify);
  yield takeLatest(CURRENT_NOTIFY_SAGA, getCurrent);
}

export default notificationSaga;
