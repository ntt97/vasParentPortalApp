import { NAVIGATION_ROOT_WITH_SAGA } from 'constants/';
import { put, takeLatest } from 'redux-saga/effects';
import {
  navigationRootSuccess,
  PayloadNavigationRoot
} from 'actions/navigation.action';
import { PayloadAction } from 'types/types';

function* navigationRootWithSaga(
  action: PayloadAction<string, PayloadNavigationRoot>
) {
  yield put(navigationRootSuccess(action.payload));
}

function* navigationSaga() {
  yield takeLatest(NAVIGATION_ROOT_WITH_SAGA, navigationRootWithSaga);
}

export default navigationSaga;
