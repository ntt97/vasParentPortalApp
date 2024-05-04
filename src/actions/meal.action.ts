import {
  GET_MEAL_BY_DAY,
  GET_MEAL_BY_DAY_SUCCESS,
  GET_MEAL_BY_DAY_FAILED,
  INCREASE_NOT_SEEN_MEAL,
  DECREASE_NOT_SEEN_MEAL,
} from 'constants/index';
import {PayloadAction} from 'types/types';

export interface DefaultPayload {
  studentId: string;
  filterDate: string;
  version: string;
}

const getMealByDay = (
  payload: DefaultPayload,
): PayloadAction<string, DefaultPayload> => {
  return {
    type: GET_MEAL_BY_DAY,
    payload,
  };
};
const getMealByDaySuccess = (payload: any) => {
  return {
    type: GET_MEAL_BY_DAY_SUCCESS,
    payload,
  };
};
const getMealByDayFailed = (payload: any) => {
  return {
    type: GET_MEAL_BY_DAY_FAILED,
    payload,
  };
};

const IncreaseNotSeenMeal = (payload: any) => {
  return {
    type: INCREASE_NOT_SEEN_MEAL,
    payload,
  };
};

const DecreaseNotSeenMeal = (payload: any) => {
  return {
    type: DECREASE_NOT_SEEN_MEAL,
    payload,
  };
};

export {
  getMealByDay,
  getMealByDaySuccess,
  getMealByDayFailed,
  IncreaseNotSeenMeal,
  DecreaseNotSeenMeal,
};
