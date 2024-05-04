import BaseService from 'services';
import { PayloadAction, TimeRecall } from './../types/types';
import { GET_TIME_RECALL } from '@constants/index';
import { takeLatest, call, put } from 'redux-saga/effects';
import { actGetTimeRecallSuccess } from '@actions/setting.action';

function* settingWithSaga(action: PayloadAction<string, TimeRecall>) {
  const { key } = action.payload;
  try {
    const response = yield call(BaseService.instance.event.getConfigByKey, key);
    if (response) {
    const timeRecall =  Number(response[0]?.value[1]?.value || 30);
      yield put(actGetTimeRecallSuccess({timeRecall:timeRecall}))
    }
  } catch (error) {}
}

function* settingSaga() {
  yield takeLatest(GET_TIME_RECALL, settingWithSaga);
}
export default settingSaga;
