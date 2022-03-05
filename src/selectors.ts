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
