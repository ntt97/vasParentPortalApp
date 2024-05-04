import { PayloadNotifyList } from '@actions/notification.action';
import {
  CURRENT_NOTIFY_SAGA_FAILED,
  CURRENT_NOTIFY_SAGA_SUCCESS,
  NOTIFY_SET_ICON,
  NOTIFY_SET_LOADING,
  NOTIFY_SET_REFRESH,
  NOTIFY_WITH_SAGA,
  NOTIFY_WITH_SAGA_FAILED,
  NOTIFY_WITH_SAGA_SUCCESS,
} from '@constants/index';
import { PayloadAction } from 'types/types';

export interface NotifyState {
  eventNotSeen: number;
  listNotify: PayloadNotifyList[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
  };
  endData: boolean;
  current: Object;
  refreshing: boolean;
}

const defaultState: NotifyState = {
  eventNotSeen: 0,
  listNotify: [],
  loading: true,
  pagination: {
    page: 1,
    limit: 10,
  },
  endData: false,
  current: {},
  refreshing: false,
};
export default function notifyReducer(state: NotifyState = defaultState, action: PayloadAction<string, any>) {
  switch (action.type) {
    case NOTIFY_WITH_SAGA:
      return {
        ...state,
        loading: true,
        listNotify: action.payload.refresh ? [] : [...state.listNotify],
      };
    case NOTIFY_WITH_SAGA_SUCCESS:
      const { newEvents, pagination, eventNotSeen } = action.payload;
      return {
        ...state,
        listNotify: [...state.listNotify, ...newEvents],
        pagination: { ...pagination },
        endData: newEvents.length !== 10,
        eventNotSeen: eventNotSeen,
        refreshing: false,
      };
    case NOTIFY_WITH_SAGA_FAILED: {
      return {
        ...state,
        listNotify: [],
        loading: false,
      };
    }

    case NOTIFY_SET_ICON: {
      return {
        ...state,
        eventNotSeen: action.payload <= 0 ? 0 : action.payload,
      };
    }

    case CURRENT_NOTIFY_SAGA_SUCCESS: {
      const tempListNotify = [...state.listNotify];
      for (let i = 0; i < tempListNotify.length; i++) {
        if (tempListNotify[i].id === action.payload.id) {
          tempListNotify[i].eventSchools[0].seen = true;
          break;
        }
      }
      return {
        ...state,
        listNotify: tempListNotify,
        current: action.payload,
      };
    }
    case CURRENT_NOTIFY_SAGA_FAILED: {
      return {
        ...state,
        current: {},
      };
    }

    case NOTIFY_SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case NOTIFY_SET_REFRESH: {
      return {
        ...state,
        refreshing: action.payload,
      };
    }

    default:
      return state;
  }
}
