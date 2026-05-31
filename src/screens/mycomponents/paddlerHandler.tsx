import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import {
	changeNumberOfRuns,
	changePaddler,
	changeRun,
	updatePaddlerScores
} from "../../actions"
import {
	getCurrentHeat,
	getCurrentPaddler,
	getCurrentRun,
	getNumberOfPaddlersInHeat,
	getNumberOfRuns,
	getPaddlerHeatList,
	getPaddlerIndex,
	getPaddlerScores,
	getShowRunHandler
} from "../../selectors"
import { paperButtonProps, styles } from "../../styles"
import { DisplayScore } from "./calculateScore"
import { initialScoresheet } from "./makePaddlerScores"

export const PaddlerHandler = () => {
	const dispatch = useDispatch()
	const numberOfPaddlersInCurrentHeat = useSelector(getNumberOfPaddlersInHeat)
	const numberOfRuns = useSelector(getNumberOfRuns)
	const paddlerIndex = useSelector(getPaddlerIndex)
	const currentPaddler = useSelector(getCurrentPaddler)
	const paddlerScores = useSelector(getPaddlerScores)
	const currentRun = useSelector(getCurrentRun)
	const currentHeat = useSelector(getCurrentHeat)
	const paddlerList = useSelector(getPaddlerHeatList)
	const showRunHandler = useSelector(getShowRunHandler)
	const handlePressNext = () => {
		// -1 to account for zero indexing
		const newPaddlerIndex: number =
			paddlerIndex < numberOfPaddlersInCurrentHeat - 1
				? paddlerIndex + 1
				: 0
		dispatch(changePaddler(newPaddlerIndex))
	}

	const handlePressPrevious = () => {
		// -1 to account for zero indexing
		const newPaddlerIndex =
			paddlerIndex === 0
				? numberOfPaddlersInCurrentHeat - 1
				: paddlerIndex - 1
		dispatch(changePaddler(newPaddlerIndex))
	}

	const handlePressNextRun = () => {
		// -1 to account for zero indexing
		const newRunIndex = currentRun + 1
		handleChangeRun(newRunIndex)
	}

	const handlePressPreviousRun = () => {
		const newRunIndex = currentRun === 0 ? 0 : currentRun - 1
		handleChangeRun(newRunIndex)
	}

	const handleChangeRun = (newRunIndex: number) => {
		if (newRunIndex < numberOfRuns) {
			dispatch(changeRun(newRunIndex))
		} else {
			// Deep clone to avoid mutating Redux state directly
			const scores = JSON.parse(JSON.stringify(paddlerScores)) as typeof paddlerScores
			paddlerList
				.flat()
				.map((paddler: { toString: () => React.ReactText }) => {
					// @ts-ignore
					// Check if paddler exists in scores before pushing
					if (scores[paddler.name]) {
						scores[paddler.name].push(initialScoresheet())
					} else {
						// Initialize if missing
						scores[paddler.name] = [initialScoresheet()]
					}
				})
			dispatch(changeNumberOfRuns(newRunIndex))
			dispatch(updatePaddlerScores({ ...scores }))
			dispatch(changeRun(newRunIndex))
		}
	}

	if (numberOfPaddlersInCurrentHeat !== 0) {
		return (
			<View style={layoutStyles.container}>
				<View style={layoutStyles.primaryControlRow}>
					<View style={layoutStyles.controlCell}>
						<Button
							onPress={handlePressPrevious}
								{...paperButtonProps.changeButton}
						>
							{"Last Paddler"}
						</Button>
					</View>
					<View style={layoutStyles.centerCell}>
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							style={{
								...styles.standardText,
								marginTop: 0,
								marginBottom: 0,
								fontSize: 18,
								textAlign: "center"
							}}
						>
							{currentPaddler.name}
						</Text>
						<DisplayScore
							paddler={currentPaddler.name}
							run={currentRun}
							fontSize={18}
						/>
					</View>
					<View style={layoutStyles.controlCell}>
						<Button
							onPress={handlePressNext}
								{...paperButtonProps.changeButton}
						>
							{"Next"}
						</Button>
					</View>
				</View>
				{showRunHandler ? (
					<View style={layoutStyles.controlRow}>
						<View style={layoutStyles.controlCell}>
							<Button
								onPress={handlePressPreviousRun}
								{...paperButtonProps.changeButton}
							>
								{"Prev Run"}
							</Button>
						</View>
						<View style={layoutStyles.centerCell}>
							<Text
								style={{
									...styles.standardText,
									marginTop: 8,
									textAlign: "center"
								}}
							>
								{currentRun + 1}
							</Text>
						</View>
						<View style={layoutStyles.controlCell}>
							<Button
								onPress={handlePressNextRun}
								{...paperButtonProps.changeButton}
							>
								{"New Run"}
							</Button>
						</View>
					</View>
				) : null}
			</View>
		)
	} else {
		return (
			<View>
				<Text
					style={{
						...styles.standardText,
						textAlign: "center",
						marginTop: 10
					}}
				>
					{"This heat has no paddlers."}
				</Text>
			</View>
		)
	}
}

const layoutStyles = StyleSheet.create({
	container: {
		width: "100%"
	},
	controlRow: {
		flexDirection: "row",
		alignItems: "center",
		minHeight: 52
	},
	primaryControlRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		minHeight: 52
	},
	controlCell: {
		flex: 1,
		paddingHorizontal: 2
	},
	centerCell: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 2
	}
})
