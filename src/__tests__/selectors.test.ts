import {
	getScores,
	getScoresState,
	getPaddlerHeatList,
	getNumberOfRuns,
	getCurrentRun,
	getCurrentHeat,
	getShowRunHandler,
	getShowTimer,
	getPaddlerIndex,
	getNumberOfPaddlersInHeat,
	getPaddlerScores,
	getCurrentPaddler,
	getAvailableMovesForPaddler,
	getCategories,
	getPaddlersInHeat,
	getAvailableHeats
} from "../selectors"
import { IStoreType } from "../store"

// Helper to build a minimal store state
const makeState = (overrides: Partial<IStoreType["paddlers"]> = {}): IStoreType => ({
	paddlers: {
		places: [],
		paddlerIndex: 0,
		paddlerList: [
			{ name: "Alice", category: "Novice", heat: 1 },
			{ name: "Bob", category: "Expert", heat: 1 },
			{ name: "Carol", category: "Novice", heat: 2 }
		],
		paddlerScores: { Alice: [] as any, Bob: [] as any, Carol: [] as any },
		showTimer: false,
		currentHeat: 1,
		currentRun: 0,
		numberOfRuns: 2,
		showRunHandler: true,
		categories: [
			{ name: "Novice", availableMoves: { hole: false, wave: true, nfl: false } },
			{ name: "Expert", availableMoves: { hole: true, wave: true, nfl: true } }
		],
		heats: [1, 2],
		...overrides
	}
})

describe("selectors", () => {
	describe("getScores / getScoresState", () => {
		it("returns paddlerScores", () => {
			const state = makeState()
			expect(getScores(state)).toBe(state.paddlers.paddlerScores)
			expect(getScoresState(state)).toBe(state.paddlers.paddlerScores)
		})
	})

	describe("getPaddlerHeatList", () => {
		it("returns the full paddler list", () => {
			const state = makeState()
			expect(getPaddlerHeatList(state)).toEqual(state.paddlers.paddlerList)
		})
	})

	describe("getNumberOfRuns", () => {
		it("returns numberOfRuns", () => {
			const state = makeState({ numberOfRuns: 3 })
			expect(getNumberOfRuns(state)).toBe(3)
		})
	})

	describe("getCurrentRun", () => {
		it("returns currentRun", () => {
			const state = makeState({ currentRun: 1 })
			expect(getCurrentRun(state)).toBe(1)
		})
	})

	describe("getCurrentHeat", () => {
		it("returns currentHeat when it is in the available heats list", () => {
			const state = makeState({ currentHeat: 2, heats: [1, 2] })
			expect(getCurrentHeat(state)).toBe(2)
		})

		it("falls back to the first available heat when currentHeat is not in the list", () => {
			const state = makeState({ currentHeat: 99, heats: [1, 2] })
			expect(getCurrentHeat(state)).toBe(1)
		})

		it("returns currentHeat unchanged when the heats list is empty", () => {
			const state = makeState({ currentHeat: 5, heats: [] })
			expect(getCurrentHeat(state)).toBe(5)
		})
	})

	describe("getShowRunHandler", () => {
		it("returns showRunHandler", () => {
			const state = makeState({ showRunHandler: false })
			expect(getShowRunHandler(state)).toBe(false)
		})
	})

	describe("getShowTimer", () => {
		it("returns showTimer", () => {
			const state = makeState({ showTimer: true })
			expect(getShowTimer(state)).toBe(true)
		})
	})

	describe("getPaddlerIndex", () => {
		it("returns paddlerIndex", () => {
			const state = makeState({ paddlerIndex: 2 })
			expect(getPaddlerIndex(state)).toBe(2)
		})
	})

	describe("getPaddlersInHeat", () => {
		it("returns only paddlers whose heat matches currentHeat", () => {
			const state = makeState({ currentHeat: 1 })
			const result = getPaddlersInHeat(state)
			expect(result).toEqual([
				{ name: "Alice", category: "Novice", heat: 1 },
				{ name: "Bob", category: "Expert", heat: 1 }
			])
		})

		it("returns paddlers for a different heat", () => {
			const state = makeState({ currentHeat: 2 })
			const result = getPaddlersInHeat(state)
			expect(result).toEqual([
				{ name: "Carol", category: "Novice", heat: 2 }
			])
		})
	})

	describe("getNumberOfPaddlersInHeat", () => {
		it("returns count of paddlers in the current heat", () => {
			const state = makeState({ currentHeat: 1 })
			expect(getNumberOfPaddlersInHeat(state)).toBe(2)
		})

		it("returns 0 when there are no paddlers in the current heat", () => {
			const state = makeState({ currentHeat: 3, heats: [1, 2, 3] })
			expect(getNumberOfPaddlersInHeat(state)).toBe(0)
		})
	})

	describe("getPaddlerScores", () => {
		it("returns paddlerScores", () => {
			const state = makeState()
			expect(getPaddlerScores(state)).toBe(state.paddlers.paddlerScores)
		})
	})

	describe("getCurrentPaddler", () => {
		it("returns the paddler at paddlerIndex within the current heat", () => {
			const state = makeState({ paddlerIndex: 0, currentHeat: 1 })
			expect(getCurrentPaddler(state)).toEqual({
				name: "Alice",
				category: "Novice",
				heat: 1
			})
		})

		it("returns the second paddler when paddlerIndex is 1", () => {
			const state = makeState({ paddlerIndex: 1, currentHeat: 1 })
			expect(getCurrentPaddler(state)).toEqual({
				name: "Bob",
				category: "Expert",
				heat: 1
			})
		})
	})

	describe("getCategories", () => {
		it("returns the categories array", () => {
			const state = makeState()
			expect(getCategories(state)).toEqual(state.paddlers.categories)
		})
	})

	describe("getAvailableMovesForPaddler", () => {
		it("returns moves for the current paddler's category", () => {
			const state = makeState({ paddlerIndex: 1, currentHeat: 1 }) // Bob is Expert
			expect(getAvailableMovesForPaddler(state)).toEqual({
				hole: true,
				wave: true,
				nfl: true
			})
		})

		it("falls back to default moves when paddler has no category match", () => {
			const state = makeState({
				paddlerIndex: 0,
				currentHeat: 1,
				paddlerList: [{ name: "Alice", category: "Unknown", heat: 1 }],
				categories: []
			})
			expect(getAvailableMovesForPaddler(state)).toEqual({
				wave: true,
				hole: true,
				nfl: false
			})
		})
	})

	describe("getAvailableHeats", () => {
		it("returns unique heats from the heats array", () => {
			const state = makeState({ heats: [1, 2, 1, 2, 3] })
			expect(getAvailableHeats(state)).toEqual([1, 2, 3])
		})

		it("returns empty array when heats is empty", () => {
			const state = makeState({ heats: [] })
			expect(getAvailableHeats(state)).toEqual([])
		})
	})
})
