import React from "react"
import { StyleSheet, Switch, Text, View } from "react-native"
import { batch, useDispatch, useSelector } from "react-redux"
import {
	addOrRemoveCategory,
	changeRun,
	updatePaddlerScores
} from "../../actions"
import { ICategory, IEnabledMoves } from "../../reducers"
import { getCategories, getPaddlerHeatList } from "../../selectors"
import { initialScoresheet } from "./makePaddlerScores"

const activeTrackColor = "#4F84C4"
const inactiveTrackColor = "#C7CDD6"
const thumbColor = "#223A5E"

const moveSelectionPresentation = ({ category }: { category: ICategory }) => {
	const dispatch = useDispatch()
	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const enabledMovesList: IEnabledMoves = category.availableMoves
	const categoryList = useSelector(getCategories)

	const handleMoveToggle = (moveKey: IEnabledMovesKeys) => {
		const newMoves = { ...enabledMovesList }
		const newCategoryList = [...categoryList]
		newMoves[moveKey] = !newMoves[moveKey]
		const categoryIndex = newCategoryList.findIndex(
			(c) => c.name === category.name
		)

		newCategoryList[categoryIndex].availableMoves = newMoves
		dispatch(addOrRemoveCategory(newCategoryList))
		clearScores()
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
			<View style={layoutStyles.toggleGrid}>
				{enabledMovesKeys.map(
					(moveKey: IEnabledMovesKeys, key: number) => (
						<View style={layoutStyles.toggleCell} key={key}>
							<View style={layoutStyles.row}>
								<View>
									<Text style={layoutStyles.label}>{moveKey.toUpperCase()}</Text>
									<Text style={layoutStyles.value}>
										{enabledMovesList[moveKey] ? "Shown" : "Hidden"}
									</Text>
								</View>
								<Switch
									testID={`move-options-switch-${moveKey}`}
									value={enabledMovesList[moveKey]}
									trackColor={{ false: inactiveTrackColor, true: activeTrackColor }}
									thumbColor={thumbColor}
									onValueChange={() => handleMoveToggle(moveKey)}
									ios_backgroundColor={inactiveTrackColor}
								/>
							</View>
						</View>
					)
				)}
			</View>
		</View>
	)
}

type IEnabledMovesKeys = keyof IEnabledMoves

const layoutStyles = StyleSheet.create({
	toggleGrid: {
		flexDirection: "row",
		flexWrap: "wrap"
	},
	toggleCell: {
		width: "50%",
		paddingHorizontal: 4,
		paddingVertical: 4
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#F9FAFB",
		borderColor: "#E5E7EB",
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingVertical: 6
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		color: "#1F2937"
	},
	value: {
		fontSize: 12,
		color: "#6B7280"
	}
})

export default moveSelectionPresentation
