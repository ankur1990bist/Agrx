import {TASK_DATA} from './ActionTypes';

export const getTaskData = (data) => {
  return async (dispatch) => {
    dispatch({type: TASK_DATA, payload: data});
  };
};
