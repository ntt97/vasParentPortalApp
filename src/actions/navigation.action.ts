import {
  NAVIGATION_ROOT_WITH_SAGA,
  NAVIGATION_ROOT_SUCCESS,
  SELECTED_MENU,
} from 'constants/index';
import {PayloadAction} from 'types/types';

export interface NavigationState {
  name: string;
  selectedMenuIndex: number;
}
export interface PayloadNavigationRoot {
  name: string;
}
export interface PayloadSelectedMenuIndex {
  selectedMenuIndex: number;
}

export interface RootAction {
  type: string;
  payload: PayloadNavigationRoot;
}

const navigationRootAction = (
  payload: PayloadNavigationRoot,
): PayloadAction<string, PayloadNavigationRoot> => {
  return {
    type: NAVIGATION_ROOT_WITH_SAGA,
    payload,
  };
};

const navigationRootSuccess = (
  payload: PayloadNavigationRoot,
): PayloadAction<string, PayloadNavigationRoot> => {
  return {
    type: NAVIGATION_ROOT_SUCCESS,
    payload,
  };
};

const selectMenuIndex = (
  payload: PayloadSelectedMenuIndex,
): PayloadAction<string, PayloadSelectedMenuIndex> => {
  return {
    type: SELECTED_MENU,
    payload,
  };
};

export {navigationRootAction, selectMenuIndex, navigationRootSuccess};
