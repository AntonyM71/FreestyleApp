import {
    ADD_OR_REMOVE_PADDLER,
    CHANGE_HEAT,
    CHANGE_PADDLER,
    UPDATE_NUMBER_OF_RUNS,
    UPDATE_PADDLER_SCORES,
    UPDATE_RUN,
    UPDATE_SHOW_RUN,
    UPDATE_SHOW_TIMER,
    ENABLED_MOVES,
} from "./actionTypes";

export const changePaddler = (paddlerIndex: any) => ({
    type: CHANGE_PADDLER,
    payload: paddlerIndex,
});
export const changeRun = (runIndex: any) => ({
    type: UPDATE_RUN,
    payload: runIndex,
});
export const changeNumberOfRuns = (maxRunIndex: any) => ({
    type: UPDATE_NUMBER_OF_RUNS,
    payload: maxRunIndex,
});

export const changeHeat = (newHeat: any) => ({
    type: CHANGE_HEAT,
    payload: newHeat,
});
export const addOrRemovePaddlerName = (remainingPaddlers: any) => ({
    type: ADD_OR_REMOVE_PADDLER,
    payload: remainingPaddlers,
});

export const updatePaddlerScores = (newPaddlerScores: any) => ({
    type: UPDATE_PADDLER_SCORES,
    payload: newPaddlerScores,
});
export const updateShowTimer = (newShowTimer: any) => ({
    type: UPDATE_SHOW_TIMER,
    payload: newShowTimer,
});
export const updateShowRun = (newShowRun: any) => ({
    type: UPDATE_SHOW_RUN,
    payload: newShowRun,
});
export const enabledMoves = (moves: any) => ({
    type: ENABLED_MOVES,
    payload: moves,
});
