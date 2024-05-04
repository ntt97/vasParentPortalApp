import { put, takeLatest, call } from 'redux-saga/effects';
import { EVENT_WITH_SAGA, GET_ATTENDANCE_BY_DAY, GET_MEAL_BY_DAY } from 'constants/';
import NavigationActionsService from '@utils/navigation';
import BaseService from '../services';
import {
  getAllEventWithSagaSuccess,
  getAllEventWithSagaFailed,
  ParamsGetEvent,
  setRefreshAnnoucement,
  setLoadingEvent,
} from '@actions/event.action';
import { PayloadAction } from 'types/types';
import { store } from '@store/configureStore';
import { getAttendanceByDayFailed, getAttendanceByDaySuccess } from '@actions/attendance';
import { getMealByDayFailed, getMealByDaySuccess } from '@actions/meal.action';

function* getEvents(action: PayloadAction<string, ParamsGetEvent>) {
  // NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.event.getAll, action.payload);
    yield put(
      getAllEventWithSagaSuccess({
        newEvents: response.data,
        pagination: { ...action.payload.pagination },
        languageId: action.payload.languageId,
      }),
    );

    // delay loading because api finish too fast
    setTimeout(() => {
      store.dispatch(setLoadingEvent(false));
    }, 1000);
  } catch (err) {
    yield put(getAllEventWithSagaFailed());
  }
  // NavigationActionsService.hideLoading();
}
function* getAttendanceByDay(action: any) {
  NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.attendance.getAttendance, action.payload);
    
    if (response && response.data) {
     
      yield put(getAttendanceByDaySuccess(response.data));
    } else {
      yield put(getAttendanceByDayFailed('error'));
    }
  } catch (err) {
    yield put(getAttendanceByDayFailed('error'));
  }
  NavigationActionsService.hideLoading();
}

function* getMealByDay(action: any) {
  NavigationActionsService.showLoading();
  try {
    const response = yield call(BaseService.instance.attendance.getMealByDay, action.payload);
    if (response && response.data) {
     
      yield put(getMealByDaySuccess(response.data));
    } else {
      yield put(getMealByDayFailed('error'));
    }
  } catch (err) {
    yield put(getMealByDayFailed('error'));
  }
  NavigationActionsService.hideLoading();
}

function* eventSaga() {
  yield takeLatest(EVENT_WITH_SAGA, getEvents);
  yield takeLatest(GET_ATTENDANCE_BY_DAY, getAttendanceByDay);
  yield takeLatest(GET_MEAL_BY_DAY, getMealByDay);
}

export default eventSaga;
