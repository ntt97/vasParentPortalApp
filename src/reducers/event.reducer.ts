import {
  EVENT_WITH_SAGA_SUCCESS,
  EVENT_WITH_SAGA_FAILED,
  EVENT_WITH_SAGA,
  EVENT_SET_REFRESH,
  EVENT_SET_LOADING,
} from 'constants/index';
import {PayloadAction} from 'types/types';
import {PayloadEventList} from '@actions/event.action';

export interface EventState {
  listEvent: PayloadEventList[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
  };
  endData: boolean;
  refreshing: boolean;
}

const defaultState: EventState = {
  listEvent: [],
  loading: true,
  pagination: {
    page: 1,
    limit: 10,
  },
  endData: false,
  refreshing: false,
};
export default function eventReducer(
  state: EventState = defaultState,
  action: PayloadAction<string, any>,
) {
  switch (action.type) {
    case EVENT_WITH_SAGA:
      return {
        ...state,
        loading: true,
        listEvent: action.payload.refresh ? [] : [...state.listEvent],
      };
    case EVENT_WITH_SAGA_SUCCESS:
      const {newEvents, pagination} = action.payload;

      return {
        ...state,
        listEvent: [...state.listEvent, ...newEvents],

        pagination: {...pagination},
        endData: newEvents.length !== 10,
        refreshing: false,
      };
    case EVENT_WITH_SAGA_FAILED: {
      return {
        ...state,
        listEvent: [],
        loading: false,
      };
    }
    case EVENT_SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case EVENT_SET_REFRESH: {
      return {
        ...state,
        refreshing: action.payload,
      };
    }
    default:
      return state;
  }
}
