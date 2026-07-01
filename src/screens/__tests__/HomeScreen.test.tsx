import { render, screen } from "@testing-library/react-native"
import React from "react"
import { Dimensions } from "react-native"
import { Provider } from "react-redux"
import { createStore } from "redux"

import HomeScreen from "../HomeScreen"

// Mock child components with string components
jest.mock("../mycomponents/heatHandler", () => () => null)
jest.mock("../mycomponents/JsonButtons", () => () => null)
jest.mock("../mycomponents/paddlerHandler", () => ({
  PaddlerHandler: () => null
}))
jest.mock("../mycomponents/timer", () => () => null)

// Mock Dimensions
const originalGetDimensions = Dimensions.get

const mockDimensions = (width: number) => {
  Dimensions.get = jest.fn().mockReturnValue({ width })
}

describe("HomeScreen", () => {
  const TIMER_CONTAINER_TEST_ID = "timer-container"
  const HEAT_HANDLER_CONTAINER_TEST_ID = "heat-handler-container"
  const PADDLER_HANDLER_CONTAINER_TEST_ID = "paddler-handler-container"
  const createTestStore = (showTimer = false) => {
    const initialState = {
      paddlers: {
        places: [],
        paddlerIndex: 0,
        paddlerList: [],
        paddlerScores: {},
        showTimer,
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

  afterAll(() => {
    Dimensions.get = originalGetDimensions
  })

  it("renders without crashing", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )
  })

  it("applies correct layout percentages for small screens", () => {
    const store = createTestStore(true)
    mockDimensions(599)

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    const timerContainer = screen.getByTestId(TIMER_CONTAINER_TEST_ID)
    const heatHandlerContainer = screen.getByTestId(HEAT_HANDLER_CONTAINER_TEST_ID)
    const paddlerHandlerContainer = screen.getByTestId(PADDLER_HANDLER_CONTAINER_TEST_ID)

    expect(timerContainer).toHaveStyle({ width: "33.3%" })
    expect(heatHandlerContainer).toHaveStyle({ width: "66.6%" })
    expect(paddlerHandlerContainer).toHaveStyle({ width: "100%" })
  })

  it("applies correct layout percentages for large screens", () => {
    const store = createTestStore(true)
    mockDimensions(601)

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    const timerContainer = screen.getByTestId(TIMER_CONTAINER_TEST_ID)
    const heatHandlerContainer = screen.getByTestId(HEAT_HANDLER_CONTAINER_TEST_ID)
    const paddlerHandlerContainer = screen.getByTestId(PADDLER_HANDLER_CONTAINER_TEST_ID)

    expect(timerContainer).toHaveStyle({ width: "100%" })
    expect(heatHandlerContainer).toHaveStyle({ width: "100%" })
    expect(paddlerHandlerContainer).toHaveStyle({ width: "50%" })
  })

  it("renders all child components", () => {
    const store = createTestStore(true)
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    expect(screen.getByTestId(TIMER_CONTAINER_TEST_ID)).toBeTruthy()
    expect(screen.getByTestId(HEAT_HANDLER_CONTAINER_TEST_ID)).toBeTruthy()
    expect(screen.getByTestId(PADDLER_HANDLER_CONTAINER_TEST_ID)).toBeTruthy()
    expect(screen.getByTestId("move-buttons-container")).toBeTruthy()
  })

  it("renders with correct accessibility properties", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    const safeAreaView = screen.getByTestId("home-safe-area")
    const scrollView = screen.getByTestId("home-scroll-view")

    expect(safeAreaView).toHaveProp("accessible", true)
    expect(scrollView).toHaveProp("accessible", true)
  })

  it("hides the timer when showTimer is false", () => {
    const store = createTestStore(false)
    mockDimensions(400)

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    expect(screen.queryByTestId(TIMER_CONTAINER_TEST_ID)).toBeNull()
  })

  it("gives heat handler full width when showTimer is false on small screen", () => {
    const store = createTestStore(false)
    mockDimensions(400)

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    const heatHandlerContainer = screen.getByTestId(HEAT_HANDLER_CONTAINER_TEST_ID)
    expect(heatHandlerContainer).toHaveStyle({ width: "100%" })
  })

  it("does not render the timer in tablet layout when showTimer is false", () => {
    const store = createTestStore(false)
    mockDimensions(800)

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    expect(screen.queryByTestId(TIMER_CONTAINER_TEST_ID)).toBeNull()
    // paddler handler container is still present
    expect(screen.getByTestId(PADDLER_HANDLER_CONTAINER_TEST_ID)).toBeTruthy()
  })

  it("has navigationOptions with header set to null", () => {
    expect(HomeScreen.navigationOptions).toEqual({ header: null })
  })
})
