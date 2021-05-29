import {DARK_MODE} from '../actions/ActionTypes';
// import { REHYDRATE } from "redux-persist";

const initialState = {
  isDark: false,
};

export default function agrxTheme(state = initialState, action) {
  switch (action.type) {
    case DARK_MODE:
      return {...state, isDark: action.payload};

    default:
      return state;
  }
}
