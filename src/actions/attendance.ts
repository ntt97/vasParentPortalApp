import {VERSION} from '@constants/config';
import {
  GET_ATTENDANCE_BY_DAY,
  GET_ATTENDANCE_BY_DAY_SUCCESS,
  GET_ATTENDANCE_BY_DAY_FAILED,
  INCREASE_NOT_SEEN_ATTENDANCE,
  DECREASE_NOT_SEEN_ATTENDANCE,
  SET_STUDENT_NOTIFICATION,
} from 'constants/index';
import {PayloadAction} from 'types/types';

export interface DefaultPayload {
  studentId: string;
  filterMonth: string;
  langId: string;
  version: string;
}

const getAttendanceByDay = (
  payload: DefaultPayload,
): PayloadAction<string, DefaultPayload> => {
  return {
    type: GET_ATTENDANCE_BY_DAY,
    payload,
  };
};
const getAttendanceByDaySuccess = (payload: any) => {
  return {
    type: GET_ATTENDANCE_BY_DAY_SUCCESS,
    payload,
  };
};
const getAttendanceByDayFailed = (payload: any) => {
  return {
    type: GET_ATTENDANCE_BY_DAY_FAILED,
    payload,
  };
};

const IncreaseNotSeenAttendance = (payload: any) => {
  return {
    type: INCREASE_NOT_SEEN_ATTENDANCE,
    payload,
  };
};

const DecreaseNotSeenAttendance = (payload: any) => {
  return {
    type: DECREASE_NOT_SEEN_ATTENDANCE,
    payload,
  };
};
const setStudentNotification = (payload: any) => {
  return {
    type: SET_STUDENT_NOTIFICATION,
    payload,
  };
};

export {
  getAttendanceByDay,
  getAttendanceByDaySuccess,
  getAttendanceByDayFailed,
  IncreaseNotSeenAttendance,
  DecreaseNotSeenAttendance,
  setStudentNotification,
};
