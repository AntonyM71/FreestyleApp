import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import { IPaddler, IPaddlerScores } from "../reducers"
import {
	dataSourceMoveInterface,
	moveListArray,
	moveSideInterface
} from "../screens/mycomponents/makePaddlerScores"

const calculateScoreAndBonuses = (
	move: dataSourceMoveInterface,
	truth: moveSideInterface
): number => {
	const airBonus = truth.huge ? true : truth.air
	if (!truth.scored) {
		return 0
	}

	return [
		move.Value,
		truth.clean ? move.Clean : 0,
		truth.superClean ? move.SuperClean : 0,
		airBonus ? move.Air : 0,
		truth.huge ? move.Huge : 0,
		truth.link ? move.Link : 0,
		truth.style ? move.Style : 0
	].reduce((a, b) => a + b)
}

export const calculatePaddlerRunScore = (
	paddlerScores: IPaddlerScores,
	paddlerName: string,
	runIndex: number
): number => {
	const paddlerScore: number[] = [0]

	if (
		paddlerScores &&
		paddlerScores[paddlerName] &&
		paddlerScores[paddlerName][runIndex]
	) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const scoredMoves: any = paddlerScores[paddlerName][runIndex]
		moveListArray.forEach((item) => {
			if (Array.isArray(scoredMoves[item.Move])) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				scoredMoves[item.Move].forEach((arrayItem: any) => {
					paddlerScore.push(
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
						calculateScoreAndBonuses(item, arrayItem.left) +
							// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
							calculateScoreAndBonuses(item, arrayItem.right)
					)
				})
			} else if (scoredMoves[item.Move]) {
				paddlerScore.push(
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					calculateScoreAndBonuses(item, scoredMoves[item.Move].left) +
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
						calculateScoreAndBonuses(item, scoredMoves[item.Move].right)
				)
			}
		})
	}

	return paddlerScore.reduce((a, b) => a + b)
}

export const generateCsvContent = (
	paddlerList: IPaddler[],
	paddlerScores: IPaddlerScores
): string => {
	if (paddlerList.length === 0) {
		return ""
	}

	const maxRuns = Math.max(
		...paddlerList.map((p) =>
			paddlerScores[p.name] ? paddlerScores[p.name].length : 0
		),
		0
	)

	const runHeaders = Array.from(
		{ length: maxRuns },
		(_, i) => `Run ${i + 1}`
	)
	const headers = ["Name", "Category", "Heat", ...runHeaders]

	const rows = paddlerList.map((paddler) => {
		const runScores = Array.from({ length: maxRuns }, (_, runIndex) =>
			String(calculatePaddlerRunScore(paddlerScores, paddler.name, runIndex))
		)

		return [paddler.name, paddler.category, String(paddler.heat), ...runScores]
	})

	const escape = (value: string): string => {
		if (value.includes(",") || value.includes("\"") || value.includes("\n")) {
			return "\"" + value.replace(/"/g, "\"\"") + "\""
		}

		return value
	}

	const lines = [headers, ...rows].map((row) =>
		row.map(escape).join(",")
	)

	return lines.join("\n")
}

export const exportScoresToCsv = async (
	paddlerList: IPaddler[],
	paddlerScores: IPaddlerScores
): Promise<void> => {
	const csvContent = generateCsvContent(paddlerList, paddlerScores)
	const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
	const fileName = `freestyle-scores-${timestamp}.csv`
	const fileUri = `${FileSystem.cacheDirectory}${fileName}`

	await FileSystem.writeAsStringAsync(fileUri, csvContent, {
		encoding: FileSystem.EncodingType.UTF8
	})

	const isAvailable = await Sharing.isAvailableAsync()
	if (isAvailable) {
		await Sharing.shareAsync(fileUri, {
			mimeType: "text/csv",
			dialogTitle: "Save Scores CSV",
			UTI: "public.comma-separated-values-text"
		})
	}
}
