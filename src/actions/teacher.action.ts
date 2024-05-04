import {
  GET_LIST_TEACHER,
  SET_LIST_TEACHER,
  FILTER_LIST_TEACHER_SUCCESS,
  FILTER_LIST_TEACHER_FAILED,
  FILTER_LIST_TEACHER,
  FILTER_LIST_TEACHER_FIREBASE,
  FILTER_LIST_TEACHER_FIREBASE_SUCCESS,
  FILTER_LIST_TEACHER_FIREBASE_FAILED,
} from 'constants/index';
import {PayloadAction} from 'types/types';

export interface DefaulPayload {
  id: string;
}
export interface DefaultListTeacher {
  listTeacher: [];
}
export interface DefaultKeySearch {}

const getListTeacher = (
  payload: DefaulPayload,
): PayloadAction<string, DefaulPayload> => {
  return {
    type: GET_LIST_TEACHER,
    payload,
  };
};

const setListTeacher = (
  payload: DefaultListTeacher,
): PayloadAction<string, DefaultListTeacher> => {
  return {
    type: SET_LIST_TEACHER,
    payload,
  };
};

const filterListTeacher = (payload: any) => {
  return {
    type: FILTER_LIST_TEACHER,
    payload,
  };
};

const filterListTeacherSuccess = (
  payload: DefaultListTeacher,
): PayloadAction<string, DefaultListTeacher> => {
  return {
    type: FILTER_LIST_TEACHER_SUCCESS,
    payload,
  };
};

const filterListTeacherFailed = () => {
  return {
    type: FILTER_LIST_TEACHER_FAILED,
  };
};

const filterListTeacherFirebase = (payload: any) => {
  return {
    type: FILTER_LIST_TEACHER_FIREBASE,
    payload,
  };
};

const filterListTeacherFirebaseSuccess = (
  payload: DefaultListTeacher,
): PayloadAction<string, DefaultListTeacher> => {
  return {
    type: FILTER_LIST_TEACHER_FIREBASE_SUCCESS,
    payload,
  };
};
const filterListTeacherFirebaseFailed = () => {
  return {
    type: FILTER_LIST_TEACHER_FIREBASE_FAILED,
  };
};

export {
  getListTeacher,
  setListTeacher,
  filterListTeacher,
  filterListTeacherSuccess,
  filterListTeacherFailed,
  filterListTeacherFirebase,
  filterListTeacherFirebaseSuccess,
  filterListTeacherFirebaseFailed,
};
