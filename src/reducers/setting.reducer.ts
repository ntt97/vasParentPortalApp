import { GET_TIME_RECALL_SUCCESS } from '@constants/index';
import { PayloadAction } from 'types/types';

export interface SettingState {
  timeRecall: number;
}
const defaultState: SettingState = {
  timeRecall: 30,
};

export default function settingReducer(
  state: SettingState = defaultState,
  action: PayloadAction<string, SettingState>,
) {
  switch (action.type) {
    case GET_TIME_RECALL_SUCCESS:
      return { ...state, timeRecall: action.payload.timeRecall };
    default:
      return state;
  }
}
