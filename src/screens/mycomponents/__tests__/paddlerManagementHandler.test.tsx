import React from "react"
import { render, screen, fireEvent } from "@testing-library/react-native"
import { Provider } from "react-redux"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider as PaperProvider } from "react-native-paper"
import PaddlerManager from "../paddlerManagementHandler"
import { initialScoresheet } from "../makePaddlerScores"
import configureStore, { IStoreType } from "../../../store"

const safeAreaMetrics = {
  frame: { x: 0, y: 0, width: 320, height: 640 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 }
}

const renderWithProviders = (ui: React.ReactElement, store: ReturnType<typeof configureStore>) =>
  render(ui, {
    wrapper: ({ children }) => (
      <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <PaperProvider>
          <Provider store={store}>{children}</Provider>
        </PaperProvider>
      </SafeAreaProvider>
    )
  })

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
    renderWithProviders(<PaddlerManager />, store)

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
    renderWithProviders(<PaddlerManager />, store)

    // Find and click the New Heat button
    const newHeatButton = screen.getByText("New Heat")
    fireEvent.press(newHeatButton)

    // After clicking, verify the store state
    const state = store.getState() as IStoreType
    expect(state.paddlers.heats).toEqual([1, 2])
  })

  it("clears scores when 'Clear Scores' button is clicked and confirmed", () => {
    const store = configureStore()
    renderWithProviders(<PaddlerManager />, store)

    // Find and click the Clear Scores button to open the confirmation modal
    const clearScoresButton = screen.getByText("Clear Scores")
    fireEvent.press(clearScoresButton)

    // Confirm the action in the dialog
    const confirmButton = screen.getByText("Confirm")
    fireEvent.press(confirmButton)

    // After confirming, verify the store state
    const state = store.getState() as IStoreType
    expect(state.paddlers.numberOfRuns).toBe(0)
    expect(state.paddlers.paddlerScores).toEqual({
      paddler1: [initialScoresheet()],
      paddler2: [initialScoresheet()],
      paddler3: [initialScoresheet()]
    })
  })

  it("does not clear scores when 'Clear Scores' confirmation is cancelled", () => {
    const store = configureStore()
    renderWithProviders(<PaddlerManager />, store)

    const initialPaddlerScores = (store.getState() as IStoreType).paddlers.paddlerScores

    const clearScoresButton = screen.getByText("Clear Scores")
    fireEvent.press(clearScoresButton)

    // Cancel the action in the dialog
    const cancelButton = screen.getByText("Cancel")
    fireEvent.press(cancelButton)

    // State should be unchanged
    const state = store.getState() as IStoreType
    expect(state.paddlers.paddlerScores).toEqual(initialPaddlerScores)
  })

  it("clears paddlers when 'Clear Paddlers' button is clicked and confirmed", () => {
    const store = configureStore()
    renderWithProviders(<PaddlerManager />, store)

    // Find and click the Clear Paddlers button to open the confirmation modal
    const clearPaddlersButton = screen.getByText("Clear Paddlers")
    fireEvent.press(clearPaddlersButton)

    // Confirm the action in the dialog
    const confirmButton = screen.getByText("Confirm")
    fireEvent.press(confirmButton)

    // After confirming, verify the store state
    const state = store.getState() as IStoreType
    expect(state.paddlers.paddlerList).toEqual([])
    expect(state.paddlers.paddlerScores).toEqual({})
    expect(state.paddlers.numberOfRuns).toBe(0)
  })

  it("does not clear paddlers when 'Clear Paddlers' confirmation is cancelled", () => {
    const store = configureStore()
    renderWithProviders(<PaddlerManager />, store)

    const initialPaddlerList = (store.getState() as IStoreType).paddlers.paddlerList

    const clearPaddlersButton = screen.getByText("Clear Paddlers")
    fireEvent.press(clearPaddlersButton)

    // Cancel the action in the dialog
    const cancelButton = screen.getByText("Cancel")
    fireEvent.press(cancelButton)

    // State should be unchanged
    const state = store.getState() as IStoreType
    expect(state.paddlers.paddlerList).toEqual(initialPaddlerList)
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
    renderWithProviders(<PaddlerManager />, store)

    // Should still render buttons
    expect(screen.getByText("New Heat")).toBeTruthy()
    expect(screen.getByText("Clear Scores")).toBeTruthy()
    expect(screen.getByText("Clear Paddlers")).toBeTruthy()

    // Adding heat to empty state should start with heat 1
    fireEvent.press(screen.getByText("New Heat"))
    const state = store.getState() as IStoreType
    expect(state.paddlers.heats).toEqual([1, 2])
  })

  it("shows the correct message when 'Clear Scores' confirmation modal opens", () => {
    const store = configureStore()
    renderWithProviders(<PaddlerManager />, store)

    fireEvent.press(screen.getByText("Clear Scores"))

    expect(
      screen.getByText("Are you sure you want to clear all scores?")
    ).toBeTruthy()
  })

  it("shows the correct message when 'Clear Paddlers' confirmation modal opens", () => {
    const store = configureStore()
    renderWithProviders(<PaddlerManager />, store)

    fireEvent.press(screen.getByText("Clear Paddlers"))

    expect(
      screen.getByText("Are you sure you want to clear all paddlers?")
    ).toBeTruthy()
  })

  it("resets currentRun to 0 when scores are cleared", () => {
    const store = configureStore()
    renderWithProviders(<PaddlerManager />, store)

    fireEvent.press(screen.getByText("Clear Scores"))
    fireEvent.press(screen.getByText("Confirm"))

    const state = store.getState() as IStoreType
    expect(state.paddlers.currentRun).toBe(0)
  })

  it("resets paddlerIndex, currentHeat, and currentRun when paddlers are cleared", () => {
    const store = configureStore()
    renderWithProviders(<PaddlerManager />, store)

    fireEvent.press(screen.getByText("Clear Paddlers"))
    fireEvent.press(screen.getByText("Confirm"))

    const state = store.getState() as IStoreType
    expect(state.paddlers.paddlerList).toEqual([])
    expect(state.paddlers.paddlerIndex).toBe(0)
    expect(state.paddlers.currentHeat).toBe(0)
    expect(state.paddlers.currentRun).toBe(0)
  })

  it("renders a heat section for every available heat", () => {
    const store = configureStore()
    renderWithProviders(<PaddlerManager />, store)

    // Default store starts with heat 1 – add a second heat
    fireEvent.press(screen.getByText("New Heat"))

    // Both "Heat 1" and "Heat 2" headings should now appear
    expect(screen.getByText("Heat 1")).toBeTruthy()
    expect(screen.getByText("Heat 2")).toBeTruthy()
  })
})
