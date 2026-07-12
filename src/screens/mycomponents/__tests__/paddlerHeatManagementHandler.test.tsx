import { fireEvent, render, screen } from "@testing-library/react-native"
import React from "react"
import { Provider as PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import { createStore, Store } from "redux"

import * as makePaddlerScores from "../makePaddlerScores"
import { PaddlerHeatManagerPresentation } from "../paddlerHeatManagementHandler"

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
      link: false,
      style: false
    },
    right: {
      scored: false,
      air: false,
      huge: false,
      clean: false,
      superClean: false,
      link: false,
      style: false
    }
  }
}
jest.spyOn(makePaddlerScores, "initialScoresheet").mockReturnValue(mockScoresheet)
import { IPaddlerStateType,paddlerReducer } from "../../../reducers"

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

const safeAreaMetrics = {
  frame: { x: 0, y: 0, width: 320, height: 640 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 }
}

const renderWithProviders = (
  ui: React.ReactElement,
  store: Store<RootState>
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <SafeAreaProvider initialMetrics={safeAreaMetrics}>
        <PaperProvider>
          <Provider store={store}>{children}</Provider>
        </PaperProvider>
      </SafeAreaProvider>
    )
  })

// Mock alert
global.alert = jest.fn()

const CATEGORY_ONE = "category 1"
const NEW_PADDLER_PLACEHOLDER = "New Paddler Name"

