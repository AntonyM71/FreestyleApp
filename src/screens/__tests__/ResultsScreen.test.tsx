import { render, screen } from "@testing-library/react-native"
import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"

import ResultsScreen from "../ResultsScreen"

// Mock ResultsView component
jest.mock("../mycomponents/resultsView", () =>
  () => null
)

describe("ResultsScreen", () => {
  const createTestStore = () => {
    const initialState = {
      paddlers: {
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
        heats: []
      }
    }

    return createStore((state = initialState) => state)
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders without crashing", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <ResultsScreen />
      </Provider>
    )
  })

  it("has correct navigation options", () => {
    expect(ResultsScreen.navigationOptions).toEqual({
      title: "Results"
    })
  })

  it("renders with correct accessibility properties", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <ResultsScreen />
      </Provider>
    )

    const scrollView = screen.getByTestId("results-scroll-view")
    expect(scrollView).toHaveProp("accessible", true)
  })

  it("applies correct styles", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <ResultsScreen />
      </Provider>
    )

    const scrollView = screen.getByTestId("results-scroll-view")
    expect(scrollView).toHaveStyle({ flex: 1 }) // From styles.container
  })

  it("excludes bottom edge from SafeAreaView to prevent double bottom inset with tab bar", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <ResultsScreen />
      </Provider>
    )

    const safeAreaView = screen.getByTestId("results-safe-area")
    expect(safeAreaView).toHaveProp("edges", expect.objectContaining({ bottom: "off" }))
  })
})
