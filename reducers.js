import { ADD_OR_REMOVE_PADDLER, CHANGE_PADDLER, UPDATE_PADDLER_SCORES, UPDATE_SHOW_TIMER } from './actionTypes';
import { initialScoresheet } from './screens/mycomponents/makePaddlerScores';

// make our starting scoresheet from the list of paddlers
const listOfPaddlers = ["paddler1", "paddler2", "paddler3", "c1er"]
const startingScoresheet = {}
    listOfPaddlers.map((paddler) => {
         startingScoresheet[(paddler.toString())] = initialScoresheet()
    })


const initialState = {
  places: [],
  paddlerIndex: 0,
  paddlerList: listOfPaddlers,
  paddlerScores: startingScoresheet,
  showTimer: false
}



export const paddlerReducer = (state = initialState, action) => {
    switch(action.type) {
      case CHANGE_PADDLER:
        return ({
          ...state,
          paddlerIndex: action.payload
        });
      case ADD_OR_REMOVE_PADDLER:
        return ({
          ...state,
          paddlerList: action.payload
          
        });
      case UPDATE_PADDLER_SCORES:
        return ({
          ...state,
          paddlerScores: action.payload
          
        });
      case UPDATE_SHOW_TIMER:

        return ({
          ...state,
          showTimer: action.payload
          
        });
      default:
        return state;
    }
  }