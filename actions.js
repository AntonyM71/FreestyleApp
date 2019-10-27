import { ADD_OR_REMOVE_PADDLER, CHANGE_HEAT, CHANGE_PADDLER, UPDATE_NUMBER_OF_RUNS, UPDATE_PADDLER_SCORES, UPDATE_RUN, UPDATE_SHOW_TIMER, UPDATE_SHOW_RUN } from "./actionTypes";

export const changePaddler = paddlerIndex => {
  return {
    type: CHANGE_PADDLER,
    payload: paddlerIndex
  };
};
export const changeRun = runIndex => {
  return {
    type: UPDATE_RUN,
    payload: runIndex
  };
};
export const changeNumberOfRuns = maxRunIndex => {
  return {
    type: UPDATE_NUMBER_OF_RUNS,
    payload: maxRunIndex
  };
};

export const changeHeat = newHeat => {
  return {
    type: CHANGE_HEAT,
    payload: newHeat
  };
};
export const addOrRemovePaddlerName = remainingPaddlers => {
  return {
    type: ADD_OR_REMOVE_PADDLER,
    payload: remainingPaddlers
  };
};

export const updatePaddlerScores = newPaddlerScores => {
  return {
    type: UPDATE_PADDLER_SCORES,
    payload: newPaddlerScores
  };
};
export const updateShowTimer = newShowTimer => {
  return {
    type: UPDATE_SHOW_TIMER,
    payload: newShowTimer
  };
}
export const updateShowRun = newShowRun => {
  return {
    type: UPDATE_SHOW_RUN,
    payload: newShowRun
  };
};
