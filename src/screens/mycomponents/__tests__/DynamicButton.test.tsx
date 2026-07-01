import { fireEvent,render, screen } from "@testing-library/react-native"
import React from "react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

import { IDirection } from "../../../reducers"
import { DynamicButton } from "../dynamicButton"

const mockStore = configureStore([])

const TEST_CATEGORY = "category 1"

describe("DynamicButton", () => {
	const createInitialState = (scored = false, moveName = "Spin") => ({
		paddlers: {
			paddlerScores: {
				TestPaddler: {
					1: {
						[moveName]: {
							left: {
								scored,
								clean: false,
								superClean: false,
								air: false,
								huge: false,
								link: false,
								style: false
							},
							right: {
								scored,
								clean: false,
								superClean: false,
								air: false,
								huge: false,
								link: false,
								style: false
							}
						}
					}
				}
			},
			paddlerIndex: 0,
			paddlerList: [
				{
					name: "TestPaddler",
					category: TEST_CATEGORY,
					heat: 1
				}
			],
			currentHeat: 1,
			currentRun: 1,
			numberOfRuns: 1,
			showTimer: false,
			showRunHandler: true,
			places: [],
			categories: [
				{
					name: TEST_CATEGORY,
					availableMoves: { hole: true, wave: false, nfl: false }
				}
			],
			heats: [1]
		}
	})

	it("allows scoring a move with bonuses", () => {
		const initialState = createInitialState(false)

		const store = mockStore(initialState)

		const props = {
			paddler: {
				name: "TestPaddler",
				category: TEST_CATEGORY,
				heat: 1
			},
			currentRun: 1,
			move: {
				Move: "Spin",
				Value: 10,
				Clean: 10,
				SuperClean: 10,
				Air: 10,
				Huge: 20,
				Link: 10,
				Style: 10,
				Reverse: true
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<DynamicButton {...props} />
			</Provider>
		)

		// Initially shows just the move button
		const moveButton = screen.getByText("Spin L")
		expect(moveButton).toBeOnTheScreen()

		// Click the move to score it
		fireEvent.press(moveButton)

		// Verify store was called with the correct action
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: "UPDATE_PADDLER_SCORES",
			payload: expect.objectContaining({
				TestPaddler: expect.objectContaining({
					1: expect.objectContaining({
						Spin: expect.objectContaining({
							left: expect.objectContaining({
								scored: true
							})
						})
					})
				})
			})
		})
	})

	it("shows enabled bonus buttons after scoring a move", () => {
		const initialState = createInitialState(true)
		const store = mockStore(initialState)

		const props = {
			paddler: {
				name: "TestPaddler",
				category: TEST_CATEGORY,
				heat: 1
			},
			currentRun: 1,
			move: {
				Move: "Spin",
				Value: 10,
				Clean: 10,
				SuperClean: 10,
				Air: 10,
				Huge: 20,
				Link: 10,
				Style: 10,
				Reverse: true
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<DynamicButton {...props} />
			</Provider>
		)

		// After scoring, bonus buttons should be visible
		expect(screen.getByText("C")).toBeOnTheScreen()
		expect(screen.getByText("SC")).toBeOnTheScreen()
		expect(screen.getByText("A")).toBeOnTheScreen()
		expect(screen.getByText("H")).toBeOnTheScreen()
		expect(screen.getByText("L")).toBeOnTheScreen()
		expect(screen.getByText("S")).toBeOnTheScreen()

		// All bonus buttons should be enabled since the move supports them
		expect(screen.getByText("C")).toBeEnabled()
		expect(screen.getByText("SC")).toBeEnabled()
		expect(screen.getByText("A")).toBeEnabled()
		expect(screen.getByText("H")).toBeEnabled()
		expect(screen.getByText("L")).toBeEnabled()
		expect(screen.getByText("S")).toBeEnabled()
	})

	it("shows disabled bonus buttons for unsupported bonuses", () => {
		const initialState = createInitialState(true)
		const store = mockStore(initialState)

		const props = {
			paddler: {
				name: "TestPaddler",
				category: TEST_CATEGORY,
				heat: 1
			},
			currentRun: 1,
			move: {
				Move: "Spin",
				Value: 10,
				Clean: 0, // No clean bonus
				SuperClean: 0, // No super clean bonus
				Air: 0, // No air bonus
				Huge: 0, // No huge bonus
				Link: 0, // No link bonus
				Reverse: true
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<DynamicButton {...props} />
			</Provider>
		)

		// After scoring, bonus buttons should be visible but disabled
		expect(screen.getByText("C")).toBeDisabled()
		expect(screen.getByText("SC")).toBeDisabled()
		expect(screen.getByText("A")).toBeDisabled()
		expect(screen.getByText("H")).toBeDisabled()
		expect(screen.getByText("L")).toBeDisabled()
		expect(screen.getByText("S")).toBeDisabled()
	})

	it("scoring Huge automatically enables Air (business rule)", () => {
		const initialState = createInitialState(true)
		const store = mockStore(initialState)

		const props = {
			paddler: { name: "TestPaddler", category: TEST_CATEGORY, heat: 1 },
			currentRun: 1,
			move: {
				Move: "Spin",
				Value: 10,
				Clean: 10,
				SuperClean: 10,
				Air: 10,
				Huge: 20,
				Link: 10,
				Style: 10,
				Reverse: true
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<DynamicButton {...props} />
			</Provider>
		)

		fireEvent.press(screen.getByText("H"))

		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: "UPDATE_PADDLER_SCORES",
			payload: expect.objectContaining({
				TestPaddler: expect.objectContaining({
					1: expect.objectContaining({
						Spin: expect.objectContaining({
							left: expect.objectContaining({
								huge: true,
								air: true
							})
						})
					})
				})
			})
		})
	})

	it("pressing a scored move button again toggles it off", () => {
		const initialState = createInitialState(true)
		const store = mockStore(initialState)

		const props = {
			paddler: { name: "TestPaddler", category: TEST_CATEGORY, heat: 1 },
			currentRun: 1,
			move: {
				Move: "Spin",
				Value: 10,
				Clean: 10,
				SuperClean: 10,
				Air: 10,
				Huge: 20,
				Link: 10,
				Style: 10,
				Reverse: true
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<DynamicButton {...props} />
			</Provider>
		)

		// The move is already scored, pressing it again should un-score it
		fireEvent.press(screen.getByText("Spin L"))

		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: "UPDATE_PADDLER_SCORES",
			payload: expect.objectContaining({
				TestPaddler: expect.objectContaining({
					1: expect.objectContaining({
						Spin: expect.objectContaining({
							left: expect.objectContaining({ scored: false })
						})
					})
				})
			})
		})
	})

	it("shows move name without direction suffix for one-sided moves", () => {
		const initialState = createInitialState(false, "Loop")
		const store = mockStore(initialState)

		const props = {
			paddler: { name: "TestPaddler", category: TEST_CATEGORY, heat: 1 },
			currentRun: 1,
			move: {
				Move: "Loop",
				Value: 10,
				Clean: 10,
				SuperClean: 10,
				Air: 10,
				Huge: 20,
				Link: 10,
				Style: 10,
				Reverse: false
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<DynamicButton {...props} />
			</Provider>
		)

		// One-sided moves show only the move name, not "Loop L"
		expect(screen.getByText("Loop")).toBeTruthy()
		expect(screen.queryByText("Loop L")).toBeNull()
	})
})
