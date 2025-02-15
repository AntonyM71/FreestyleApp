import React from "react"
import { render, fireEvent, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import RunOptions from "../runOptions"
import { changeRun, updateShowRun } from "../../../actions"

const mockStore = configureStore([])

describe("RunOptions", () => {
  it("renders correctly with runs hidden", () => {
    const initialState = { paddlers: { showRunHandler: false } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <RunOptions />
      </Provider>
    )

    expect(screen.getByText("Show Runs")).toBeTruthy()
  })

  it("renders correctly with runs shown", () => {
    const initialState = { paddlers: { showRunHandler: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <RunOptions />
      </Provider>
    )

    expect(screen.getByText("Hide Runs")).toBeTruthy()
  })

  it("dispatches both actions when button is pressed with runs shown", () => {
    const initialState = { paddlers: { showRunHandler: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <RunOptions />
      </Provider>
    )

    const button = screen.getByText("Hide Runs")
    fireEvent.press(button)

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

    const button = screen.getByText("Show Runs")
    fireEvent.press(button)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(updateShowRun(true))
  })
})
