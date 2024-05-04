import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from 'types/types';
import BaseService from 'services/';

import {
  GET_LIST_REPORTS_SAGA,
  GET_LIST_STUDENTS_SAGA,
  GET_CURRENT_STUDENT_SAGA,
  UPDATE_STUDENT_SAGA,
  GET_ALL_LIST_SAGA,
} from 'constants/index';
import * as actions from '@actions/student.action';
import * as actionsParent from 'actions/user.action';

import NavigationActionsService from '@utils/navigation';
import {strings} from 'utils/i18n';

function* getList(action: PayloadAction<string, actionsParent.DefaulPayload>) {
  // NavigationActionsService.showLoading();
  try {
    const {id} = action.payload;

    const data = yield call(BaseService.instance.student.getlist, id);
    if (data) {
      yield put(actions.setListStudent(data.parentsChildren));
    }
  } catch (err) {
    yield put(
      actions.setMessageList({
        text: err.message || strings('msg_error'),
        type: 'ERROR',
      }),
    );
  }
  // NavigationActionsService.hideLoading();
}

function* getReports(action: PayloadAction<string, actions.DefaulPayload>) {
  NavigationActionsService.showLoading();
  try {
    // const { studentId } = action.payload;

    const reports = yield call(
      BaseService.instance.student.getReports,
      action.payload,
    );

    yield put(actions.setListReportStudent(reports));
  } catch (err) {}
  NavigationActionsService.hideLoading();
}

function* getCurrent(action: PayloadAction<string, actions.DefaulPayload>) {
  NavigationActionsService.showLoading();
  try {
    const {studentId} = action.payload;
    const data = yield call(BaseService.instance.student.getCurrent, studentId);

    yield put(actions.setCurrentStudent(data));
  } catch (err) {
    actions.setMessage({
      text: err.message || strings('msg_error'),
      type: 'ERROR',
    });
  }
  NavigationActionsService.hideLoading();
}

function* updateStudent(action: PayloadAction<string, actions.PayloadStudent>) {
  NavigationActionsService.showLoading();
  try {
    const response = yield call(
      BaseService.instance.student.updateStudent,
      action.payload,
    );
    if (response.success) {
      yield put(
        actions.setMessage({
          type: 'SUCCESS',
        }),
      );
    }
  } catch (err) {
    actions.setMessage({
      text: err.message || strings('msg_error'),
      type: 'ERROR',
    });
  }
  NavigationActionsService.hideLoading();
}

function* getListSaga(action: PayloadAction<string, actions.DefaulPayload>) {
  try {
    const {studentId} = action.payload;

    const periods = yield call(
      BaseService.instance.student.getPeriod,
      studentId,
    );
    const term = yield call(BaseService.instance.student.getTerms);

    yield put(actions.setListPeriod(periods));
    yield put(actions.setListTerm(term));

    const schoolYear = yield call(
      BaseService.instance.student.getSchoolYears,
      studentId,
    );
    let arrSchool = yield schoolYear.map((obj: any) => {
      obj['value'] = obj['id'];
      obj['label'] = obj['name'];
      delete obj['id'];
      delete obj['name'];
      return obj;
    });

    yield put(actions.setListSchoolYear(arrSchool));
  } catch (err) {}
}

function* studentSaga() {
  yield takeLatest(GET_LIST_STUDENTS_SAGA, getList);
  yield takeLatest(GET_CURRENT_STUDENT_SAGA, getCurrent);
  yield takeLatest(GET_LIST_REPORTS_SAGA, getReports);
  yield takeLatest(UPDATE_STUDENT_SAGA, updateStudent);
  yield takeLatest(GET_ALL_LIST_SAGA, getListSaga);
}

export default studentSaga;
