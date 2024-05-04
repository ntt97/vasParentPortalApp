import {
  SET_LIST_REPORTS,
  SET_CURRENT_STUDENT,
  SET_LIST_STUDENTS,
  GET_MESSAGE_STUDENT,
  RESET_MESSAGE_STUDENT,
  GET_MESSAGE_LIST,
  SET_LIST_PERIOD,
  SET_LIST_SCHOOL_YEAR,
  SET_LIST_TERM,
} from 'constants/index';

export interface StudentState {
  current: any;
  list: any;
  reports: any;
  message: {
    current: {
      type: string;
      text: string;
    };
    list: {
      type: string;
      text: string;
    };
  };
  schoolYears: Array<any>;
  periods: Array<any>;
  terms: Array<any>;
}

const defaultState = {
  current: {},
  list: [],
  reports: [],
  message: {
    current: {
      type: '',
      text: '',
    },
    list: {
      type: '',
      text: '',
    },
  },
  schoolYears: [],
  periods: [],
  terms: [],
};

export default function studentReducer(
  state: StudentState = defaultState,
  action: any,
) {
  switch (action.type) {
    case SET_CURRENT_STUDENT:
      return {...state, current: action.payload};
    case SET_LIST_STUDENTS:
      return {...state, list: action.payload};
    case SET_LIST_REPORTS:
      return {...state, reports: action.payload};
    case GET_MESSAGE_STUDENT:
      return {
        ...state,
        message: {...state.message, current: {...action.payload}},
      };
    case GET_MESSAGE_LIST:
      return {
        ...state,
        message: {...state.message, list: {...action.payload}},
      };
    case RESET_MESSAGE_STUDENT:
      return {
        ...state,
        message: {...defaultState.message},
      };

    case SET_LIST_PERIOD:
      return {
        ...state,
        periods: action.payload,
      };
    case SET_LIST_SCHOOL_YEAR:
      return {
        ...state,
        schoolYears: action.payload,
      };
    case SET_LIST_TERM:
      return {
        ...state,
        terms: action.payload,
      };
    default:
      return state;
  }
}
