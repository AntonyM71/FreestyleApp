import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { batch, useDispatch, useSelector } from "react-redux"
import {
	addOrRemoveCategory,
	changeRun,
	updatePaddlerScores
} from "../../actions"
import { ICategory, IEnabledMoves } from "../../reducers"
import { getCategories, getPaddlerHeatList } from "../../selectors"
import { styles } from "../../styles"
import { initialScoresheet } from "./makePaddlerScores"
const moveSelectionPresentation = ({ category }: { category: ICategory }) => {
	const dispatch = useDispatch()
	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const enabledMovesList: IEnabledMoves = category.availableMoves
	const categoryList = useSelector(getCategories)

	const handleMoveButtonPress = (moveKey: IEnabledMovesKeys) => () => {
		const newMoves = { ...enabledMovesList }
		const newCategoryList = [...categoryList]
		newMoves[moveKey] = !newMoves[moveKey]
		const categoryIndex = newCategoryList.findIndex(
			(c) => c.name === category.name
		)

		newCategoryList[categoryIndex].availableMoves = newMoves
		dispatch(addOrRemoveCategory(newCategoryList))
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
						<View style={{ width: "33%" }} key={key}>
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
