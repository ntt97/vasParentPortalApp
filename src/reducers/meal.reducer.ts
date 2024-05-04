import {GET_MEAL_BY_DAY_SUCCESS, GET_MEAL_BY_DAY_FAILED} from 'constants/index';

export interface MealState {
  data: object;
  status: number;
  message: string;
}

const defaultState = {
  data: {},
  status: 1,
  message: '',
};

export default function MealReducer(
  state: MealState = defaultState,
  action: any,
) {
  switch (action.type) {
    case GET_MEAL_BY_DAY_SUCCESS:
      return {...state, data: action.payload, status: 1, message: ''};
    case GET_MEAL_BY_DAY_FAILED:
      state = defaultState;
      return {...state, status: 0, message: action.payload};
    default:
      return state;
  }
}
