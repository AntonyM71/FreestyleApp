import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { IPaddlerScores } from "../../reducers"
import { initialScoresheet } from "../../screens/mycomponents/makePaddlerScores"
import {
	calculatePaddlerRunScore,
	exportScoresToCsv,
	generateCsvContent
} from "../exportScores"

jest.mock("expo-file-system", () => ({
	__esModule: true,
	writeAsStringAsync: jest.fn().mockResolvedValue(undefined),
	cacheDirectory: "file:///cache/",
	EncodingType: { UTF8: "utf8" }
}))

jest.mock("expo-sharing", () => ({
	isAvailableAsync: jest.fn().mockResolvedValue(true),
	shareAsync: jest.fn().mockResolvedValue(undefined)
}))

jest.mock("../../screens/mycomponents/makePaddlerScores", () => ({
	moveListArray: [
		{
			Move: "TestMove",
			Value: 100,
			Clean: 10,
			SuperClean: 20,
			Air: 15,
			Huge: 25,
			Link: 5,
			Style: 10,
			Reverse: false
		}
	],
	initialScoresheet: jest.requireActual(
		"../../screens/mycomponents/makePaddlerScores"
	).initialScoresheet
}))

describe("calculatePaddlerRunScore", () => {
	const emptyScores: IPaddlerScores = {}

	it("returns 0 for empty scores", () => {
		expect(calculatePaddlerRunScore(emptyScores, "Paddler1", 0)).toBe(0)
	})

	it("returns 0 when paddler has no entry", () => {
		const scores: IPaddlerScores = {}
		expect(calculatePaddlerRunScore(scores, "Missing", 0)).toBe(0)
	})

	it("returns 0 when run index does not exist", () => {
		const scores: IPaddlerScores = {
			Paddler1: [initialScoresheet()]
		}
		expect(calculatePaddlerRunScore(scores, "Paddler1", 5)).toBe(0)
	})

	it("returns 0 for an unscored run", () => {
		const scores: IPaddlerScores = {
			Paddler1: [
				{
					TestMove: {
						id: "TestMove",
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
			]
		}
		expect(calculatePaddlerRunScore(scores, "Paddler1", 0)).toBe(0)
	})

	it("returns correct score for a scored move", () => {
		const scores: IPaddlerScores = {
			Paddler1: [
				{
					TestMove: {
						id: "TestMove",
						left: {
							scored: true,
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
			]
		}
		// Value (100) for left side only
		expect(calculatePaddlerRunScore(scores, "Paddler1", 0)).toBe(100)
	})

	it("adds bonuses correctly", () => {
		const scores: IPaddlerScores = {
			Paddler1: [
				{
					TestMove: {
						id: "TestMove",
						left: {
							scored: true,
							air: true,
							huge: false,
							clean: true,
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
			]
		}
		// Value (100) + Air (15) + Clean (10) = 125
		expect(calculatePaddlerRunScore(scores, "Paddler1", 0)).toBe(125)
	})

	it("treats huge as air when huge is true", () => {
		const scores: IPaddlerScores = {
			Paddler1: [
				{
					TestMove: {
						id: "TestMove",
						left: {
							scored: true,
							air: false,
							huge: true,
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
			]
		}
		// Value (100) + Air (15, because huge implies air) + Huge (25) = 140
		expect(calculatePaddlerRunScore(scores, "Paddler1", 0)).toBe(140)
	})
})

describe("generateCsvContent", () => {
	it("returns empty string for empty paddler list", () => {
		expect(generateCsvContent([], {})).toBe("")
	})

	it("generates correct headers and rows", () => {
		const paddlerList = [{ name: "Alice", category: "Novice", heat: 1 }]
		const paddlerScores: IPaddlerScores = {
			Alice: [
				{
					TestMove: {
						id: "TestMove",
						left: {
							scored: true,
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
			]
		}

		const csv = generateCsvContent(paddlerList, paddlerScores)
		const lines = csv.split("\n")

		expect(lines[0]).toBe("Name,Category,Heat,Run 1")
		expect(lines[1]).toBe("Alice,Novice,1,100")
	})

	it("generates correct number of run columns", () => {
		const paddlerList = [{ name: "Bob", category: "Pro", heat: 2 }]
		const paddlerScores: IPaddlerScores = {
			Bob: [initialScoresheet(), initialScoresheet(), initialScoresheet()]
		}

		const csv = generateCsvContent(paddlerList, paddlerScores)
		const header = csv.split("\n")[0]

		expect(header).toBe("Name,Category,Heat,Run 1,Run 2,Run 3")
	})

	it("wraps values with commas in double quotes", () => {
		const paddlerList = [
			{ name: "Smith, John", category: "Open", heat: 1 }
		]
		const paddlerScores: IPaddlerScores = {
			"Smith, John": [initialScoresheet()]
		}

		const csv = generateCsvContent(paddlerList, paddlerScores)
		const dataRow = csv.split("\n")[1]

		expect(dataRow).toContain("\"Smith, John\"")
	})

	it("includes all paddlers in output", () => {
		const paddlerList = [
			{ name: "Alice", category: "Novice", heat: 1 },
			{ name: "Bob", category: "Pro", heat: 1 }
		]
		const paddlerScores: IPaddlerScores = {
			Alice: [initialScoresheet()],
			Bob: [initialScoresheet()]
		}

		const csv = generateCsvContent(paddlerList, paddlerScores)
		const lines = csv.split("\n")

		expect(lines).toHaveLength(3) // header + 2 paddlers
		expect(lines[1]).toContain("Alice")
		expect(lines[2]).toContain("Bob")
	})
})

describe("exportScoresToCsv", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		// Ensure cacheDirectory is reset to a non-null value before each test
		// @ts-ignore
		FileSystem.cacheDirectory = "file:///cache/"
	})

	it("writes CSV to cache directory and calls shareAsync", async () => {
		const paddlerList = [{ name: "Alice", category: "Novice", heat: 1 }]
		const paddlerScores: IPaddlerScores = {
			Alice: [initialScoresheet()]
		}

		await exportScoresToCsv(paddlerList, paddlerScores)

		expect(FileSystem.writeAsStringAsync).toHaveBeenCalledWith(
			expect.stringContaining("file:///cache/freestyle-scores-"),
			expect.stringContaining("Name,Category,Heat"),
			{ encoding: "utf8" }
		)
		expect(Sharing.shareAsync).toHaveBeenCalledWith(
			expect.stringContaining("freestyle-scores-"),
			expect.objectContaining({ mimeType: "text/csv" })
		)
	})

	it("throws when sharing is unavailable", async () => {
		jest
			.mocked(Sharing.isAvailableAsync)
			.mockResolvedValueOnce(false)

		const paddlerList = [{ name: "Alice", category: "Novice", heat: 1 }]
		const paddlerScores: IPaddlerScores = {
			Alice: [initialScoresheet()]
		}

		await expect(exportScoresToCsv(paddlerList, paddlerScores)).rejects.toThrow(
			"Sharing is not available on this device."
		)
		expect(FileSystem.writeAsStringAsync).not.toHaveBeenCalled()
		expect(Sharing.shareAsync).not.toHaveBeenCalled()
	})

	it("throws when cacheDirectory is null", async () => {
		// @ts-ignore
		FileSystem.cacheDirectory = null

		const paddlerList = [{ name: "Alice", category: "Novice", heat: 1 }]
		const paddlerScores: IPaddlerScores = {
			Alice: [initialScoresheet()]
		}

		await expect(exportScoresToCsv(paddlerList, paddlerScores)).rejects.toThrow(
			"Export is not supported on this platform: no writable cache directory."
		)
		expect(FileSystem.writeAsStringAsync).not.toHaveBeenCalled()
		expect(Sharing.shareAsync).not.toHaveBeenCalled()
	})
})
