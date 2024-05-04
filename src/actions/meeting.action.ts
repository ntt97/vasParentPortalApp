import {
  ADD_CURRENT_STUDENT,
  GET_LIST_STUDENTS_SAGA,
  GET_CURRENT_STUDENT_SAGA,
  GET_LIST_REPORTS_SAGA,
  SET_LIST_STUDENTS,
  SET_LIST_REPORTS,
  SET_CURRENT_STUDENT,
  GET_MESSAGE_STUDENT,
  UPDATE_STUDENT_SAGA,
  RESET_MESSAGE_STUDENT,
  GET_MESSAGE_LIST,
  GET_ALL_LIST_SAGA,
  SET_LIST_PERIOD,
  SET_LIST_SCHOOL_YEAR,
  SET_LIST_TERM,
} from 'constants/index';
import {PayloadAction} from 'types/types';
import {DefaulPayload as DefaulPayloadParent} from './user.action';

export interface DefaulPayload {
  studentId: string;
  period?: number;
}

export interface PayloadUpload {
  data: FormData;
}

export interface PayloadStudent extends DefaulPayload {
  fullname: string;
  dateOfBirth: string;
}

export interface PayloadCurrent extends PayloadStudent {
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  avatar: string;
  gender: string;
  gradeClass: object;
  pupilCode: string;
}
export interface PayloadReport {
  name: string;
  action: string;
}

export interface PayloadPdf extends DefaulPayload {
  link: string;
}

type Type = 'SUCCESS' | 'ERROR';

export interface PayloadMessage {
  type: Type;
  text?: string;
}

export interface PayloadSchoolYear {
  id: number;
  name: string;
}

export interface PayloadPeriod extends PayloadSchoolYear {
  start_at: string;
  end_at: string;
  term_id: number;
}

export interface PayloadTerm extends PayloadSchoolYear {
  schoolYearId: number;
  start_at: string;
  end_at: string;
  is_current: boolean;
}

const addCurrent = (
  payload: PayloadStudent,
): PayloadAction<string, PayloadStudent> => {
  return {
    type: ADD_CURRENT_STUDENT,
    payload,
  };
};

const getListStudent = (
  payload: DefaulPayloadParent,
): PayloadAction<string, DefaulPayloadParent> => {
  return {
    type: GET_LIST_STUDENTS_SAGA,
    payload,
  };
};

const setListStudent = (
  payload: PayloadStudent[],
): PayloadAction<string, PayloadStudent[]> => {
  return {
    type: SET_LIST_STUDENTS,
    payload,
  };
};

const getCurrentStudent = (
  payload: DefaulPayload,
): PayloadAction<string, DefaulPayload> => {
  return {
    type: GET_CURRENT_STUDENT_SAGA,
    payload,
  };
};

const setCurrentStudent = (
  payload: PayloadCurrent | {},
): PayloadAction<string, PayloadCurrent | {}> => {
  return {
    type: SET_CURRENT_STUDENT,
    payload,
  };
};

const getListReportStudent = (
  payload: DefaulPayload,
): PayloadAction<string, DefaulPayload> => {
  return {
    type: GET_LIST_REPORTS_SAGA,
    payload,
  };
};

const setListReportStudent = (
  payload: PayloadReport[],
): PayloadAction<string, PayloadReport[]> => {
  return {
    type: SET_LIST_REPORTS,
    payload,
  };
};

const setMessageList = (
  payload: PayloadMessage,
): PayloadAction<string, PayloadMessage> => {
  return {
    type: GET_MESSAGE_LIST,
    payload,
  };
};

const setMessage = (
  payload: PayloadMessage,
): PayloadAction<string, PayloadMessage> => {
  return {
    type: GET_MESSAGE_STUDENT,
    payload,
  };
};

const resetMessage = () => {
  return {
    type: RESET_MESSAGE_STUDENT,
  };
};

const updateStudent = (
  payload: PayloadStudent,
): PayloadAction<string, PayloadStudent> => {
  return {
    type: UPDATE_STUDENT_SAGA,
    payload,
  };
};

const setListSchoolYear = (
  payload: PayloadSchoolYear[],
): PayloadAction<string, PayloadSchoolYear[]> => {
  return {
    type: SET_LIST_SCHOOL_YEAR,
    payload,
  };
};

const getAllList = (
  payload: DefaulPayload,
): PayloadAction<string, DefaulPayload> => {
  return {
    type: GET_ALL_LIST_SAGA,
    payload,
  };
};

const setListPeriod = (
  payload: PayloadPeriod[],
): PayloadAction<string, PayloadPeriod[]> => {
  return {
    type: SET_LIST_PERIOD,
    payload,
  };
};

const setListTerm = (
  payload: PayloadTerm[],
): PayloadAction<string, PayloadTerm[]> => {
  return {
    type: SET_LIST_TERM,
    payload,
  };
};

export {
  addCurrent,
  getListStudent,
  setListStudent,
  getCurrentStudent,
  setCurrentStudent,
  getListReportStudent,
  setListReportStudent,
  setMessage,
  updateStudent,
  resetMessage,
  setMessageList,
  setListSchoolYear,
  getAllList,
  setListPeriod,
  setListTerm,
};
