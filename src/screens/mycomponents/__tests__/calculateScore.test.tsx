/* eslint-disable testing-library/prefer-presence-queries, testing-library/prefer-screen-queries */
import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { DisplayScore } from "../calculateScore";
import * as selectors from "../../../selectors";
import { IPaddlerScores, MoveType } from "../../../reducers";
import { moveSideInterface, dataSourceMoveInterface } from "../makePaddlerScores";

// Test data
const mockMoves: dataSourceMoveInterface[] = [
  {
    Move: "Move1",
    Value: 10,
    Clean: 5,
    SuperClean: 10,
    Air: 5,
    Huge: 10,
    Link: 5,
    Reverse: false
  },
  {
    Move: "Move2",
    Value: 15,
    Clean: 7,
    SuperClean: 15,
    Air: 7,
    Huge: 15,
    Link: 7,
    Reverse: true
  }
];

const defaultSide: moveSideInterface = {
  scored: false,
  air: false,
  huge: false,
  clean: false,
  superClean: false,
  link: false
};

// Mock the makePaddlerScores module
jest.mock("../makePaddlerScores", () => ({
  __esModule: true,
  moveListArray: [
    {
      Move: "Move1",
      Value: 10,
      Clean: 5,
      SuperClean: 10,
      Air: 5,
      Huge: 10,
      Link: 5,
      Reverse: false
    }
  ],
  initialScoresheet: () => ({
    Move1: {
      id: "Move1",
      left: { ...defaultSide },
      right: { ...defaultSide }
    }
  })
}));

// Mock move_list module
jest.mock("../../../data/moves_lists/move_list", () => ({
  __esModule: true,
  default: {
    entry: [
      {
        Move: "Move1",
        Value: 10,
        Clean: 5,
        SuperClean: 10,
        Air: 5,
        Huge: 10,
        Link: 5,
        Reverse: false
      }
    ],
    both: [],
    wave: [],
    hole: [],
    trophy: [],
    nfl: []
  }
}));

describe("DisplayScore Component", () => {
  const mockStore = configureStore([]);
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Given no scores exist", () => {
    it("should display 0", () => {
      jest.spyOn(selectors, "getScoresState").mockReturnValue({});

      const store = mockStore({});
      render(
        <Provider store={store}>
          <DisplayScore paddler="paddler1" run={0} />
        </Provider>
      );

      expect(screen.getByText("0")).toBeTruthy();
    });
  });

  describe("Given a basic move score", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should calculate score without bonuses", () => {
      const mockScores: IPaddlerScores = {
        paddler1: [
          {
            Move1: {
              id: "Move1",
              left: { scored: true, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            } as MoveType,
            Move2: {
              id: "Move2",
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            } as MoveType
          }
        ]
      };

      jest.spyOn(selectors, "getScoresState").mockReturnValue(mockScores);

      const store = mockStore({});
      render(
        <Provider store={store}>
          <DisplayScore paddler="paddler1" run={0} />
        </Provider>
      );

      expect(screen.getByText("10")).toBeTruthy(); // Just the base value of Move1
    });
  });

  describe("Given a move with all bonuses", () => {
    it("should calculate total score including all bonuses", () => {
      const mockScores: IPaddlerScores = {
        paddler1: [
          {
            Move1: {
              id: "Move1",
              left: { scored: true, clean: true, superClean: true, air: true, huge: true, link: true },
              right: { scored: true, clean: true, superClean: true, air: true, huge: true, link: true }
            } as MoveType,
            Move2: {
              id: "Move2",
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            } as MoveType
          }
        ]
      };

      jest.spyOn(selectors, "getScoresState").mockReturnValue(mockScores);

      const store = mockStore({});
      render(
        <Provider store={store}>
          <DisplayScore paddler="paddler1" run={0} />
        </Provider>
      );

      // Each side should be: base(10) + clean(5) + superClean(10) + air(5) + huge(10) + link(5) = 45
      // Total for both sides: 45 + 45 = 90
      expect(screen.getByText("90")).toBeTruthy();
    });
  });

  describe("Given a move with huge bonus", () => {
    it("should automatically add air bonus when huge is true", () => {
      const mockScores: IPaddlerScores = {
        paddler1: [
          {
            Move1: {
              id: "Move1",
              left: { scored: true, clean: false, superClean: false, air: false, huge: true, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            } as MoveType,
            Move2: {
              id: "Move2",
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            } as MoveType
          }
        ]
      };

      jest.spyOn(selectors, "getScoresState").mockReturnValue(mockScores);

      const store = mockStore({});
      render(
        <Provider store={store}>
          <DisplayScore paddler="paddler1" run={0} />
        </Provider>
      );

      // Base(10) + huge(10) + air(5) = 25
      expect(screen.getByText("25")).toBeTruthy();
    });
  });

  describe("Given edge cases", () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it("should handle undefined paddler scores", () => {
      jest.spyOn(selectors, "getScoresState").mockReturnValue({});

      const store = mockStore({});
      render(
        <Provider store={store}>
          <DisplayScore paddler="nonexistent" run={0} />
        </Provider>
      );

      expect(screen.getByText("0")).toBeTruthy();
    });

    it("should handle undefined run", () => {
      const mockScores: IPaddlerScores = {
        paddler1: []
      };
      jest.spyOn(selectors, "getScoresState").mockReturnValue(mockScores);

      const store = mockStore({});
      render(
        <Provider store={store}>
          <DisplayScore paddler="paddler1" run={999} />
        </Provider>
      );

      expect(screen.getByText("0")).toBeTruthy();
    });

    it("should handle undefined moveListArray", () => {
      jest.mock("../makePaddlerScores", () => ({
        moveListArray: undefined,
        initialScoresheet: () => ({})
      }));

      const mockScores: IPaddlerScores = {
        paddler1: [
          {
            Move1: {
              id: "Move1",
              left: { scored: true, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            } as MoveType
          }
        ]
      };

      jest.spyOn(selectors, "getScoresState").mockReturnValue(mockScores);

      const store = mockStore({});
      render(
        <Provider store={store}>
          <DisplayScore paddler="paddler1" run={999} />
        </Provider>
      );

      expect(screen.getByText("0")).toBeTruthy();
    });

    it("should handle malformed move data", () => {
      const mockScores: IPaddlerScores = {
        paddler1: [
          {
            Move1: {
              id: "Move1",
              left: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false },
              right: { scored: false, clean: false, superClean: false, air: false, huge: false, link: false }
            } as MoveType
          }
        ]
      };

      // Re-mock the module for this test
      jest.resetModules();
      jest.mock("../makePaddlerScores", () => ({
        __esModule: true,
        moveListArray: [],
        initialScoresheet: () => ({})
      }));

      jest.spyOn(selectors, "getScoresState").mockReturnValue(mockScores);

      const store = mockStore({});
      render(
        <Provider store={store}>
          <DisplayScore paddler="paddler1" run={0} />
        </Provider>
      );

      expect(screen.getByText("0")).toBeTruthy();
    });
  });
});
