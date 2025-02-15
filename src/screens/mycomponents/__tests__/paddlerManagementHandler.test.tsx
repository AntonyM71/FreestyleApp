import React from "react"
import { render, screen, fireEvent } from "@testing-library/react-native"
import { Provider } from "react-redux"
import PaddlerManager from "../paddlerManagementHandler"
import { initialScoresheet } from "../makePaddlerScores"
import configureStore, { IStoreType } from "../../../store"

describe("PaddlerManager", () => {
  // Use the same initial state as defined in reducers.ts
  const testPaddlers = [
    { name: "paddler1", category: "category 1", heat: 1 },
    { name: "paddler2", category: "category 1", heat: 1 },
    { name: "paddler3", category: "category 1", heat: 1 }
  ]

  const initialState = {
    paddlers: {
      places: [],
      paddlerIndex: 0,
      paddlerList: testPaddlers,
      paddlerScores: {
        paddler1: [initialScoresheet()],
        paddler2: [initialScoresheet()],
        paddler3: [initialScoresheet()]
      },
      showTimer: false,
      currentHeat: 1,
      currentRun: 0,
      numberOfRuns: 0,
      showRunHandler: true,
      categories: [
        {
          name: "category 1",
          availableMoves: { hole: true, wave: false, nfl: false }
        }
      ],
      heats: [1]
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders heats with their paddlers", () => {
    const store = configureStore()
    render(
      <Provider store={store}>
        <PaddlerManager />
      </Provider>
    )

    // Each heat should be rendered with its paddlers
    const heat1Paddlers = testPaddlers.filter((p) => p.heat === 1)
    const heat2Paddlers = testPaddlers.filter((p) => p.heat === 2)

    heat1Paddlers.forEach((paddler) => {
      expect(screen.getByText(paddler.name)).toBeTruthy()
    })
    heat2Paddlers.forEach((paddler) => {
      expect(screen.getByText(paddler.name)).toBeTruthy()
    })
  })

  it("adds a new heat when 'New Heat' button is clicked", () => {
    const store = configureStore()
    render(
      <Provider store={store}>
        <PaddlerManager />
      </Provider>
    )

    // Find and click the New Heat button
    const newHeatButton = screen.getByText("New Heat")
    fireEvent.press(newHeatButton)

    // After clicking, verify the store state
    const state = store.getState() as IStoreType
    expect(state.paddlers.heats).toEqual([1, 2])
  })

  it("clears scores when 'Clear Scores' button is clicked", () => {
    const store = configureStore()
    render(
      <Provider store={store}>
        <PaddlerManager />
      </Provider>
    )

    // Find and click the Clear Scores button
    const clearScoresButton = screen.getByText("Clear Scores")
    fireEvent.press(clearScoresButton)

    // After clicking, verify the store state
    const state = store.getState() as IStoreType
    expect(state.paddlers.numberOfRuns).toBe(0)
    expect(state.paddlers.paddlerScores).toEqual({
      paddler1: [initialScoresheet()],
      paddler2: [initialScoresheet()],
      paddler3: [initialScoresheet()]
    })
  })

  it("clears paddlers when 'Clear Paddlers' button is clicked", () => {
    const store = configureStore()
    render(
      <Provider store={store}>
        <PaddlerManager />
      </Provider>
    )

    // Find and click the Clear Paddlers button
    const clearPaddlersButton = screen.getByText("Clear Paddlers")
    fireEvent.press(clearPaddlersButton)

    // After clicking, verify the store state
    const state = store.getState() as IStoreType
    expect(state.paddlers.paddlerList).toEqual([])
    expect(state.paddlers.paddlerScores).toEqual({})
    expect(state.paddlers.numberOfRuns).toBe(0)
  })

  it("handles empty state", () => {
    const emptyState = {
      paddlers: {
        paddlerList: [],
        paddlerScores: {},
        numberOfRuns: 0,
        heats: [],
        categories: []
      }
    }
    const store = configureStore()
    render(
      <Provider store={store}>
        <PaddlerManager />
      </Provider>
    )

    // Should still render buttons
    expect(screen.getByText("New Heat")).toBeTruthy()
    expect(screen.getByText("Clear Scores")).toBeTruthy()
    expect(screen.getByText("Clear Paddlers")).toBeTruthy()

    // Adding heat to empty state should start with heat 1
    fireEvent.press(screen.getByText("New Heat"))
    const state = store.getState() as IStoreType
    expect(state.paddlers.heats).toEqual([1, 2])
  })
})
