import React from "react"
import { render, fireEvent, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import HeatHandler from "../heatHandler"
import { changeHeat, changePaddler } from "../../../actions"
import { styles } from "../../../styles"

const mockStore = configureStore([])

describe("HeatHandler", () => {
  const mockPaddlers = [
    [
      { name: "Paddler1", category: "Category1", heat: 1 },
      { name: "Paddler2", category: "Category1", heat: 1 }
    ],
    [
      { name: "Paddler3", category: "Category1", heat: 2 },
      { name: "Paddler4", category: "Category1", heat: 2 }
    ]
  ]

  it("renders nothing when there is only one paddler", () => {
    const initialState = {
      paddlers: {
        paddlerList: [[{ name: "Solo", category: "Category1", heat: 1 }]],
        currentHeat: 1,
        heats: [1]
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <HeatHandler />
      </Provider>
    )

    expect(screen.queryByText("Heat 1")).toBeNull()
  })

  it("renders nothing when paddler list is empty", () => {
    const initialState = {
      paddlers: {
        paddlerList: [],
        currentHeat: 1,
        heats: [1]
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <HeatHandler />
      </Provider>
    )

    expect(screen.queryByText("Heat 1")).toBeNull()
  })

  it("renders correctly with multiple heats", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        heats: [1, 2]
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <HeatHandler />
      </Provider>
    )

    expect(screen.getByText("Heat 1")).toBeTruthy()
    expect(screen.getByText("Last")).toBeTruthy()
    expect(screen.getByText("Next")).toBeTruthy()
  })

  it("applies correct styles to buttons", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        heats: [1, 2]
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <HeatHandler />
      </Provider>
    )

    const lastButton = screen.getByText("Last").parent.parent
    const nextButton = screen.getByText("Next").parent.parent

    expect(lastButton.props.style).toMatchObject(styles.changeButton)
    expect(nextButton.props.style).toMatchObject(styles.changeButton)
  })

  it("handles next heat button press correctly", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        heats: [1, 2]
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <HeatHandler />
      </Provider>
    )

    const nextButton = screen.getByText("Next")
    fireEvent.press(nextButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0]).toEqual(changePaddler(0))
    expect(actions[1]).toEqual(changeHeat(2))
  })

  it("wraps to first heat when pressing next on last heat", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 2,
        heats: [1, 2]
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <HeatHandler />
      </Provider>
    )

    const nextButton = screen.getByText("Next")
    fireEvent.press(nextButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0]).toEqual(changePaddler(0))
    expect(actions[1]).toEqual(changeHeat(1))
  })

  it("handles previous heat button press correctly", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 2,
        heats: [1, 2]
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <HeatHandler />
      </Provider>
    )

    const lastButton = screen.getByText("Last")
    fireEvent.press(lastButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0]).toEqual(changePaddler(0))
    expect(actions[1]).toEqual(changeHeat(1))
  })

  it("wraps to last heat when pressing previous on first heat", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        heats: [1, 2]
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <HeatHandler />
      </Provider>
    )

    const lastButton = screen.getByText("Last")
    fireEvent.press(lastButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0]).toEqual(changePaddler(0))
    expect(actions[1]).toEqual(changeHeat(2))
  })
})
