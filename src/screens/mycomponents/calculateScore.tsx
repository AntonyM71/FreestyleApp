import React from "react"
import { Text } from "react-native"
import { useSelector } from "react-redux"
import { getScoresState } from "../../selectors"
import { styles } from "../../styles"
import { calculateScoreAndBonuses } from "../../utils/scoreHelpers"
import {
	moveListArray,
	moveSideInterface
} from "./makePaddlerScores"

const DisplayScorePresenetation = (props: {
	paddler: string | number
	run: number
	fontSize?: number
}) => {
	const paddlerScores = useSelector(getScoresState)
	const paddlerScore: number[] = [0]
	// @ts-ignore
	if (
		paddlerScores &&
		paddlerScores[props.paddler] &&
		paddlerScores[props.paddler][props.run]
	) {
		// @ts-ignore
		const scoredMoves = paddlerScores[props.paddler][props.run]
		moveListArray.map((item) => {
			if (Array.isArray(scoredMoves[item.Move])) {
				// @ts-ignore
				scoredMoves[item.Move].map(
					(arrayItem: { [x: string]: moveSideInterface }) => {
						const moveTotal =
							calculateScoreAndBonuses(item, arrayItem.left) +
							calculateScoreAndBonuses(item, arrayItem.right)
						paddlerScore.push(moveTotal)
					}
				)
			} else if (!Array.isArray(scoredMoves[item.Move])) {
				const moveTotal =
					calculateScoreAndBonuses(
						item,
						// @ts-ignore
						// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
						scoredMoves[item.Move].left
					) +
					// @ts-ignore
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					calculateScoreAndBonuses(item, scoredMoves[item.Move].right)
				paddlerScore.push(moveTotal)
			}
		})
	}

	return (
		<Text
			style={{
				...styles.standardText,
				fontSize: props.fontSize || styles.standardText.fontSize,
				textAlign: "center",
				marginTop: -2
			}}
		>
			{paddlerScore.reduce((a, b) => a + b)}
		</Text>
	)
}

export const DisplayScore = DisplayScorePresenetation
