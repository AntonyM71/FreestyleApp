import {
    ADD_OR_REMOVE_PADDLER,
    CHANGE_HEAT,
    CHANGE_PADDLER, ENABLED_MOVES, UPDATE_NUMBER_OF_RUNS,
    UPDATE_PADDLER_SCORES,
    UPDATE_RUN,
    UPDATE_SHOW_RUN,
    UPDATE_SHOW_TIMER
} from "./actionTypes";
import { IEnabledMoves } from "./reducers";

export const changePaddler = (paddlerIndex: number) => ({
    type: CHANGE_PADDLER,
    payload: paddlerIndex,
});
export const changeRun = (runIndex: number) => ({
    type: UPDATE_RUN,
    payload: runIndex,
});
export const changeNumberOfRuns = (maxRunIndex: number) => ({
    type: UPDATE_NUMBER_OF_RUNS,
    payload: maxRunIndex,
});

export const changeHeat = (newHeatIndex: number) => ({
    type: CHANGE_HEAT,
    payload: newHeatIndex,
});
export const addOrRemovePaddlerName = (remainingPaddlers: any) => ({
    type: ADD_OR_REMOVE_PADDLER,
    payload: remainingPaddlers,
});

export const updatePaddlerScores = (newPaddlerScores: any) => ({
    type: UPDATE_PADDLER_SCORES,
    payload: newPaddlerScores,
});
export const updateShowTimer = (newShowTimer: boolean) => ({
    type: UPDATE_SHOW_TIMER,
    payload: newShowTimer,
});
export const updateShowRun = (newShowRun: boolean) => ({
    type: UPDATE_SHOW_RUN,
    payload: newShowRun,
});
export const enabledMoves = (moves: IEnabledMoves) => ({
    type: ENABLED_MOVES,
    payload: moves,
});
