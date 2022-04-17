import { ICategory, IEnabledMoves, IPaddler } from "./reducers"
import { IStoreType } from "./store"

export const getScores = (state: IStoreType) => state.paddlers.paddlerScores

export const getScoresState = (state: IStoreType) =>
	state.paddlers.paddlerScores

export const getPaddlerHeatList = (state: IStoreType) =>
	state.paddlers.paddlerList
export const getNumberOfRuns = (state: IStoreType) =>
	state.paddlers.numberOfRuns
export const getCurrentRun = (state: IStoreType) => state.paddlers.currentRun
export const getCurrentHeat = (state: IStoreType) =>
	state.paddlers.currentHeat || getAvailableHeats(state)[0]
export const getShowRunHandler = (state: IStoreType) =>
	state.paddlers.showRunHandler
export const getShowTimer = (state: IStoreType) => state.paddlers.showTimer

export const getPaddlerIndex = (state: IStoreType) =>
	state.paddlers.paddlerIndex
export const getNumberOfPaddlersInHeat = (state: IStoreType) =>
	getPaddlersInHeat(state).length
export const getPaddlerScores = (state: IStoreType) =>
	state.paddlers.paddlerScores

export const getCurrentPaddler = (state: IStoreType): IPaddler =>
	getPaddlersInHeat(state)[state.paddlers.paddlerIndex]

export const getAvailableMovesForPaddler = (
	state: IStoreType
): IEnabledMoves => {
	const currentPaddler = getCurrentPaddler(state)
	if (currentPaddler && currentPaddler.category) {
		const availableMoves = state.paddlers.categories.find(
			(c) => c.name === currentPaddler.category
		)?.availableMoves
		if (availableMoves) {
			return availableMoves
		}
	}

	return {
		wave: true,
		hole: true,
		nfl: false
	}
}
export const getCategories = (state: IStoreType): ICategory[] =>
	state.paddlers.categories
export const getPaddlersInHeat = (state: IStoreType): IPaddler[] =>
	state.paddlers.paddlerList.filter(
		(p) => p.heat === state.paddlers.currentHeat // displayed heat numbers are not zero indexed
	)
export const getAvailableHeats = (state: IStoreType): number[] => {
	const allHeats = state.paddlers.heats

	return Array.from(new Set(allHeats))
}
