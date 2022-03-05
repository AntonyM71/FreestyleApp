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
	// the below is a bit of a hack for ascenario where we have huge but no air,  it will add in the air bonus
	truth.air = truth.huge ? true : truth.air
	truth.clean = truth.superClean ? true : truth.clean
	const moveScore = truth.scored
		? [
				truth.scored == true ? move.Value : 0,
				truth.clean == true ? move.Clean : 0,
				truth.superClean == true ? move.SuperClean : 0,
				truth.air == true ? move.Air : 0,
				truth.huge == true ? move.Huge : 0,
				truth.link == true ? move.Link : 0
		  ].reduce((a, b) => a + b)
		: 0
	return moveScore
}

const DisplayScorePresenetation = (props: {
	paddler: string | number
	run: string | number
}) => {
	const paddlerScores = useSelector(getScoresState)
	const paddlerScore: number[] = [0]
	// @ts-ignore
	if (paddlerScores[props.paddler][props.run]) {
		// @ts-ignore
		const scoredMoves = paddlerScores[props.paddler][props.run]
		moveListArray.map((item) => {
			if (Array.isArray(scoredMoves[item.Move])) {
				scoredMoves[item.Move].map(
					(arrayItem: { [x: string]: moveSideInterface }) => {
						const moveTotal =
							calculateScoreAndBonuses(item, arrayItem["left"]) +
							calculateScoreAndBonuses(item, arrayItem["right"])
						paddlerScore.push(moveTotal)
					}
				)
			} else {
				const moveTotal =
					calculateScoreAndBonuses(
						item,
						scoredMoves[item.Move]["left"]
					) +
					calculateScoreAndBonuses(
						item,
						scoredMoves[item.Move]["right"]
					)
				paddlerScore.push(moveTotal)
			}
		})
	}

	return (
		<Text
			style={{
				...styles.standardText,
				textAlign: "center",
				marginTop: -2
			}}
		>
			{paddlerScore.reduce((a, b) => a + b)}
		</Text>
	)
}

export const DisplayScore = DisplayScorePresenetation
