import React from "react"
import { fireEvent, render, screen } from "@testing-library/react-native"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { PaddlerHeatManagerPresentation } from "../categoryManager"
import { addOrRemoveCategory, addOrRemovePaddlerName } from "../../../actions"

const mockStore = configureStore([])

jest.mock("../enabledMoves", () => ({
  __esModule: true,
  default: () => null
}))

describe("CategoryManager", () => {
  const mockCategories = [
    {
      name: "Category1",
      availableMoves: { hole: true, wave: true, nfl: false }
    }
  ]

  const mockPaddlers = [
    { name: "Paddler1", category: "Category1", heat: 1 },
    { name: "Paddler2", category: "Category2", heat: 1 }
  ]

  it("renders category list correctly", () => {
    const initialState = {
      paddlers: {
        categories: mockCategories,
        paddlerList: []
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation />
      </Provider>
    )

    expect(screen.getByText("Category1")).toBeTruthy()
    expect(screen.getByText("Add New Category")).toBeTruthy()
  })

  it("handles adding new category", () => {
    const initialState = {
      paddlers: {
        categories: mockCategories,
        paddlerList: []
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation />
      </Provider>
    )

    const input = screen.getByPlaceholderText("New Category Name")
    fireEvent.changeText(input, "NewCategory")
    fireEvent(input, "onSubmitEditing")

    const actions = store.getActions()
    expect(actions).toHaveLength(1)
    expect(actions[0]).toEqual(
      addOrRemoveCategory([
        ...mockCategories,
        {
          name: "NewCategory",
          availableMoves: { hole: true, wave: true, nfl: false }
        }
      ])
    )
  })

  it("prevents adding duplicate category names", () => {
    const initialState = {
      paddlers: {
        categories: mockCategories,
        paddlerList: []
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation />
      </Provider>
    )

    const input = screen.getByPlaceholderText("New Category Name")
    fireEvent.changeText(input, "Category1")
    fireEvent(input, "onSubmitEditing")

    const actions = store.getActions()
    expect(actions).toHaveLength(0)
  })

  it("handles deleting category", () => {
    const initialState = {
      paddlers: {
        categories: mockCategories,
        paddlerList: mockPaddlers
      }
    }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <PaddlerHeatManagerPresentation />
      </Provider>
    )

    const deleteButton = screen.getByText("Delete")
    fireEvent.press(deleteButton)

    const actions = store.getActions()
    expect(actions).toHaveLength(2)
    expect(actions[0]).toEqual(addOrRemoveCategory([]))
    expect(actions[1]).toEqual(
      addOrRemovePaddlerName([
        { name: "Paddler1", category: "", heat: 1 },
        { name: "Paddler2", category: "Category2", heat: 1 }
      ])
    )
  })
})
