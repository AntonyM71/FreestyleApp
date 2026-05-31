import { createSelector } from "reselect"
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
export const getCurrentHeat = (state: IStoreType) => {
	const availableHeats = getAvailableHeats(state)
	if (availableHeats.length === 0) {
		return state.paddlers.currentHeat
	}

	if (availableHeats.includes(state.paddlers.currentHeat)) {
		return state.paddlers.currentHeat
	}

	return availableHeats[0] || 0
}
export const getShowRunHandler = (state: IStoreType) =>
	state.paddlers.showRunHandler
export const getShowTimer = (state: IStoreType) => state.paddlers.showTimer

export const getPaddlerIndex = (state: IStoreType) =>
	state.paddlers.paddlerIndex
export const getNumberOfPaddlersInHeat = (state: IStoreType) =>
	getPaddlersInHeat(state).length
export const getPaddlerScores = (state: IStoreType) =>
	state.paddlers.paddlerScores

export const getCurrentPaddler = (state: IStoreType): IPaddler | undefined => {
	const paddlersInHeat = getPaddlersInHeat(state)
	const index = state.paddlers.paddlerIndex

	// Bounds check: ensure index is within valid range
	if (index < 0 || index >= paddlersInHeat.length) {
		return undefined
	}

	return paddlersInHeat[index]
}

export const getAvailableMovesForPaddler = (
	state: IStoreType
): IEnabledMoves => {
	const currentPaddler = getCurrentPaddler(state)

	// Check if currentPaddler exists before accessing properties
	if (!currentPaddler) {
		console.warn(
			"getAvailableMovesForPaddler: No current paddler found. Returning default moves."
		)

		return {
			wave: true,
			hole: true,
			nfl: false
		}
	}

	if (currentPaddler.category) {
		const availableMoves = state.paddlers.categories.find(
			(c) => c.name === currentPaddler.category
		)?.availableMoves
		if (availableMoves) {
			return availableMoves
		}

		// Log when category not found - indicates data inconsistency
		console.warn(
			`getAvailableMovesForPaddler: Category "${currentPaddler.category}" not found ` +
			`for paddler "${currentPaddler.name}". Using defaults.`
		)
	}

	return {
		wave: true,
		hole: true,
		nfl: false
	}
}
export const getCategories = (state: IStoreType): ICategory[] =>
	state.paddlers.categories
export const getPaddlersInHeat = (state: IStoreType): IPaddler[] => {
	const currentHeat = getCurrentHeat(state)

	return state.paddlers.paddlerList.filter(
		(p) => p.heat === currentHeat // displayed heat numbers are not zero indexed
	)
}

const selectPaddlerHeats = (state: IStoreType) => state.paddlers.heats

export const getAvailableHeats = createSelector(
	selectPaddlerHeats,
	(allHeats) =>
		// do something with a, b, and c, and return a result
		Array.from(new Set(allHeats))
)
// export const getAvailableHeats = (state: IStoreType): number[] => {
// 	const allHeats = state.paddlers.heats

// 	return Array.from(new Set(allHeats))
// }
