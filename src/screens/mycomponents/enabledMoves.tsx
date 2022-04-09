import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { batch, useDispatch, useSelector } from "react-redux"
import {
	changeRun,
	updateEnabledMoves,
	updatePaddlerScores
} from "../../actions"
import { IEnabledMoves } from "../../reducers"
import { getPaddlerHeatList, getShowMoves } from "../../selectors"
import { styles } from "../../styles"
import { initialScoresheet } from "./makePaddlerScores"

const moveSelectionPresentation = () => {
	const dispatch = useDispatch()
	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const enabledMovesList = useSelector(getShowMoves)
	const handleMoveButtonPress = (moveKey: IEnabledMovesKeys) => () => {
		const newMoves = { ...enabledMovesList }

		newMoves[moveKey] = !newMoves[moveKey]
		dispatch(updateEnabledMoves(newMoves))
		clearScores()

		//
	}

	const clearScores = () => {
		const startingScoresheet = {}

		paddlerHeatList
			.flat()
			.map((paddler: { toString: () => React.ReactText }) => {
				// @ts-ignore
				startingScoresheet[paddler.name] = [initialScoresheet()]
			})
		batch(() => {
			dispatch(changeRun(0))
			dispatch(updatePaddlerScores(startingScoresheet))
		})
	}
	const enabledMovesKeys = Object.keys(
		enabledMovesList
	) as IEnabledMovesKeys[] // both types are derived from the object so this cast is safe

	return (
		<View>
			<View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
				{enabledMovesKeys.map(
					(moveKey: IEnabledMovesKeys, key: number) => (
						<View style={{ width: "50%" }} key={key}>
							<Button
								buttonStyle={
									enabledMovesList[moveKey]
										? styles.moveScored
										: styles.noMove
								}
								title={
									enabledMovesList[moveKey]
										? `Hide ${moveKey}`
										: `Show ${moveKey}`
								}
								onPress={handleMoveButtonPress(moveKey)}
							/>
						</View>
					)
				)}
			</View>
		</View>
	)
}

type IEnabledMovesKeys = keyof IEnabledMoves

export default moveSelectionPresentation
