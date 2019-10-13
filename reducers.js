import { ADD_OR_REMOVE_PADDLER, CHANGE_PADDLER, UPDATE_PADDLER_SCORES } from './actionTypes';

const initialState = {
    score: 0,
    places: [],
    paddlerIndex: 0,
    paddlerList: ["paddler1", "paddler2", "paddler3", "c1er"],
    paddlerScores :{}
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
      case UPDATE_PADDLER_SCORES:
        return {
          ...state,
          paddlerScores: action.payload
          
        };
      default:
        return state;
    }
  }