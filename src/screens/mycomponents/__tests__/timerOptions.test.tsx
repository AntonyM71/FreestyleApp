import React from "react"
import { render, fireEvent, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import TimerOptions from "../timerOptions"
import { updateShowTimer } from "../../../actions"

const mockStore = configureStore([])

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
    expect(screen.getByTestId("timer-options-switch")).toHaveProp("value", false)
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
    expect(screen.getByTestId("timer-options-switch")).toHaveProp("value", true)
  })

  it("dispatches updateShowTimer action when button is pressed", () => {
    const initialState = { paddlers: { showTimer: false } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <TimerOptions />
      </Provider>
    )

    const toggle = screen.getByTestId("timer-options-switch")
    fireEvent(toggle, "valueChange", true)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(updateShowTimer(true))
  })
})
