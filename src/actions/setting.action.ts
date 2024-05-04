import { TimeRecall } from './../types/types';
import { GET_TIME_RECALL, GET_TIME_RECALL_SUCCESS } from '@constants/index';

const actGetTimeRecall = (payload: TimeRecall) => {
  return {
    type: GET_TIME_RECALL,
    payload,
  };
};

const actGetTimeRecallSuccess = (payload: any) => {
  return {
    type: GET_TIME_RECALL_SUCCESS,
    payload,
  };
};

export { actGetTimeRecall, actGetTimeRecallSuccess };
