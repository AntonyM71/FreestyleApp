import React from "react"
import { render, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import { createStore } from "redux"
import SettingsScreen from "../SettingsScreen"

// Mock child components
jest.mock("../mycomponents/categoryManager", () =>
  () => null
)

jest.mock("../mycomponents/runOptions", () =>
  () => null
)

jest.mock("../mycomponents/timerOptions", () =>
  () => null
)

describe("SettingsScreen", () => {
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
        <SettingsScreen />
      </Provider>
    )
  })

  it("has correct navigation options", () => {
    expect(SettingsScreen.navigationOptions).toEqual({
      title: "Settings"
    })
  })

  it("renders all child components", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <SettingsScreen />
      </Provider>
    )

    expect(screen.getByTestId("timer-options-container")).toBeTruthy()
    expect(screen.getByTestId("run-options-container")).toBeTruthy()
    expect(screen.getByTestId("category-manager-container")).toBeTruthy()
  })

  it("renders headers with correct text", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <SettingsScreen />
      </Provider>
    )

    expect(screen.getByTestId("score-options-header")).toHaveTextContent("Score Page Options")
    expect(screen.getByTestId("categories-header")).toHaveTextContent("Categories")
  })

  it("applies correct layout widths", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <SettingsScreen />
      </Provider>
    )

    expect(screen.getByTestId("timer-options-container")).toHaveStyle({ width: "50%" })
    expect(screen.getByTestId("run-options-container")).toHaveStyle({ width: "50%" })
    expect(screen.getByTestId("category-manager-container")).toHaveStyle({ width: "100%" })
  })

  it("renders with correct accessibility properties", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <SettingsScreen />
      </Provider>
    )

    const scrollView = screen.getByTestId("settings-scroll-view")
    expect(scrollView).toHaveProp("accessible", true)
  })
})
