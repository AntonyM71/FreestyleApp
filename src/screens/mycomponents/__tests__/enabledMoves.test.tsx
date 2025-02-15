import React from "react"
import { render, fireEvent, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import EnabledMoves from "../enabledMoves"
import { addOrRemoveCategory, changeRun, updatePaddlerScores } from "../../../actions"
import { initialScoresheet } from "../makePaddlerScores"
import { styles } from "../../../styles"
import { IPaddlerScores } from "../../../reducers"

const mockStore = configureStore([])

describe("EnabledMoves", () => {
  const mockCategory = {
    name: "Test Category",
    availableMoves: {
      hole: true,
      wave: false,
      nfl: true
    }
  }

  const mockPaddlers = [
    { name: "Paddler1", category: "Test Category", heat: 1 },
    { name: "Paddler2", category: "Test Category", heat: 1 }
  ]

  const mockCategories = [mockCategory]

  it("renders all move buttons correctly", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        categories: mockCategories
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <EnabledMoves category={mockCategory} />
      </Provider>
    )

    expect(screen.getByText("Hide hole")).toBeTruthy()
    expect(screen.getByText("Show wave")).toBeTruthy()
    expect(screen.getByText("Hide nfl")).toBeTruthy()
  })

  it("applies correct styles based on move state", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        categories: mockCategories
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <EnabledMoves category={mockCategory} />
      </Provider>
    )

    const holeButton = screen.getByText("Hide hole").parent.parent
    const waveButton = screen.getByText("Show wave").parent.parent
    const nflButton = screen.getByText("Hide nfl").parent.parent

    expect(holeButton.props.style).toMatchObject(styles.moveScored)
    expect(waveButton.props.style).toMatchObject(styles.noMove)
    expect(nflButton.props.style).toMatchObject(styles.moveScored)
  })

  it("dispatches correct actions when move button is pressed", () => {
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        categories: mockCategories
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <EnabledMoves category={mockCategory} />
      </Provider>
    )

    const holeButton = screen.getByText("Hide hole")
    fireEvent.press(holeButton)

    const expectedNewCategory = {
      ...mockCategory,
      availableMoves: {
        ...mockCategory.availableMoves,
        hole: false
      }
    }

    const expectedScoresheet: IPaddlerScores = {}
    mockPaddlers.forEach((paddler) => {
      expectedScoresheet[paddler.name] = [initialScoresheet()]
    })

    const actions = store.getActions()
    expect(actions).toHaveLength(3)
    expect(actions[0]).toEqual(addOrRemoveCategory([expectedNewCategory]))
    expect(actions[1]).toEqual(changeRun(0))
    expect(actions[2]).toEqual(updatePaddlerScores(expectedScoresheet))
  })

  it("handles multiple move toggles correctly", () => {
    // Initial state with hole enabled and wave disabled
    const initialState = {
      paddlers: {
        paddlerList: mockPaddlers,
        categories: [{
          name: "Test Category",
          availableMoves: {
            hole: true,
            wave: false,
            nfl: true
          }
        }]
      }
    }
    const store = mockStore(initialState)

    const { rerender } = render(
      <Provider store={store}>
        <EnabledMoves category={initialState.paddlers.categories[0]} />
      </Provider>
    )

    // First toggle - hole from true to false
    const hideHoleButton = screen.getByText("Hide hole")
    fireEvent.press(hideHoleButton)

    // Update store state to reflect first toggle
    const stateAfterFirstToggle = {
      paddlers: {
        paddlerList: mockPaddlers,
        categories: [{
          name: "Test Category",
          availableMoves: {
            hole: false,
            wave: false,
            nfl: true
          }
        }]
      }
    }
    // Save first store's actions
    const firstStoreActions = store.getActions()
    const store2 = mockStore(stateAfterFirstToggle)

    // Re-render with updated state
    rerender(
      <Provider store={store2}>
        <EnabledMoves category={stateAfterFirstToggle.paddlers.categories[0]} />
      </Provider>
    )

    // Second toggle - wave from false to true
    fireEvent.press(screen.getByText("Show wave"))

    // Verify all dispatched actions
    const allActions = [...firstStoreActions, ...store2.getActions()]
    expect(allActions).toHaveLength(6) // 2 toggles * 3 actions each

    // First toggle actions
    const firstToggleActions = store.getActions()
    expect(firstToggleActions[0]).toEqual(
      addOrRemoveCategory([{
        name: "Test Category",
        availableMoves: {
          hole: false,
          wave: false,
          nfl: true
        }
      }])
    )
    expect(firstToggleActions[1]).toEqual(changeRun(0))
    const expectedScoresheet1: IPaddlerScores = {}
    mockPaddlers.forEach((paddler) => {
      expectedScoresheet1[paddler.name] = [initialScoresheet()]
    })
    expect(firstToggleActions[2]).toEqual(updatePaddlerScores(expectedScoresheet1))

    // Second toggle actions
    const secondToggleActions = store2.getActions()
    expect(secondToggleActions[0]).toEqual(
      addOrRemoveCategory([{
        name: "Test Category",
        availableMoves: {
          hole: false,
          wave: true,
          nfl: true
        }
      }])
    )
    expect(secondToggleActions[1]).toEqual(changeRun(0))
    const expectedScoresheet2: IPaddlerScores = {}
    mockPaddlers.forEach((paddler) => {
      expectedScoresheet2[paddler.name] = [initialScoresheet()]
    })
    expect(secondToggleActions[2]).toEqual(updatePaddlerScores(expectedScoresheet2))
  })
})
