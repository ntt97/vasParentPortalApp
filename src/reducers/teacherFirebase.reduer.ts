import {
  FILTER_LIST_TEACHER_FIREBASE_SUCCESS,
  FILTER_LIST_TEACHER_FIREBASE_FAILED,
} from 'constants/index';

export interface TeacherFirebaseState {
  listTeacher: any;
}

const defaultState = {
  listTeacher: [],
};

export default function userReducer(
  state: TeacherFirebaseState = defaultState,
  action: any,
) {
  switch (action.type) {
    case FILTER_LIST_TEACHER_FIREBASE_SUCCESS:
      return {...state, listTeacher: action.payload};
    case FILTER_LIST_TEACHER_FIREBASE_FAILED:
      return {...state};
    default:
      return state;
  }
}
