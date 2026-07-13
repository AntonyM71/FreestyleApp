import React from "react"
import { Text } from "react-native"
import { useSelector } from "react-redux"

import { getScoresState } from "../../selectors"
import { styles } from "../../styles"
import {
	dataSourceMoveInterface,
	moveListArray,
	moveSideInterface
} from "./makePaddlerScores"

const calculateScoreAndBonuses = (
	move: dataSourceMoveInterface,
	truth: moveSideInterface
) => {
	if (!truth.scored) { return 0 }
	// the below is a bit of a hack for a scenario where we have huge but no air, it will add in the air bonus
	const hasAir = truth.huge ? true : truth.air

	return [
		move.Value,
		truth.clean ? move.Clean : 0,
		truth.superClean ? move.SuperClean : 0,
		hasAir ? move.Air : 0,
		truth.huge ? move.Huge : 0,
		truth.link ? move.Link : 0,
		truth.style ? move.Style : 0
	].reduce((a, b) => a + b)
}

const DisplayScorePresenetation = (props: {
	paddler: string
	run: number
	fontSize?: number
}) => {
	const paddlerScores = useSelector(getScoresState)
	const paddlerScore: number[] = [0]
	if (
		paddlerScores &&
		paddlerScores[props.paddler] &&
		paddlerScores[props.paddler][props.run]
	) {
		const scoredMoves = paddlerScores[props.paddler][props.run]
		moveListArray.map((item) => {
			if (scoredMoves[item.Move]) {
				const moveData = scoredMoves[item.Move]
				const moveTotal =
					calculateScoreAndBonuses(item, moveData.left) +
					calculateScoreAndBonuses(item, moveData.right)
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
