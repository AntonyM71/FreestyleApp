import { INCREMENT_SCORE } from './actionTypes';

const initialState = {
  score: 0,
  places: []
};

const scoreReducer = (state = initialState, action) => {
  switch(action.type) {
    case INCREMENT_SCORE:
      return {
        ...state,
        score: action.payload
      };
    default:
      return state;
  }
}

export default scoreReducer;