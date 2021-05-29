import {CURRENT_CHANNEL_DATA} from '../actions/ActionTypes';
// import {REHYDRATE} from 'redux-persist';

const initialState = {
  currentChannel: [],
};

export default function myChannels(state = initialState, action) {
  switch (action.type) {
    // case REHYDRATE:
    //     return action.payload || initialState
    case CURRENT_CHANNEL_DATA:
      return {...state, currentChannel: action.payload};

    default:
      return state;
  }
}
