import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [],
};

const moveReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  scoredMovess: moveReducer,
});
