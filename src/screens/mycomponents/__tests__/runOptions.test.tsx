import { fireEvent, render, screen } from "@testing-library/react-native"
import React from "react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

import { changeRun, updateShowRun } from "../../../actions"
import RunOptions from "../runOptions"

const mockStore = configureStore([])

const RUN_OPTIONS_SWITCH_TEST_ID = "run-options-switch"

describe("RunOptions", () => {
  it("renders correctly with runs hidden", () => {
    const initialState = { paddlers: { showRunHandler: false } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <RunOptions />
      </Provider>
    )

    expect(screen.getByText("Runs")).toBeTruthy()
    expect(screen.getByText("Hidden")).toBeTruthy()
    expect(screen.getByTestId(RUN_OPTIONS_SWITCH_TEST_ID)).toHaveProp("value", false)
  })

  it("renders correctly with runs shown", () => {
    const initialState = { paddlers: { showRunHandler: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <RunOptions />
      </Provider>
    )

    expect(screen.getByText("Runs")).toBeTruthy()
    expect(screen.getByText("Shown")).toBeTruthy()
    expect(screen.getByTestId(RUN_OPTIONS_SWITCH_TEST_ID)).toHaveProp("value", true)
  })

  it("dispatches both actions when button is pressed with runs shown", () => {
    const initialState = { paddlers: { showRunHandler: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <RunOptions />
      </Provider>
    )

    const toggle = screen.getByTestId(RUN_OPTIONS_SWITCH_TEST_ID)
    fireEvent(toggle, "valueChange", false)

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0]).toEqual(changeRun(0))
    expect(actions[1]).toEqual(updateShowRun(false))
  })

  it("dispatches only updateShowRun action when button is pressed with runs hidden", () => {
    const initialState = { paddlers: { showRunHandler: false } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <RunOptions />
      </Provider>
    )

    const toggle = screen.getByTestId(RUN_OPTIONS_SWITCH_TEST_ID)
    fireEvent(toggle, "valueChange", true)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(updateShowRun(true))
  })
})
