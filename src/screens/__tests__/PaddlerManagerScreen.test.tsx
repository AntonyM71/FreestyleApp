import { render, screen } from "@testing-library/react-native"
import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"

import PaddlerManagerScreen from "../PaddlerManagerScreen"

// Mock PaddlerManager component
jest.mock("../mycomponents/paddlerManagementHandler", () =>
  () => null
)

describe("PaddlerManagerScreen", () => {
  const SAFE_AREA_TEST_ID = "paddler-manager-safe-area"
  const SCROLL_VIEW_TEST_ID = "paddler-manager-scroll-view"
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

    const safeAreaView = screen.getByTestId(SAFE_AREA_TEST_ID)
    const scrollView = screen.getByTestId(SCROLL_VIEW_TEST_ID)

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

    const safeAreaView = screen.getByTestId(SAFE_AREA_TEST_ID)
    const scrollView = screen.getByTestId(SCROLL_VIEW_TEST_ID)

    expect(safeAreaView).toHaveStyle({ flex: 1 }) // From styles.container
    expect(scrollView).toHaveStyle({ flex: 1 }) // From styles.container
  })

  it("excludes bottom edge from SafeAreaView to prevent double bottom inset with tab bar", () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <PaddlerManagerScreen />
      </Provider>
    )

    const safeAreaView = screen.getByTestId(SAFE_AREA_TEST_ID)
    expect(safeAreaView).toHaveProp("edges", expect.objectContaining({ bottom: "off" }))
  })
})
