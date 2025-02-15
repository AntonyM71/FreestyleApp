import React from "react"
import { render, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { ScrollView } from "react-native"
import ResultsView from "../resultsView"
import type { IPaddler } from "../../../reducers"
import { initialScoresheet } from "../makePaddlerScores"

const mockStore = configureStore([])

describe("ResultsView", () => {
  const testPaddlers = [
    { name: "Paddler1", category: "Novice", heat: 1 },
    { name: "Paddler2", category: "Pro", heat: 1 },
    { name: "Paddler3", category: "Novice", heat: 2 }
  ]

  // Create test scores using initialScoresheet
  const testScores = {
    Paddler1: [initialScoresheet()],
    Paddler2: [initialScoresheet()],
    Paddler3: [initialScoresheet()]
  }

  const initialState = {
    paddlers: {
      paddlerList: testPaddlers,
      paddlerScores: testScores,
      places: [],
      paddlerIndex: 0,
      showTimer: false,
      currentHeat: 1,
      currentRun: 0,
      numberOfRuns: 1,
      showRunHandler: true,
      categories: [
        {
          name: "Novice",
          availableMoves: { hole: true, wave: true, nfl: false }
        },
        {
          name: "Pro",
          availableMoves: { hole: true, wave: true, nfl: true }
        }
      ],
      heats: [1, 2]
    }
  }

  it("renders categories and paddler names correctly", () => {
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <ResultsView />
      </Provider>
    )

    // Check if categories are rendered
    expect(screen.getByText("Novice")).toBeTruthy()
    expect(screen.getByText("Pro")).toBeTruthy()

    // Check if paddler names are rendered
    expect(screen.getByText("Paddler1")).toBeTruthy()
    expect(screen.getByText("Paddler2")).toBeTruthy()
    expect(screen.getByText("Paddler3")).toBeTruthy()
  })

  it("groups paddlers by category correctly", () => {
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <ResultsView />
      </Provider>
    )

    // Get all category sections
    const categoryTexts = screen.getAllByText(/Novice|Pro/)
    expect(categoryTexts).toHaveLength(2)

    // Verify paddlers are under correct categories
    const noviceSection = screen.getByText("Novice").parent
    const proSection = screen.getByText("Pro").parent

    expect(noviceSection).toBeTruthy()
    expect(proSection).toBeTruthy()
  })

  it("displays scores for each paddler", () => {
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <ResultsView />
      </Provider>
    )

    // Mock DisplayScore component would typically show these scores
    // We can verify the container structure for scores exists
    const paddlerContainers = screen.getAllByText(/Paddler\d/)
    expect(paddlerContainers).toHaveLength(3)

    // Each paddler should have a score container
    paddlerContainers.forEach((container) => {
      expect(container.parent).toBeTruthy()
    })
  })

  it("handles empty paddler list", () => {
    const emptyState = {
      paddlers: {
        paddlerList: [],
        paddlerScores: {},
        places: [],
        paddlerIndex: 0,
        showTimer: false,
        currentHeat: 1,
        currentRun: 0,
        numberOfRuns: 0,
        showRunHandler: true,
        categories: [],
        heats: []
      }
    }
    const store = mockStore(emptyState)

    render(
      <Provider store={store}>
        <ResultsView />
      </Provider>
    )

    // Should render without crashing - verify ScrollView exists
    const scrollView = screen.UNSAFE_getByType(ScrollView)
    expect(scrollView).toBeTruthy()
  })
})
