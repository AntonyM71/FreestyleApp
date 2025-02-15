import { MovesList, IMoves } from "../../../data/moves_lists/move_list";
import { initialScoresheet, moveInterface, dataSourceMoveInterface } from "../makePaddlerScores";

type ScoreSheet = Record<string, moveInterface>;

// Mock the move_list module
jest.mock("../../../data/moves_lists/move_list", () => ({
  __esModule: true,
  default: {
    entry: [
      {
        Move: "TestMove1",
        Value: 10,
        Clean: 5,
        SuperClean: 10,
        Air: 5,
        Huge: 10,
        Link: 5,
        Reverse: false
      }
    ],
    both: [
      {
        Move: "TestMove2",
        Value: 20,
        Clean: 10,
        SuperClean: 15,
        Air: 10,
        Huge: 15,
        Link: 10,
        Reverse: true
      }
    ],
    wave: [],
    hole: [],
    trophy: [],
    nfl: []
  } as typeof MovesList
}));

describe("initialScoresheet", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("Given a move list with valid moves", () => {
    it("should initialize moves with correct default values", () => {
      // Arrange
      const expectedDefaults = {
        scored: false,
        air: false,
        huge: false,
        clean: false,
        superClean: false,
        link: false
      };

      // Act
      const result = initialScoresheet() as ScoreSheet;

      // Assert
      expect(result).toHaveProperty("TestMove1");
      expect(result).toHaveProperty("TestMove2");
      expect(result.TestMove1).toEqual({
        id: "TestMove1",
        left: expectedDefaults,
        right: expectedDefaults
      });
    });

    it("should create independent left/right objects for each move", () => {
      // Arrange
      const scoresheet = initialScoresheet() as ScoreSheet;
      const move = scoresheet.TestMove1;

      // Act
      move.left.scored = true;
      move.left.air = true;

      // Assert
      expect(move.left).toEqual({
        scored: true,
        air: true,
        huge: false,
        clean: false,
        superClean: false,
        link: false
      });
      expect(move.right).toEqual({
        scored: false,
        air: false,
        huge: false,
        clean: false,
        superClean: false,
        link: false
      });
    });

    it("should handle multiple moves correctly", () => {
      // Arrange & Act
      const result = initialScoresheet() as ScoreSheet;

      // Assert
      const moves = Object.keys(result);
      expect(moves).toHaveLength(2); // TestMove1 and TestMove2
      expect(moves).toContain("TestMove1");
      expect(moves).toContain("TestMove2");
    });
  });

  describe("Given edge cases", () => {
    it("should handle moves with different properties correctly", () => {
      // Arrange & Act
      const result = initialScoresheet() as ScoreSheet;
      const move1 = result.TestMove1;
      const move2 = result.TestMove2;

      // Assert
      expect(move1).toBeDefined();
      expect(move2).toBeDefined();
      expect(move1.id).toBe("TestMove1");
      expect(move2.id).toBe("TestMove2");
    });
  });
});