describe("PaddlerHeatManagerPresentation", () => {
  const mockCategories = [
    {
      name: CATEGORY_ONE,
      availableMoves: { hole: true, wave: false, nfl: false }
    }
  ]

  const mockPaddlers = [
    { name: "paddler1", category: CATEGORY_ONE, heat: 1 }
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

    renderWithProviders(<PaddlerHeatManagerPresentation {...defaultProps} />, store)

    expect(screen.getByText("Heat 1")).toBeTruthy()
    expect(screen.getByText("paddler1")).toBeTruthy()
    expect(screen.getByText("Delete")).toBeTruthy()
    expect(screen.getByPlaceholderText(NEW_PADDLER_PLACEHOLDER)).toBeTruthy()
  })

  it("handles adding new paddler", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    const { rerender } = renderWithProviders(
      <PaddlerHeatManagerPresentation {...defaultProps} />,
      store
    )

    const input = screen.getByPlaceholderText(NEW_PADDLER_PLACEHOLDER)
    fireEvent.changeText(input, "NewPaddler")
    fireEvent(input, "onSubmitEditing")

    // Need to rerender since the component uses props for rendering
    rerender(
      <PaddlerHeatManagerPresentation
        paddlerList={[...mockPaddlers, { name: "NewPaddler", category: "", heat: 1 }]}
        heatKey={1}
      />
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

    renderWithProviders(<PaddlerHeatManagerPresentation {...defaultProps} />, store)

    const input = screen.getByPlaceholderText(NEW_PADDLER_PLACEHOLDER)
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

    renderWithProviders(<PaddlerHeatManagerPresentation {...defaultProps} />, store)

    const input = screen.getByPlaceholderText(NEW_PADDLER_PLACEHOLDER)
    fireEvent.changeText(input, "")
    fireEvent(input, "onSubmitEditing")

    expect(alert).toHaveBeenCalledWith("People like having names :)")

    const state = store.getState().paddlers
    // Verify state remains unchanged
    expect(state.paddlerList).toEqual(mockPaddlers)
    expect(state.paddlerScores).toEqual(mockScores)
  })

  it("handles deleting paddler when confirmed", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    const { rerender } = renderWithProviders(
      <PaddlerHeatManagerPresentation {...defaultProps} />,
      store
    )

    // Press Delete to open the confirmation modal
    const deleteButton = screen.getByText("Delete")
    fireEvent.press(deleteButton)

    // Confirm the deletion
    const confirmButton = screen.getByText("Confirm")
    fireEvent.press(confirmButton)

    // Need to rerender with empty paddler list since component uses props
    rerender(
      <PaddlerHeatManagerPresentation
        paddlerList={[]}
        heatKey={1}
      />
    )

    const state = store.getState().paddlers

    // Verify state updates
    expect(state.paddlerList).toHaveLength(0)
    expect(state.paddlerScores).toEqual(mockScores)

    // Verify UI updates
    expect(screen.queryByText("paddler1")).toBeNull()
  })

  it("does not delete paddler when confirmation is cancelled", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    renderWithProviders(
      <PaddlerHeatManagerPresentation {...defaultProps} />,
      store
    )

    // Press Delete to open the confirmation modal
    const deleteButton = screen.getByText("Delete")
    fireEvent.press(deleteButton)

    // Cancel the deletion
    const cancelButton = screen.getByText("Cancel")
    fireEvent.press(cancelButton)

    const state = store.getState().paddlers

    // Verify state is unchanged
    expect(state.paddlerList).toEqual(mockPaddlers)
    expect(state.paddlerScores).toEqual(mockScores)
  })

  it("handles changing paddler category", () => {
    const paddlerWithNoCategory = { name: "paddler1", category: "", heat: 1 }
    const initialState = {
      categories: mockCategories,
      paddlerList: [paddlerWithNoCategory],
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    renderWithProviders(
      <PaddlerHeatManagerPresentation
        paddlerList={[paddlerWithNoCategory]}
        heatKey={1}
      />,
      store
    )

    const picker = screen.getByTestId("category-picker")
    fireEvent.press(picker)

    const option = screen.getByTestId(`category-option-${mockCategories[0].name}-paddler1`)
    fireEvent.press(option)

    const state = store.getState().paddlers

    // Verify state updates
    expect(state.paddlerList[0].category).toBe(CATEGORY_ONE)
    // Component resets scoresheet when category changes
    // numberOfRuns + 1 scoresheets are created
    const expectedScores = Array(initialState.numberOfRuns + 1)
      .fill(null)
      .map(() => ({ ...mockScoresheet }))
    expect(state.paddlerScores.paddler1).toEqual(expectedScores)
  })

  it("shows inline duplicate-name error text when an existing name is typed", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    renderWithProviders(<PaddlerHeatManagerPresentation {...defaultProps} />, store)

    const input = screen.getByPlaceholderText(NEW_PADDLER_PLACEHOLDER)
    fireEvent.changeText(input, "paddler1")

    // HelperText with the inline error message should be visible
    expect(screen.getByText("Paddler already exists")).toBeTruthy()
  })

  it("shows no inline error when a unique name is typed", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    renderWithProviders(<PaddlerHeatManagerPresentation {...defaultProps} />, store)

    const input = screen.getByPlaceholderText(NEW_PADDLER_PLACEHOLDER)
    fireEvent.changeText(input, "brand new paddler")

    // TextInput error prop should be false when the name is not a duplicate
    expect(input.props.error).toBeFalsy()
  })

  it("derives category picklist from paddler categories when no configured categories exist", () => {
    const paddlersWithCategories = [
      { name: "paddler1", category: "SlalomPro", heat: 1 },
      { name: "paddler2", category: "FreestylePro", heat: 1 }
    ]
    const initialState = {
      categories: [], // no configured categories
      paddlerList: paddlersWithCategories,
      paddlerScores: {
        paddler1: [mockScoresheet],
        paddler2: [mockScoresheet]
      },
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    renderWithProviders(
      <PaddlerHeatManagerPresentation
        paddlerList={paddlersWithCategories}
        heatKey={1}
      />,
      store
    )

    const picker = screen.getAllByTestId("category-picker")[0]
    fireEvent.press(picker)

    expect(screen.getByTestId("category-option-SlalomPro-paddler1")).toBeTruthy()
    expect(screen.getByTestId("category-option-FreestylePro-paddler1")).toBeTruthy()
  })

  it("clears the input field after a paddler is successfully added", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    renderWithProviders(<PaddlerHeatManagerPresentation {...defaultProps} />, store)

    const input = screen.getByPlaceholderText(NEW_PADDLER_PLACEHOLDER)
    fireEvent.changeText(input, "BrandNewPaddler")
    fireEvent(input, "onSubmitEditing")

    // After adding, the input should be cleared
    expect(input.props.value).toBe("")
  })

  it("shows the paddler name in the delete confirmation modal message", () => {
    const initialState = {
      categories: mockCategories,
      paddlerList: mockPaddlers,
      paddlerScores: mockScores,
      numberOfRuns: 1
    }
    const store = createTestStore(initialState)

    renderWithProviders(<PaddlerHeatManagerPresentation {...defaultProps} />, store)

    const deleteButton = screen.getByText("Delete")
    fireEvent.press(deleteButton)

    expect(
      screen.getByText("Are you sure you want to delete paddler1?")
    ).toBeTruthy()
  })
})
