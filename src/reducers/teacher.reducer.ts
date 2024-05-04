import {
  FILTER_LIST_TEACHER_SUCCESS,
  FILTER_LIST_TEACHER_FAILED,
  FILTER_LIST_TEACHER_FIREBASE_SUCCESS,
  FILTER_LIST_TEACHER_FIREBASE_FAILED,
} from 'constants/index';

export interface TeacherState {
  listTeacher: any;
}

const defaultState = {
  listTeacher: [],
};

export default function userReducer(
  state: TeacherState = defaultState,
  action: any,
) {
  switch (action.type) {
    case FILTER_LIST_TEACHER_SUCCESS:
      return {...state, listTeacher: action.payload};
    case FILTER_LIST_TEACHER_FAILED:
      return {...state, listTeacher: []};
    default:
      return state;
  }
}
