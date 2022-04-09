import React from "react"
import { ScrollView, View } from "react-native"
import { Button } from "react-native-elements"
import { batch, useDispatch, useSelector } from "react-redux"
import {
	addOrRemovePaddlerName,
	changeHeat,
	changePaddler,
	changeRun,
	updatePaddlerScores
} from "../../actions"
import { IPaddler } from "../../reducers"
import {
	getNumberOfRuns,
	getPaddlerHeatList,
	getScoresState
} from "../../selectors"
import { styles } from "../../styles"
import { initialScoresheet } from "./makePaddlerScores"
import PaddlerHeatManager from "./paddlerHeatManagementHandler"

// pull out heat logic into another file
// consider moving the button into another file
// general filesystem tyidy up
export const PaddlerManager = () => {
	const dispatch = useDispatch()
	const paddlerScores = useSelector(getScoresState)
	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const numberOfRuns = useSelector(getNumberOfRuns)
	const addHeat = () => {
		const newHeatList = paddlerHeatList
		newHeatList.push([])
		const newPaddlerScores = paddlerScores
		newHeatList.flat().map((paddler: any) => {
			// @ts-ignore
			if (!newPaddlerScores[paddler]) {
				newPaddlerScores[paddler.name] = [initialScoresheet()]
			}
			if (
				numberOfRuns + 1 !==
				// @ts-ignore
				newPaddlerScores[paddler.name].length
			) {
				let i = 0
				for (i; i < numberOfRuns; i++) {
					// @ts-ignore
					newPaddlerScores[paddler.name].push(initialScoresheet())
				}
			}
		})
		batch(() => {
			dispatch(changePaddler(0))
			dispatch(addOrRemovePaddlerName([...newHeatList]))
			dispatch(updatePaddlerScores(newPaddlerScores))
		})
	}
	const clearPaddlers = () => {
		const newHeatList = [[]]
		const startingScoresheet = {}
		newHeatList.flat().map((paddler: string) => {
			// @ts-ignore
			startingScoresheet[paddler.name] = [initialScoresheet()]
		})

		dispatch(changePaddler(0))
		dispatch(changeHeat(0))
		dispatch(changeRun(0))
		batch(() => {
			dispatch(addOrRemovePaddlerName(newHeatList))
			dispatch(updatePaddlerScores(startingScoresheet))
		})
	}
	const clearScores = () => {
		const startingScoresheet = {}
		paddlerHeatList.flat().map((paddler: IPaddler) => {
			// @ts-ignore
			startingScoresheet[paddler.name] = [initialScoresheet()]
		})
		dispatch(changeRun(0))
		dispatch(updatePaddlerScores(startingScoresheet))
	}

	return (
		<ScrollView style={styles.container}>
			<View>
				{paddlerHeatList.map(
					(paddlerList: IPaddler[], heatKey: number) => (
						<View key={heatKey}>
							<PaddlerHeatManager
								paddlerList={paddlerList}
								heatKey={heatKey}
							/>
						</View>
					)
				)}

				<View
					style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}
				>
					<View style={{ width: "100%" }}>
						<Button
							onPress={() => {
								addHeat()
							}}
							title="New Heat"
							buttonStyle={styles.timerGreen}
						/>
					</View>
					<View style={{ width: "50%" }}>
						<Button
							onPress={() => {
								clearScores()
							}}
							title="Clear Scores"
							buttonStyle={styles.timerRed}
						/>
					</View>

					<View style={{ width: "50%" }}>
						<Button
							onPress={clearPaddlers}
							title="Clear Paddlers"
							buttonStyle={styles.timerRed}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

export default PaddlerManager
