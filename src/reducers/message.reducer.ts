import {
  SET_NUMBER_MESSAGE_NOT_SEEN,
  GET_NUMBER_MESSAGE_NOT_SEEN,
} from 'constants/index';

export interface MessageState {
  count: number;
}

const defaultState = {
  count: 0,
};

export default function userReducer(
  state: MessageState = defaultState,
  action: any,
) {
  switch (action.type) {
    case SET_NUMBER_MESSAGE_NOT_SEEN:
      state.count = action.payload.count;
      return {...state};
    case GET_NUMBER_MESSAGE_NOT_SEEN:
      return {...state};
    default:
      return state;
  }
}
