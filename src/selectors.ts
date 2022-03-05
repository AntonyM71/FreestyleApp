import { IStoreType } from "./store"

const getScores = (state: IStoreType) => state.paddlers.paddlerScores

export const getScoresState = (state: IStoreType) => {
	return state.paddlers.paddlerScores
}

export const getPaddlerHeatList = (state: IStoreType) => {
	return state.paddlers.paddlerList
}
export const getNumberOfRuns = (state: IStoreType) => {
	return state.paddlers.numberOfRuns
}
export const getCurrentRun = (state: IStoreType) => {
	return state.paddlers.currentRun
}
export const getCurrentHeat = (state: IStoreType) => {
	return state.paddlers.currentHeat
}
export const getShowRunHandler = (state: IStoreType) => {
	return state.paddlers.showRunHandler
}
export const getShowTimer = (state: IStoreType) => {
	return state.paddlers.showTimer
}

export const getPaddlerIndex = (state: IStoreType) => {
	return state.paddlers.paddlerIndex
}
export const getNumberOfPaddlers = (state: IStoreType) => {
	return state.paddlers.paddlerList[state.paddlers.currentHeat].length
}
export const getPaddlerScores = (state: IStoreType) => {
	return state.paddlers.paddlerScores
}
export const getShowMoves = (state: IStoreType) => {
	return state.paddlers.enabledMoves
}
