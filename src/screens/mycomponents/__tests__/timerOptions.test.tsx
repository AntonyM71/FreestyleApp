import { fireEvent, render, screen } from "@testing-library/react-native"
import React from "react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

import { updateShowTimer } from "../../../actions"
import TimerOptions from "../timerOptions"

const mockStore = configureStore([])

const TIMER_OPTIONS_SWITCH_TEST_ID = "timer-options-switch"

describe("TimerOptions", () => {
  it("renders correctly with timer hidden", () => {
    const initialState = { paddlers: { showTimer: false } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <TimerOptions />
      </Provider>
    )

    expect(screen.getByText("Timer")).toBeTruthy()
    expect(screen.getByText("Hidden")).toBeTruthy()
    expect(screen.getByTestId(TIMER_OPTIONS_SWITCH_TEST_ID)).toHaveProp("value", false)
  })

  it("renders correctly with timer shown", () => {
    const initialState = { paddlers: { showTimer: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <TimerOptions />
      </Provider>
    )

    expect(screen.getByText("Timer")).toBeTruthy()
    expect(screen.getByText("Shown")).toBeTruthy()
    expect(screen.getByTestId(TIMER_OPTIONS_SWITCH_TEST_ID)).toHaveProp("value", true)
  })

  it("dispatches updateShowTimer action when button is pressed", () => {
    const initialState = { paddlers: { showTimer: false } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <TimerOptions />
      </Provider>
    )

    const toggle = screen.getByTestId(TIMER_OPTIONS_SWITCH_TEST_ID)
    fireEvent(toggle, "valueChange", true)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(updateShowTimer(true))
  })
})
