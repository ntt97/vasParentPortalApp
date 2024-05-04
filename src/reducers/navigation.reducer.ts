import {
  PayloadNavigationRoot,
  PayloadSelectedMenuIndex,
  NavigationState,
} from '../actions/navigation.action';
import {
  NAVIGATION_ROOT_SUCCESS,
  RESET_ALL_STATE,
  SELECTED_MENU,
} from 'constants/index';
import {PayloadAction} from 'types/types';

const defaultState: NavigationState = {
  name: '',
  selectedMenuIndex: 0,
};

type Payload = PayloadNavigationRoot | PayloadSelectedMenuIndex;
export default function navigationReducer(
  state: NavigationState = defaultState,
  action: PayloadAction<string, Payload>,
): PayloadNavigationRoot {
  switch (action.type) {
    case RESET_ALL_STATE:
      return defaultState;
    case NAVIGATION_ROOT_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SELECTED_MENU: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
