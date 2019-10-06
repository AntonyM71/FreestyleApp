import { ADD_OR_REMOVE_PADDLER, CHANGE_PADDLER, INCREMENT_SCORE } from './actionTypes';

const initialState = {
    score: 0,
    places: [],
    paddlerIndex: 0,
    paddlerList: ["paddler1", "paddler2", "paddler3","c1er"]
}

export const scoreReducer = (state = initialState, action) => {
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

export const paddlerReducer = (state = initialState, action) => {
    switch(action.type) {
      case CHANGE_PADDLER:
        return {
          ...state,
          paddlerIndex: action.payload
        };
      case ADD_OR_REMOVE_PADDLER:
        return {
          ...state,
          paddlerList: action.payload
        };
      default:
        return state;
    }
  }