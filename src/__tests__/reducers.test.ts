import { paddlerReducer, IPaddlerStateType } from "../reducers"
import {
	CHANGE_PADDLER,
	CHANGE_HEAT,
	ADD_OR_REMOVE_PADDLER,
	UPDATE_PADDLER_SCORES,
	UPDATE_RUN,
	UPDATE_NUMBER_OF_RUNS,
	UPDATE_SHOW_TIMER,
	UPDATE_SHOW_RUN,
	ADD_OR_REMOVE_CATEGORY,
	ADD_OR_REMOVE_HEATS
} from "../actionTypes"

// Minimal initial state for reducer tests
const baseState: IPaddlerStateType = {
	places: [],
	paddlerIndex: 0,
	paddlerList: [],
	paddlerScores: {},
	showTimer: false,
	currentHeat: 1,
	currentRun: 0,
	numberOfRuns: 0,
	showRunHandler: true,
	categories: [],
	heats: [1]
}

describe("paddlerReducer", () => {
	it("returns the default state when called with unknown action", () => {
		const state = paddlerReducer(baseState, { type: "UNKNOWN", payload: null })
		expect(state).toEqual(baseState)
	})

	it("handles CHANGE_PADDLER", () => {
		const state = paddlerReducer(baseState, {
			type: CHANGE_PADDLER,
			payload: 3
		})
		expect(state.paddlerIndex).toBe(3)
	})

	it("handles CHANGE_HEAT", () => {
		const state = paddlerReducer(baseState, { type: CHANGE_HEAT, payload: 2 })
		expect(state.currentHeat).toBe(2)
	})

	it("handles ADD_OR_REMOVE_PADDLER", () => {
		const newList = [{ name: "Alice", category: "Novice", heat: 1 }]
		const state = paddlerReducer(baseState, {
			type: ADD_OR_REMOVE_PADDLER,
			payload: newList
		})
		expect(state.paddlerList).toEqual(newList)
	})

	it("handles UPDATE_PADDLER_SCORES", () => {
		const scores = { Alice: [] as any }
		const state = paddlerReducer(baseState, {
			type: UPDATE_PADDLER_SCORES,
			payload: scores
		})
		expect(state.paddlerScores).toEqual(scores)
	})

	it("handles UPDATE_RUN", () => {
		const state = paddlerReducer(baseState, { type: UPDATE_RUN, payload: 2 })
		expect(state.currentRun).toBe(2)
	})

	it("handles UPDATE_NUMBER_OF_RUNS", () => {
		const state = paddlerReducer(baseState, {
			type: UPDATE_NUMBER_OF_RUNS,
			payload: 4
		})
		expect(state.numberOfRuns).toBe(4)
	})

	it("handles UPDATE_SHOW_TIMER", () => {
		const state = paddlerReducer(baseState, {
			type: UPDATE_SHOW_TIMER,
			payload: true
		})
		expect(state.showTimer).toBe(true)
	})

	it("handles UPDATE_SHOW_RUN", () => {
		const state = paddlerReducer(baseState, {
			type: UPDATE_SHOW_RUN,
			payload: false
		})
		expect(state.showRunHandler).toBe(false)
	})

	it("handles ADD_OR_REMOVE_CATEGORY", () => {
		const categories = [
			{ name: "Expert", availableMoves: { hole: true, wave: true, nfl: false } }
		]
		const state = paddlerReducer(baseState, {
			type: ADD_OR_REMOVE_CATEGORY,
			payload: categories
		})
		expect(state.categories).toEqual(categories)
	})

	it("handles ADD_OR_REMOVE_HEATS", () => {
		const heats = [1, 2, 3]
		const state = paddlerReducer(baseState, {
			type: ADD_OR_REMOVE_HEATS,
			payload: heats
		})
		expect(state.heats).toEqual(heats)
	})

	it("does not mutate the previous state", () => {
		const frozen = Object.freeze({ ...baseState })
		expect(() =>
			paddlerReducer(frozen, { type: CHANGE_PADDLER, payload: 5 })
		).not.toThrow()
	})
})
