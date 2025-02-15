import React from "react"
import { render, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { Dimensions } from "react-native"
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
    const store = createTestStore()
    mockDimensions(599)

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    const timerContainer = screen.getByTestId("timer-container")
    const heatHandlerContainer = screen.getByTestId("heat-handler-container")
    const paddlerHandlerContainer = screen.getByTestId("paddler-handler-container")

    expect(timerContainer).toHaveStyle({ width: "33.3%" })
    expect(heatHandlerContainer).toHaveStyle({ width: "66.6%" })
    expect(paddlerHandlerContainer).toHaveStyle({ width: "100%" })
  })

  it("applies correct layout percentages for large screens", () => {
    const store = createTestStore()
    mockDimensions(601)

    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    const timerContainer = screen.getByTestId("timer-container")
    const heatHandlerContainer = screen.getByTestId("heat-handler-container")
    const paddlerHandlerContainer = screen.getByTestId("paddler-handler-container")

    expect(timerContainer).toHaveStyle({ width: "16.65%" })
    expect(heatHandlerContainer).toHaveStyle({ width: "33.3%" })
    expect(paddlerHandlerContainer).toHaveStyle({ width: "50%" })
  })

  it("renders all child components", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    )

    expect(screen.getByTestId("timer-container")).toBeTruthy()
    expect(screen.getByTestId("heat-handler-container")).toBeTruthy()
    expect(screen.getByTestId("paddler-handler-container")).toBeTruthy()
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
})
