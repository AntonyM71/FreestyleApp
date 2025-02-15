import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native"
import { Provider } from "react-redux"
import { createStore, Store } from "redux"
import { PaddlerHeatManagerPresentation } from "../paddlerHeatManagementHandler"
import * as makePaddlerScores from "../makePaddlerScores"

// Mock initialScoresheet to return a simple test scoresheet
const mockScoresheet = {
  "Test Move": {
    id: "Test Move",
    left: {
      scored: false,
      air: false,
      huge: false,
      clean: false,
      superClean: false,
      link: false
    },
    right: {
      scored: false,
      air: false,
      huge: false,
      clean: false,
      superClean: false,
      link: false
    }
  }
}
jest.spyOn(makePaddlerScores, "initialScoresheet").mockReturnValue(mockScoresheet)
import { paddlerReducer, IPaddlerStateType } from "../../../reducers"

interface RootState {
  paddlers: IPaddlerStateType;
}

interface PaddlerAction {
  type: string;
  payload: any;
}

const createTestStore = (initialState: Partial<IPaddlerStateType>): Store<RootState> => {
  const fullInitialState = {
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
      heats: [],
      ...initialState
    }
  }

  const rootReducer = (state = fullInitialState, action: PaddlerAction): RootState => {
    if (!state.paddlers) {
      return state
    }

    return {
      paddlers: paddlerReducer(state.paddlers, action)
    }
  }

  return createStore(rootReducer, fullInitialState)
}

// Mock alert
global.alert = jest.fn()

describe("PaddlerHeatManagerPresentation", () => {
  const mockCategories = [
    {
      name: "category 1",
      availableMoves: { hole: true, wave: false, nfl: false }
    }
  ]

  const mockPaddlers = [
    { name: "paddler1", category: "category 1", heat: 1 }
  ]

  const mockScores = {
    paddler1: [mockScoresheet]
  }

  const defaultProps = {
    paddlerList: mockPaddlers,
    heatKey: 1
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders paddler list correctly", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation {...defaultProps} />
      </Provider>
    )

    expect(screen.getByText("Heat 1")).toBeTruthy()
    expect(screen.getByText("paddler1")).toBeTruthy()
    expect(screen.getByText("Delete")).toBeTruthy()
    expect(screen.getByPlaceholderText("New Paddler Name")).toBeTruthy()
  })

  it("handles adding new paddler", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    const { rerender } = render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation {...defaultProps} />
      </Provider>
    )

    const input = screen.getByPlaceholderText("New Paddler Name")
    fireEvent.changeText(input, "NewPaddler")
    fireEvent(input, "onSubmitEditing")

    // Need to rerender since the component uses props for rendering
    rerender(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation
          paddlerList={[...mockPaddlers, { name: "NewPaddler", category: "", heat: 1 }]}
          heatKey={1}
        />
      </Provider>
    )

    const state = store.getState().paddlers

    // Verify state updates
    expect(state.paddlerList).toContainEqual({
      name: "NewPaddler",
      category: "",
      heat: 1
    })
    expect(state.paddlerScores.NewPaddler).toBeDefined()
    expect(state.paddlerScores.NewPaddler).toHaveLength(2)

    // Verify UI updates
    expect(screen.getByText("NewPaddler")).toBeTruthy()
  })

  it("prevents adding duplicate paddler names", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation {...defaultProps} />
      </Provider>
    )

    const input = screen.getByPlaceholderText("New Paddler Name")
    fireEvent.changeText(input, "paddler1")
    fireEvent(input, "onSubmitEditing")

    expect(alert).toHaveBeenCalledWith("You've already added this paddler")

    const state = store.getState().paddlers
    // Verify state remains unchanged
    expect(state.paddlerList).toEqual(mockPaddlers)
    expect(state.paddlerScores).toEqual(mockScores)
  })

  it("prevents adding empty paddler names", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation {...defaultProps} />
      </Provider>
    )

    const input = screen.getByPlaceholderText("New Paddler Name")
    fireEvent.changeText(input, "")
    fireEvent(input, "onSubmitEditing")

    expect(alert).toHaveBeenCalledWith("People like having names :)")

    const state = store.getState().paddlers
    // Verify state remains unchanged
    expect(state.paddlerList).toEqual(mockPaddlers)
    expect(state.paddlerScores).toEqual(mockScores)
  })

  it("handles deleting paddler", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    const { rerender } = render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation {...defaultProps} />
      </Provider>
    )

    const deleteButton = screen.getByText("Delete")
    fireEvent.press(deleteButton)

    // Need to rerender with empty paddler list since component uses props
    rerender(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation
          paddlerList={[]}
          heatKey={1}
        />
      </Provider>
    )

    const state = store.getState().paddlers

    // Verify state updates
    expect(state.paddlerList).toHaveLength(0)
    expect(state.paddlerScores).toEqual(mockScores)

    // Verify UI updates
    expect(screen.queryByText("paddler1")).toBeNull()
  })

  it("handles changing paddler category", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    const { rerender } = render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation {...defaultProps} />
      </Provider>
    )

    const picker = screen.getByTestId("category-picker")
    fireEvent(picker, "onValueChange", mockCategories[0].name)

    const state = store.getState().paddlers

    // Verify state updates
    expect(state.paddlerList[0].category).toBe("category 1")
    // Component resets scoresheet when category changes
    // numberOfRuns + 1 scoresheets are created
    const expectedScores = Array(initialState.numberOfRuns + 1)
      .fill(null)
      .map(() => ({ ...mockScoresheet }))
    expect(state.paddlerScores.paddler1).toEqual(expectedScores)


  })
})
