import {
  GET_ATTENDANCE_BY_DAY_SUCCESS,
  GET_ATTENDANCE_BY_DAY_FAILED,
} from 'constants/index';

export interface AttendanceState {
  data: object;
  status: number;
  message: string;
}

const defaultState = {
  data: {},
  status: 1,
  message: '',
};

export default function AttendanceReducer(
  state: AttendanceState = defaultState,
  action: any,
) {
  switch (action.type) {
    case GET_ATTENDANCE_BY_DAY_SUCCESS:
      return {...state, status: 1, data: action.payload};
    case GET_ATTENDANCE_BY_DAY_FAILED:
      state = {...defaultState};
      return {...state, data: {}, status: 0, message: action.payload};
    default:
      return state;
  }
}
