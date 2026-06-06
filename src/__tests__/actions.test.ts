import {
	changePaddler,
	changeRun,
	changeNumberOfRuns,
	changeHeat,
	addOrRemovePaddlerName,
	addOrRemoveCategory,
	addOrRemoveHeat,
	updatePaddlerScores,
	updateShowTimer,
	updateShowRun
} from "../actions"
import {
	CHANGE_PADDLER,
	UPDATE_RUN,
	UPDATE_NUMBER_OF_RUNS,
	CHANGE_HEAT,
	ADD_OR_REMOVE_PADDLER,
	ADD_OR_REMOVE_CATEGORY,
	ADD_OR_REMOVE_HEATS,
	UPDATE_PADDLER_SCORES,
	UPDATE_SHOW_TIMER,
	UPDATE_SHOW_RUN
} from "../actionTypes"

describe("actions", () => {
	it("changePaddler returns correct action", () => {
		expect(changePaddler(2)).toEqual({ type: CHANGE_PADDLER, payload: 2 })
	})

	it("changeRun returns correct action", () => {
		expect(changeRun(3)).toEqual({ type: UPDATE_RUN, payload: 3 })
	})

	it("changeNumberOfRuns returns correct action", () => {
		expect(changeNumberOfRuns(5)).toEqual({
			type: UPDATE_NUMBER_OF_RUNS,
			payload: 5
		})
	})

	it("changeHeat returns correct action", () => {
		expect(changeHeat(2)).toEqual({ type: CHANGE_HEAT, payload: 2 })
	})

	it("addOrRemovePaddlerName returns correct action", () => {
		const paddlers = [{ name: "Alice", category: "Novice", heat: 1 }]
		expect(addOrRemovePaddlerName(paddlers)).toEqual({
			type: ADD_OR_REMOVE_PADDLER,
			payload: paddlers
		})
	})

	it("addOrRemoveCategory returns correct action", () => {
		const categories = [
			{ name: "Novice", availableMoves: { hole: true, wave: false, nfl: false } }
		]
		expect(addOrRemoveCategory(categories)).toEqual({
			type: ADD_OR_REMOVE_CATEGORY,
			payload: categories
		})
	})

	it("addOrRemoveHeat returns correct action", () => {
		const heats = [1, 2, 3]
		expect(addOrRemoveHeat(heats)).toEqual({
			type: ADD_OR_REMOVE_HEATS,
			payload: heats
		})
	})

	it("updatePaddlerScores returns correct action", () => {
		const scores = { Alice: [] as any }
		expect(updatePaddlerScores(scores)).toEqual({
			type: UPDATE_PADDLER_SCORES,
			payload: scores
		})
	})

	it("updateShowTimer returns correct action", () => {
		expect(updateShowTimer(true)).toEqual({
			type: UPDATE_SHOW_TIMER,
			payload: true
		})
		expect(updateShowTimer(false)).toEqual({
			type: UPDATE_SHOW_TIMER,
			payload: false
		})
	})

	it("updateShowRun returns correct action", () => {
		expect(updateShowRun(true)).toEqual({ type: UPDATE_SHOW_RUN, payload: true })
		expect(updateShowRun(false)).toEqual({
			type: UPDATE_SHOW_RUN,
			payload: false
		})
	})
})
