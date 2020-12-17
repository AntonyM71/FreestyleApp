import { ADD_OR_REMOVE_PADDLER, CHANGE_HEAT, CHANGE_PADDLER, UPDATE_NUMBER_OF_RUNS, UPDATE_PADDLER_SCORES, UPDATE_RUN, UPDATE_SHOW_RUN, UPDATE_SHOW_TIMER, ENABLED_MOVES } from "./actionTypes";
import { initialScoresheet } from "./screens/mycomponents/makePaddlerScores";

// make our starting scoresheet from the list of paddlers
const listOfPaddlers = [["paddler1", "paddler2", "paddler3"]];
const startingScoresheet = {};
listOfPaddlers.flat().map(paddler => {
  startingScoresheet[paddler.toString()] = [initialScoresheet()];
});

const initialState: initialStateInterface = {
  places: [],
  paddlerIndex: 0,
  paddlerList: listOfPaddlers,
  paddlerScores: startingScoresheet,
  showTimer: false,
  currentHeat: 0,
  run: 0,
  numberOfRuns: 0,
  showRunHandler: true,
  enabledMoves: {wave: true, hole: true}
};

export const paddlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PADDLER:
      return {
        ...state,
        paddlerIndex: action.payload
      };
    case CHANGE_HEAT:
      return {
        ...state,
        currentHeat: action.payload
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
    case UPDATE_RUN:
      return {
        ...state,
        run: action.payload
      };
    case UPDATE_NUMBER_OF_RUNS:
      return {
        ...state,
        numberOfRuns: action.payload
      };
    case UPDATE_SHOW_TIMER:
      return {
        ...state,
        showTimer: action.payload
      };
    case UPDATE_SHOW_RUN:
      return {
        ...state,
        showRunHandler: action.payload
      };
    case ENABLED_MOVES:
      return {
        ...state,
        enabledMoves: action.payload
      };
    default:
      return state;
  }
};

interface initialStateInterface {
  places: [],
  paddlerIndex: number,
  paddlerList: string[][],
  paddlerScores: any,
  showTimer: boolean,
  currentHeat: number,
  run: number,
  numberOfRuns: number,
  showRunHandler: boolean,
  enabledMoves: { wave: boolean, hole: boolean }
}