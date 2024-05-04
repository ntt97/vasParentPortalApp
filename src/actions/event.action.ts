import {
  EVENT_WITH_SAGA,
  EVENT_WITH_SAGA_SUCCESS,
  EVENT_WITH_SAGA_FAILED,
  EVENT_SET_REFRESH,
  EVENT_SET_LOADING,
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
}

export interface PayloadEventList {
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  approvedAt: string;
  id: number;
  fileId: number | string;
  eventDetails: EventDetails[];
  eventType: {
    id: number;
    name: string;
  };
  eventSchools: EventSchools[];
}

export interface ParamsGetEvent {
  pagination: {
    page: number;
    limit: number;
  };
  refresh?: boolean;
  languageId: string;
  eventTypeId?: string;
}

const getAllEventWithSaga = (
  params: ParamsGetEvent,
): PayloadAction<string, ParamsGetEvent> => {
  return {
    type: EVENT_WITH_SAGA,
    payload: params,
  };
};

interface EventGetSuccess {
  newEvents: PayloadEventList[];
  pagination: {
    page: number;
    limit: number;
  };
  languageId: string;
}

const getAllEventWithSagaSuccess = (
  payload: EventGetSuccess,
): PayloadAction<string, EventGetSuccess> => {
  return {
    type: EVENT_WITH_SAGA_SUCCESS,
    payload,
  };
};

const getAllEventWithSagaFailed = (): PayloadAction<string, null> => {
  return {
    type: EVENT_WITH_SAGA_FAILED,
    payload: null,
  };
};

const setRefreshAnnoucement = (
  value: boolean,
): PayloadAction<string, boolean> => {
  return {
    type: EVENT_SET_REFRESH,
    payload: value,
  };
};

const setLoadingEvent = (value: boolean): PayloadAction<string, boolean> => {
  return {
    type: EVENT_SET_LOADING,
    payload: value,
  };
};

export {
  getAllEventWithSaga,
  getAllEventWithSagaSuccess,
  getAllEventWithSagaFailed,
  setRefreshAnnoucement,
  setLoadingEvent,
};
