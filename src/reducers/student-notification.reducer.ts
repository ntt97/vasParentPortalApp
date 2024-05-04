import {
  INCREASE_NOT_SEEN_ATTENDANCE,
  DECREASE_NOT_SEEN_ATTENDANCE,
  INCREASE_NOT_SEEN_MEAL,
  DECREASE_NOT_SEEN_MEAL,
  SET_STUDENT_NOTIFICATION,
} from '@constants/index';
import { setNotificationLocal } from '@utils/helper';

export interface NotificationStudentState {
  meal: Array<any>;
  attendance: Array<any>;
}

const defaultState: NotificationStudentState = {
  meal: [],
  attendance: [],
};

export default function AttendanceReducer(state: NotificationStudentState = defaultState, action: any) {
  let index: number = -1;
  switch (action.type) {
    case INCREASE_NOT_SEEN_ATTENDANCE:
      index = state.attendance.findIndex(element => element.studentId === action.payload.studentId);
      if (index === -1) {
        state.meal.push(action.payload);
      }
      setNotificationLocal(JSON.stringify(state));
      return { ...state };
    case DECREASE_NOT_SEEN_ATTENDANCE:
      index = state.attendance.findIndex(element => element.studentId === action.payload.studentId);
      if (index !== -1) {
        state.meal.splice(index, 1);
      }
      setNotificationLocal(JSON.stringify(state));
      return { ...state };
    case INCREASE_NOT_SEEN_MEAL:
      index = state.meal.findIndex(element => element.studentId === action.payload.studentId);
      if (index === -1) {
        state.meal.push(action.payload);
      }
      setNotificationLocal(JSON.stringify(state));
      return { ...state };
    case DECREASE_NOT_SEEN_MEAL:
      index = state.meal.findIndex(element => element.studentId === action.payload.studentId);
      if (index !== -1) {
        state.meal.splice(index, 1);
      }
      setNotificationLocal(JSON.stringify(state));
      return { ...state };
    case SET_STUDENT_NOTIFICATION:
      return  {...state,...action.payload}
    default:
      return state;
  }
}
