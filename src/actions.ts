import {
	ADD_OR_REMOVE_CATEGORY,
	ADD_OR_REMOVE_HEATS,
	ADD_OR_REMOVE_PADDLER,
	CHANGE_HEAT,
	CHANGE_PADDLER,
	UPDATE_NUMBER_OF_RUNS,
	UPDATE_PADDLER_SCORES,
	UPDATE_RUN,
	UPDATE_SHOW_RUN,
	UPDATE_SHOW_TIMER
} from "./actionTypes"
import { ICategory, IPaddlerList, IPaddlerScores } from "./reducers"

export const changePaddler = (paddlerIndex: number) => {
	// Validate paddlerIndex is non-negative
	if (paddlerIndex < 0) {
		console.error(`changePaddler: Invalid paddlerIndex ${paddlerIndex}. Must be non-negative.`)

		return {
			type: CHANGE_PADDLER,
			payload: 0
		}
	}

	return {
		type: CHANGE_PADDLER,
		payload: paddlerIndex
	}
}
export const changeRun = (runIndex: number) => {
	// Validate runIndex is non-negative
	if (runIndex < 0) {
		console.error(`changeRun: Invalid runIndex ${runIndex}. Must be non-negative.`)

		return {
			type: UPDATE_RUN,
			payload: 0
		}
	}

	return {
		type: UPDATE_RUN,
		payload: runIndex
	}
}
export const changeNumberOfRuns = (maxRunIndex: number) => {
	// Validate maxRunIndex is non-negative
	if (maxRunIndex < 0) {
		console.error(`changeNumberOfRuns: Invalid maxRunIndex ${maxRunIndex}. Must be non-negative.`)

		return {
			type: UPDATE_NUMBER_OF_RUNS,
			payload: 0
		}
	}

	return {
		type: UPDATE_NUMBER_OF_RUNS,
		payload: maxRunIndex
	}
}

export const changeHeat = (newHeatIndex: number) => ({
	type: CHANGE_HEAT,
	payload: newHeatIndex
})
export const addOrRemovePaddlerName = (remainingPaddlers: IPaddlerList) => ({
	type: ADD_OR_REMOVE_PADDLER,
	payload: remainingPaddlers
})
export const addOrRemoveCategory = (remainingCategories: ICategory[]) => ({
	type: ADD_OR_REMOVE_CATEGORY,
	payload: remainingCategories
})
export const addOrRemoveHeat = (remainingHeats: number[]) => ({
	type: ADD_OR_REMOVE_HEATS,
	payload: remainingHeats
})
export const updatePaddlerScores = (newPaddlerScores: IPaddlerScores) => ({
	type: UPDATE_PADDLER_SCORES,
	payload: newPaddlerScores
})
export const updateShowTimer = (newShowTimer: boolean) => ({
	type: UPDATE_SHOW_TIMER,
	payload: newShowTimer
})
export const updateShowRun = (newShowRun: boolean) => ({
	type: UPDATE_SHOW_RUN,
	payload: newShowRun
})
