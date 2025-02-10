import React from "react"
import { render, screen, fireEvent } from "@testing-library/react-native"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { EntryDynamicButton } from "../entryDynamicButton"
import { IDirection } from "../../../reducers"

const mockStore = configureStore([])

describe("EntryDynamicButton", () => {
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
								link: false
							},
							right: {
								scored,
								clean: false,
								superClean: false,
								air: false,
								huge: false,
								link: false
							}
						}
					}
				}
			},
			currentRun: 1,
			numberOfRuns: 1,
			paddlerList: [
				{
					name: "TestPaddler",
					category: "category 1",
					heat: 1
				}
			]
		}
	})

	it("renders an unscored move button correctly", () => {
		const initialState = createInitialState(false)
		const store = mockStore(initialState)

		const props = {
			paddler: {
				name: "TestPaddler",
				category: "category 1",
				heat: 1
			},
			move: {
				Move: "Spin",
				Value: 10,
				Clean: 10,
				SuperClean: 10,
				Air: 10,
				Huge: 20,
				Link: 10,
				Reverse: true
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<EntryDynamicButton {...props} />
			</Provider>
		)

		// Main move button should still be visible
		expect(screen.getByText("Spin")).toBeOnTheScreen()
	})

	it("shows bonus buttons when move is scored", () => {
		const initialState = createInitialState(true)
		const store = mockStore(initialState)

		const props = {
			paddler: {
				name: "TestPaddler",
				category: "category 1",
				heat: 1
			},
			move: {
				Move: "Spin",
				Value: 10,
				Clean: 10,
				SuperClean: 10,
				Air: 10,
				Huge: 20,
				Link: 10,
				Reverse: true
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<EntryDynamicButton {...props} />
			</Provider>
		)

		// Main move button should still be visible
		expect(screen.getByText("Spin")).toBeOnTheScreen()

		// All bonus buttons should be visible and enabled since the move supports them
		expect(screen.getByText("C")).toBeOnTheScreen()
		expect(screen.getByText("SC")).toBeOnTheScreen()
		expect(screen.getByText("A")).toBeOnTheScreen()
		expect(screen.getByText("H")).toBeOnTheScreen()
		expect(screen.getByText("L")).toBeOnTheScreen()

		expect(screen.getByText("C")).toBeEnabled()
		expect(screen.getByText("SC")).toBeEnabled()
		expect(screen.getByText("A")).toBeEnabled()
		expect(screen.getByText("H")).toBeEnabled()
		expect(screen.getByText("L")).toBeEnabled()
	})

	it("disables bonus buttons for unsupported bonuses", () => {
		const initialState = createInitialState(true)
		const store = mockStore(initialState)

		const props = {
			paddler: {
				name: "TestPaddler",
				category: "category 1",
				heat: 1
			},
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
				<EntryDynamicButton {...props} />
			</Provider>
		)

		// Main move button should still be visible
		expect(screen.getByText("Spin")).toBeOnTheScreen()

		// All bonus buttons should be visible but disabled since the move doesn't support them
		expect(screen.getByText("C")).toBeDisabled()
		expect(screen.getByText("SC")).toBeDisabled()
		expect(screen.getByText("A")).toBeDisabled()
		expect(screen.getByText("H")).toBeDisabled()
		expect(screen.getByText("L")).toBeDisabled()
	})

	it("dispatches action when scoring a move", () => {
		const initialState = createInitialState(false)
		const store = mockStore(initialState)

		const props = {
			paddler: {
				name: "TestPaddler",
				category: "category 1",
				heat: 1
			},
			move: {
				Move: "Spin",
				Value: 10,
				Clean: 10,
				SuperClean: 10,
				Air: 10,
				Huge: 20,
				Link: 10,
				Reverse: true
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<EntryDynamicButton {...props} />
			</Provider>
		)

		// Click the move button to score it
		fireEvent.press(screen.getByText("Spin"))

		// Verify the correct action was dispatched
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

	it("automatically enables air bonus when huge is selected", () => {
		const initialState = createInitialState(true)
		const store = mockStore(initialState)

		const props = {
			paddler: {
				name: "TestPaddler",
				category: "category 1",
				heat: 1
			},
			move: {
				Move: "Spin",
				Value: 10,
				Clean: 10,
				SuperClean: 10,
				Air: 10,
				Huge: 20,
				Link: 10,
				Reverse: true
			},
			direction: "left" as IDirection
		}

		render(
			<Provider store={store}>
				<EntryDynamicButton {...props} />
			</Provider>
		)

		// Click the huge bonus button
		fireEvent.press(screen.getByText("H"))

		// Verify the correct action was dispatched with both huge and air set to true
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
})
