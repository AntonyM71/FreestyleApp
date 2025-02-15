import React from "react"
import { render, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import { createStore } from "redux"
import PaddlerManagerScreen from "../PaddlerManagerScreen"

// Mock PaddlerManager component
jest.mock("../mycomponents/paddlerManagementHandler", () =>
  () => null
)

describe("PaddlerManagerScreen", () => {
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
        <PaddlerManagerScreen />
      </Provider>
    )
  })

  it("renders PaddlerManager component", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <PaddlerManagerScreen />
      </Provider>
    )

    expect(screen.getByTestId("paddler-manager-container")).toBeTruthy()
  })

  it("renders with correct accessibility properties", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <PaddlerManagerScreen />
      </Provider>
    )

    const safeAreaView = screen.getByTestId("paddler-manager-safe-area")
    const scrollView = screen.getByTestId("paddler-manager-scroll-view")

    expect(safeAreaView).toHaveProp("accessible", true)
    expect(scrollView).toHaveProp("accessible", true)
  })

  it("applies correct styles", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <PaddlerManagerScreen />
      </Provider>
    )

    const safeAreaView = screen.getByTestId("paddler-manager-safe-area")
    const scrollView = screen.getByTestId("paddler-manager-scroll-view")

    expect(safeAreaView).toHaveStyle({ flex: 1 }) // From styles.container
    expect(scrollView).toHaveStyle({ flex: 1 }) // From styles.container
  })
})
