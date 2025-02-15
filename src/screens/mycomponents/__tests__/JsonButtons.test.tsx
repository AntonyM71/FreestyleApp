/* eslint-disable testing-library/prefer-presence-queries */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Dimensions } from "react-native";
import MoveButtons from "../JsonButtons";
import * as selectors from "../../../selectors";
// Mock the move list data
jest.mock("../../../data/moves_lists/move_list", () => ({
  entry: [{
    Move: "Entry Move 1",
    Value: 30,
    Clean: 10,
    SuperClean: 10,
    Air: 10,
    Huge: 20,
    Link: 10,
    Reverse: false
  }],
  both: [
    {
      Move: "Both Move 1",
      Value: 30,
      Clean: 10,
      SuperClean: 10,
      Air: 10,
      Huge: 20,
      Link: 10,
      Reverse: false
    },
    {
      Move: "Both Move 2",
      Value: 30,
      Clean: 10,
      SuperClean: 10,
      Air: 10,
      Huge: 20,
      Link: 10,
      Reverse: true
    }
  ],
  hole: [{
    Move: "Hole Move 1",
    Value: 30,
    Clean: 10,
    SuperClean: 10,
    Air: 10,
    Huge: 20,
    Link: 10,
    Reverse: false
  }],
  wave: [{
    Move: "Wave Move 1",
    Value: 30,
    Clean: 10,
    SuperClean: 10,
    Air: 10,
    Huge: 20,
    Link: 10,
    Reverse: true
  }],
  nfl: [{
    Move: "NFL Move 1",
    Value: 30,
    Clean: 10,
    SuperClean: 10,
    Air: 10,
    Huge: 20,
    Link: 10,
    Reverse: false
  }],
  trophy: [{
    Move: "Trophy Move 1",
    Value: 30,
    Clean: 10,
    SuperClean: 10,
    Air: 10,
    Huge: 20,
    Link: 10,
    Reverse: false
  }]
}));

// Mock the Dimensions API

jest.spyOn(Dimensions, "get").mockReturnValue({
  width: 400,
  height: 800,
  scale: 1,
  fontScale: 1
});

describe("MoveButtons", () => {
  const mockStore = configureStore([]);
  const defaultState: {
    paddlers: {
      paddlerScores: Record<string, Record<number, Record<string, {
        left: { scored: boolean; clean: boolean; superClean: boolean; air: boolean; huge: boolean; link: boolean };
        right: { scored: boolean; clean: boolean; superClean: boolean; air: boolean; huge: boolean; link: boolean };
      }>>>;
      paddlerIndex: number;
      currentHeat: number;
      paddlersInHeat: {
        name: string;
        category: string;
        heat: number;
      }[];
    };
  } = {
    paddlers: {
      paddlerScores: {
        "Test Paddler": {
          1: {
            "Entry Move 1": {
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            },
            "Both Move 1": {
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            },
            "Both Move 2": {
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            },
            "Hole Move 1": {
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            },
            "Wave Move 1": {
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            },
            "NFL Move 1": {
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            },
            "Trophy Move 1": {
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            }
          }
        }
      },
      paddlerIndex: 0,
      currentHeat: 1,
      paddlersInHeat: [{
        name: "Test Paddler",
        category: "Test Category",
        heat: 1
      }]
    }
  }

  beforeEach(() => {
    // Mock all required selectors
    jest.spyOn(selectors, "getCurrentRun").mockReturnValue(1);
    jest.spyOn(selectors, "getCurrentPaddler").mockReturnValue({
      name: "Test Paddler",
      category: "Test Category",
      heat: 1
    });
    jest.spyOn(selectors, "getNumberOfPaddlersInHeat").mockReturnValue(1);
    jest.spyOn(selectors, "getAvailableMovesForPaddler").mockReturnValue({
      hole: true,
      wave: true,
      nfl: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should hide moves section when there are no paddlers", () => {
    jest.spyOn(selectors, "getNumberOfPaddlersInHeat").mockReturnValue(0);
    const store = mockStore(defaultState);
    render(
      <Provider store={store}>
        <MoveButtons />
      </Provider>
    );

    expect(screen.queryByText(/Entry Move 1/)).toBeNull();
    expect(screen.queryByText(/Both Move 1/)).toBeNull();
  });

  it("should display entry moves for current paddler", () => {
    const store = mockStore(defaultState);
    render(
      <Provider store={store}>
        <MoveButtons />
      </Provider>
    );

    expect(screen.getByText(/Entry Move 1/)).toBeTruthy();
  });

  it("should display both-side moves with left/right options", () => {
    const store = mockStore(defaultState);
    render(
      <Provider store={store}>
        <MoveButtons />
      </Provider>
    );

    // Both Move 2 is reversible, so it should appear twice
    const bothMove2Buttons = screen.getAllByText(/Both Move 2/);
    expect(bothMove2Buttons).toHaveLength(2);
  });

  it("should only show available move types", () => {
    jest.spyOn(selectors, "getAvailableMovesForPaddler").mockReturnValue({
      hole: true,
      wave: false,
      nfl: false
    });

    const store = mockStore(defaultState);
    render(
      <Provider store={store}>
        <MoveButtons />
      </Provider>
    );

    // Should show hole moves
    expect(screen.getByText(/Hole Move 1/)).toBeTruthy();

    // Should not show wave or NFL moves
    expect(screen.queryByText(/Wave Move 1/)).toBeNull();
    expect(screen.queryByText(/NFL Move 1/)).toBeNull();
  });

  it("should adjust layout based on screen size", () => {
    // Test small screen first
    const store = mockStore(defaultState);
    const { rerender } = render(
      <Provider store={store}>
        <MoveButtons />
      </Provider>
    );

    const getButtonStyle = () => {
      // Find the container by testID since we need the container's width
      const containers = screen.getAllByTestId("normal-button-container");

      return containers[0].props.style;
    };

    // Small screen should use 50% width
    expect(getButtonStyle()).toMatchObject({ width: "50%" });

    // Test large screen
    jest.spyOn(Dimensions, "get").mockReturnValue({
      width: 800,
      height: 1200,
      scale: 1,
      fontScale: 1
    });

    rerender(
      <Provider store={store}>
        <MoveButtons />
      </Provider>
    );

    // Large screen should use 25% width
    expect(getButtonStyle()).toMatchObject({ width: "25%" });
  });

  it("should handle entry move button interactions", () => {
    const store = mockStore(defaultState);
    render(
      <Provider store={store}>
        <MoveButtons />
      </Provider>
    );

    // Press an entry move button
    fireEvent.press(screen.getByText(/Entry Move 1/));

    // Verify the action was dispatched
    const actions = store.getActions();
    expect(actions[0]).toMatchObject({
      type: "UPDATE_PADDLER_SCORES",
      payload: expect.any(Object)
    });
  });

  it("should handle reversible move button interactions", () => {
    const store = mockStore(defaultState);
    render(
      <Provider store={store}>
        <MoveButtons />
      </Provider>
    );

    // Both Move 2 is reversible, so test both left and right buttons
    const [leftButton, rightButton] = screen.getAllByText(/Both Move 2/);

    // Press left side button
    fireEvent.press(leftButton);
    expect(store.getActions()[0]).toMatchObject({
      type: "UPDATE_PADDLER_SCORES",
      payload: expect.any(Object)
    });

    // Press right side button
    fireEvent.press(rightButton);
    expect(store.getActions()[1]).toMatchObject({
      type: "UPDATE_PADDLER_SCORES",
      payload: expect.any(Object)
    });
  });
});
