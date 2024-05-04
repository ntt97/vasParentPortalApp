import {
  NOTIFY_WITH_SAGA,
  NOTIFY_WITH_SAGA_SUCCESS,
  NOTIFY_WITH_SAGA_FAILED,
  CURRENT_NOTIFY_SAGA,
  CURRENT_NOTIFY_SAGA_SUCCESS,
  CURRENT_NOTIFY_SAGA_FAILED,
  NOTIFY_SET_LOADING,
  NOTIFY_SET_REFRESH,
  NOTIFY_SET_ICON,
} from 'constants/index';
import {PayloadAction} from 'types/types';

interface EventDetails {
  eventId: number;
  languageId: string;
  name: string;
  description: string;
}

interface EventSchools {
  id: number;
  yearGroup: {
    id: number | string;
    name: string;
  };
  gradeClass: {
    id: number | string;
    name: string;
  };
  campus: {
    id: number | string;
    name: string;
  };
  seen: boolean;
  parentId: string;
}
export interface DefaulPayload {
  id: number;
}

export interface PayloadNotifyList {
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  fileId: number | string;
  eventDetails: EventDetails[];
  eventType: {
    id: number;
    name: string;
  };
  eventSchools: EventSchools[];
}

export interface ParamsGetNotify {
  pagination: {
    page: number;
    limit: number;
  };
  refresh?: boolean;
  languageId: string;
}

export interface PayloadUpdateSeen {
  parentId: string;
  eventId: number;
}

const getAllNotifyWithSaga = (
  params: ParamsGetNotify,
): PayloadAction<string, ParamsGetNotify> => {
  return {
    type: NOTIFY_WITH_SAGA,
    payload: params,
  };
};

const setIconNotification = (value: number): PayloadAction<string, number> => {
  return {
    type: NOTIFY_SET_ICON,
    payload: value,
  };
};

const getCurrentNotify = (
  payload: DefaulPayload,
): PayloadAction<string, DefaulPayload> => {
  return {
    type: CURRENT_NOTIFY_SAGA,
    payload,
  };
};

const getCurrentNotifySuccess = (
  payload: PayloadNotifyList,
): PayloadAction<string, PayloadNotifyList> => {
  return {
    type: CURRENT_NOTIFY_SAGA_SUCCESS,
    payload,
  };
};

const getCurrentNotifyFailed = (): PayloadAction<string, null> => {
  return {
    type: CURRENT_NOTIFY_SAGA_FAILED,
    payload: null,
  };
};

interface NotifyGetSuccess {
  newEvents: PayloadNotifyList[];
  pagination: {
    page: number;
    limit: number;
  };
  languageId: string;
  eventNotSeen: false;
}

const getAllNotifyWithSagaSuccess = (
  payload: NotifyGetSuccess,
): PayloadAction<string, NotifyGetSuccess> => {
  return {
    type: NOTIFY_WITH_SAGA_SUCCESS,
    payload,
  };
};

const getAllNotifyWithSagaFailed = (): PayloadAction<string, null> => {
  return {
    type: NOTIFY_WITH_SAGA_FAILED,
    payload: null,
  };
};

const setRefreshNotify = (value: boolean): PayloadAction<string, boolean> => {
  return {
    type: NOTIFY_SET_REFRESH,
    payload: value,
  };
};

const setLoadingNotify = (value: boolean): PayloadAction<string, boolean> => {
  return {
    type: NOTIFY_SET_LOADING,
    payload: value,
  };
};

export {
  getAllNotifyWithSaga,
  getAllNotifyWithSagaSuccess,
  getAllNotifyWithSagaFailed,
  getCurrentNotify,
  getCurrentNotifySuccess,
  getCurrentNotifyFailed,
  setRefreshNotify,
  setLoadingNotify,
  setIconNotification,
};
