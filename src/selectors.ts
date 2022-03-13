import { IStoreType } from "./store"

const getScores = (state: IStoreType) => state.paddlers.paddlerScores

export const getScoresState = (state: IStoreType) => state.paddlers.paddlerScores

export const getPaddlerHeatList = (state: IStoreType) => state.paddlers.paddlerList
export const getNumberOfRuns = (state: IStoreType) => state.paddlers.numberOfRuns
export const getCurrentRun = (state: IStoreType) => state.paddlers.currentRun
export const getCurrentHeat = (state: IStoreType) => state.paddlers.currentHeat
export const getShowRunHandler = (state: IStoreType) => state.paddlers.showRunHandler
export const getShowTimer = (state: IStoreType) => state.paddlers.showTimer

export const getPaddlerIndex = (state: IStoreType) => state.paddlers.paddlerIndex
export const getNumberOfPaddlers = (state: IStoreType) => state.paddlers.paddlerList[state.paddlers.currentHeat].length
export const getPaddlerScores = (state: IStoreType) => state.paddlers.paddlerScores
export const getShowMoves = (state: IStoreType) => state.paddlers.enabledMoves
