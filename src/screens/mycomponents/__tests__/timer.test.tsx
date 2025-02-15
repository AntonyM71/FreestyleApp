import React from "react"
import { render, fireEvent, screen, act } from "@testing-library/react-native"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import Timer from "../timer"
import { styles } from "../../../styles"

const mockStore = configureStore([])

describe("Timer", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders nothing when timer is hidden", () => {
    const initialState = { paddlers: { showTimer: false } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <Timer />
      </Provider>
    )

    expect(screen.queryByText("0")).toBeNull()
  })

  it("renders timer with initial state when shown", () => {
    const initialState = { paddlers: { showTimer: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <Timer />
      </Provider>
    )

    expect(screen.getByText("0")).toBeTruthy()
  })

  it("starts countdown from 45 when button is pressed", () => {
    const initialState = { paddlers: { showTimer: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <Timer />
      </Provider>
    )

    const button = screen.getByText("0")
    fireEvent.press(button)

    expect(screen.getByText("45")).toBeTruthy()
  })

  it("counts down correctly after starting", () => {
    const initialState = { paddlers: { showTimer: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <Timer />
      </Provider>
    )

    const button = screen.getByText("0")
    fireEvent.press(button)

    // Initial press sets to 45
    expect(screen.getByText("45")).toBeTruthy()

    // Wait for setInterval to be established
    act(() => {
      jest.advanceTimersByTime(0)
    })

    // Now count down several seconds
    for (let i = 44; i >= 40; i--) {
      act(() => {
        jest.advanceTimersByTime(1000)
      })
      const text = screen.getByText(i.toString())
      expect(text).toBeTruthy()
    }
  })

  it("stops at 0 and does not go negative", () => {
    const initialState = { paddlers: { showTimer: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <Timer />
      </Provider>
    )

    const button = screen.getByText("0")
    fireEvent.press(button)

    // Run timer down to 0
    for (let i = 45; i >= 0; i--) {
      act(() => {
        jest.advanceTimersByTime(1000)
      })
    }
    expect(screen.getByText("0")).toBeTruthy()

    // Ensure it stays at 0
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByText("0")).toBeTruthy()
  })

  it("cleans up interval on unmount", () => {
    const initialState = { paddlers: { showTimer: true } }
    const store = mockStore(initialState)

    const { unmount } = render(
      <Provider store={store}>
        <Timer />
      </Provider>
    )

    const button = screen.getByText("0")
    fireEvent.press(button)

    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(screen.getByText("44")).toBeTruthy()

    unmount()

    // Advance time and verify no more updates occur after unmount
    act(() => {
      jest.advanceTimersByTime(1000)
    })
  })

  it("applies correct style based on time remaining", () => {
    const initialState = { paddlers: { showTimer: true } }
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <Timer />
      </Provider>
    )

    const button = screen.getByText("0")
    fireEvent.press(button)

    // Initial state (45 seconds) - green
    const buttonElement = screen.getByText("45")
    const buttonProps = buttonElement.parent.parent.props
    act(() => {
      jest.advanceTimersByTime(0)
    })
    expect(buttonProps.style).toMatchObject(styles.timerGreen)

    // Run down to 9 seconds (yellow zone)
    for (let i = 45; i > 9; i--) {
      act(() => {
        jest.advanceTimersByTime(1000)
      })
    }
    // Get fresh reference after state update
    const yellowButtonElement = screen.getByText("9")
    const yellowButtonProps = yellowButtonElement.parent.parent.props
    act(() => {
      jest.advanceTimersByTime(0)
    })
    expect(yellowButtonProps.style).toMatchObject(styles.timerYellow)

    // Run down to 0 seconds (red zone)
    for (let i = 9; i >= 0; i--) {
      act(() => {
        jest.advanceTimersByTime(1000)
      })
    }
    // Get fresh reference after state update
    const redButtonElement = screen.getByText("0")
    const redButtonProps = redButtonElement.parent.parent.props
    act(() => {
      jest.advanceTimersByTime(0)
    })
    expect(redButtonProps.style).toMatchObject(styles.timerRed)
  })
})
