import {
  SET_NUMBER_MESSAGE_NOT_SEEN,
  GET_NUMBER_MESSAGE_NOT_SEEN,
} from 'constants/index';
import {PayloadAction} from 'types/types';

export interface DefaulPayload {
  count: number;
}

const setNumberMessageNotSeen = (
  payload: DefaulPayload,
): PayloadAction<string, DefaulPayload> => {
  return {
    type: SET_NUMBER_MESSAGE_NOT_SEEN,
    payload,
  };
};

const getNumberMessageNotSeen = (
  payload: DefaulPayload,
): PayloadAction<string, DefaulPayload> => {
  return {
    type: GET_NUMBER_MESSAGE_NOT_SEEN,
    payload,
  };
};

export {setNumberMessageNotSeen, getNumberMessageNotSeen};
