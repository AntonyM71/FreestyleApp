import React from "react"
import { render, fireEvent, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { PaddlerHandler } from "../paddlerHandler"
import {
  changePaddler,
  changeRun,
  changeNumberOfRuns,
  updatePaddlerScores
} from "../../../actions"
import { styles } from "../../../styles"
import { initialScoresheet } from "../makePaddlerScores"

const mockStore = configureStore([])

jest.mock("../calculateScore", () => ({
  DisplayScore: () => null
}))

describe("PaddlerHandler", () => {
  const mockPaddlers = [
    { name: "Paddler1", category: "Category1", heat: 1 },
    { name: "Paddler2", category: "Category1", heat: 1 }
  ]

  const mockScores = {
    Paddler1: [initialScoresheet()],
    Paddler2: [initialScoresheet()]
  }

  it("renders message when heat has no paddlers", () => {
    const initialState = {
      paddlers: {
        paddlerList: [],
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 0,
        numberOfRuns: 1,
        showRunHandler: true,
        paddlerScores: {}
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    expect(screen.getByText("This heat has no paddlers.")).toBeTruthy()
  })

  it("renders correctly with paddlers", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 0,
        numberOfRuns: 1,
        showRunHandler: true,
        paddlerScores: mockScores
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    expect(screen.getByText("Paddler1")).toBeTruthy()
    expect(screen.getByText("Last Paddler")).toBeTruthy()
    expect(screen.getByText("Next")).toBeTruthy()
  })

  it("applies correct styles to buttons", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 0,
        numberOfRuns: 1,
        showRunHandler: true,
        paddlerScores: mockScores
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    const lastButton = screen.getByText("Last Paddler").parent.parent
    const nextButton = screen.getByText("Next").parent.parent

    expect(lastButton.props.style).toMatchObject(styles.changeButton)
    expect(nextButton.props.style).toMatchObject(styles.changeButton)
  })

  it("handles next paddler button press correctly", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 0,
        numberOfRuns: 1,
        showRunHandler: true,
        paddlerScores: mockScores
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    const nextButton = screen.getByText("Next")
    fireEvent.press(nextButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(changePaddler(1))
  })

  it("wraps to first paddler when pressing next on last paddler", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 1,
        currentRun: 0,
        numberOfRuns: 1,
        showRunHandler: true,
        paddlerScores: mockScores
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    const nextButton = screen.getByText("Next")
    fireEvent.press(nextButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(changePaddler(0))
  })

  it("handles previous paddler button press correctly", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 1,
        currentRun: 0,
        numberOfRuns: 1,
        showRunHandler: true,
        paddlerScores: mockScores
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    const lastButton = screen.getByText("Last Paddler")
    fireEvent.press(lastButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(changePaddler(0))
  })

  it("wraps to last paddler when pressing previous on first paddler", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 0,
        numberOfRuns: 1,
        showRunHandler: true,
        paddlerScores: mockScores
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    const lastButton = screen.getByText("Last Paddler")
    fireEvent.press(lastButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(changePaddler(1))
  })

  it("handles next run button press within existing runs", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 0,
        numberOfRuns: 2,
        showRunHandler: true,
        paddlerScores: {
          Paddler1: [initialScoresheet(), initialScoresheet()],
          Paddler2: [initialScoresheet(), initialScoresheet()]
        }
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    const newRunButton = screen.getByText("New Run")
    fireEvent.press(newRunButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(changeRun(1))
  })

  it("creates new run when pressing next run on last run", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 1,
        numberOfRuns: 2,
        showRunHandler: true,
        paddlerScores: {
          Paddler1: [initialScoresheet(), initialScoresheet()],
          Paddler2: [initialScoresheet(), initialScoresheet()]
        }
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    const newRunButton = screen.getByText("New Run")
    fireEvent.press(newRunButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(3)
    expect(actions[0]).toEqual(changeNumberOfRuns(2))
    expect(actions[1]).toEqual(updatePaddlerScores({
      Paddler1: [initialScoresheet(), initialScoresheet(), initialScoresheet()],
      Paddler2: [initialScoresheet(), initialScoresheet(), initialScoresheet()]
    }))
    expect(actions[2]).toEqual(changeRun(2))
  })

  it("handles previous run button press correctly", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 1,
        numberOfRuns: 2,
        showRunHandler: true,
        paddlerScores: {
          Paddler1: [initialScoresheet(), initialScoresheet()],
          Paddler2: [initialScoresheet(), initialScoresheet()]
        }
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    const prevRunButton = screen.getByText("Prev Run")
    fireEvent.press(prevRunButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(changeRun(0))
  })

  it("stays on first run when pressing previous on first run", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 0,
        numberOfRuns: 2,
        showRunHandler: true,
        paddlerScores: {
          Paddler1: [initialScoresheet(), initialScoresheet()],
          Paddler2: [initialScoresheet(), initialScoresheet()]
        }
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    const prevRunButton = screen.getByText("Prev Run")
    fireEvent.press(prevRunButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(changeRun(0))
  })

  it("hides run handler when showRunHandler is false", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        currentHeat: 1,
        paddlerIndex: 0,
        currentRun: 0,
        numberOfRuns: 1,
        showRunHandler: false,
        paddlerScores: mockScores
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHandler />
      </Provider>
    )

    expect(screen.queryByText("New Run")).toBeNull()
    expect(screen.queryByText("Prev Run")).toBeNull()
  })
})
