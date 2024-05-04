import {call, put, takeLatest, delay} from 'redux-saga/effects';
import {PayloadAction} from 'types/types';
import BaseService from 'services/';
import {
  FILTER_LIST_TEACHER,
  FILTER_LIST_TEACHER_FIREBASE,
} from 'constants/index';
import NavigationActionsService from '@utils/navigation';
import * as actions from '@actions/teacher.action';

function* filter(action: any) {
  // NavigationActionsService.showLoading();
  const {key, parentId, page, limit} = action.payload;
  yield delay(500);
  const data = yield call(
    BaseService.instance.teacher.filterListTeacher,
    parentId,
    key,
    page,
    limit,
  );
  if (data && data.items) {
    yield put(actions.filterListTeacherSuccess(data));
  } else {
    yield put(actions.filterListTeacherFailed());
  }
  // NavigationActionsService.showLoading();
}

function* filterFirebase(action: any) {
  const {parentId, key} = action.payload;

  yield delay(500);
  const data = yield call(
    BaseService.instance.teacher.filterListTeacherFirebase,
    parentId,
    key,
  );
  if (data) {
    yield put(actions.filterListTeacherFirebaseSuccess(data));
  } else {
    yield put(actions.filterListTeacherFirebaseFailed());
  }
}

function* teacherSaga() {
  yield takeLatest(FILTER_LIST_TEACHER, filter);
  yield takeLatest(FILTER_LIST_TEACHER_FIREBASE, filterFirebase);
}

export default teacherSaga;
