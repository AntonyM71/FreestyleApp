import React from "react"
import { Text, View } from "react-native"
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
			const scores = paddlerScores
			paddlerList
				.flat()
				.map((paddler: { toString: () => React.ReactText }) => {
					// @ts-ignore
					scores[paddler.name].push(initialScoresheet())
				})
			dispatch(changeNumberOfRuns(newRunIndex))
			dispatch(updatePaddlerScores({ ...scores }))
			dispatch(changeRun(newRunIndex))
		}
	}

	if (numberOfPaddlersInCurrentHeat !== 0) {
		return (
			<View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<View style={{ flex: 1 }}>
						<Button
							onPress={handlePressPrevious}
								{...paperButtonProps.changeButton}
						>
							{"Last Paddler"}
						</Button>
					</View>
					<View style={{ flex: 1 }}>
						<Text
							style={{
								...styles.standardText,
								marginTop: 4,
								textAlign: "center"
							}}
						>
							{currentPaddler.name}
						</Text>
						<DisplayScore
							paddler={currentPaddler.name}
							run={currentRun}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<Button
							onPress={handlePressNext}
								{...paperButtonProps.changeButton}
						>
							{"Next"}
						</Button>
					</View>
				</View>
				{showRunHandler ? (
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<View style={{ flex: 1 }}>
							<Button
								onPress={handlePressPreviousRun}
								{...paperButtonProps.changeButton}
							>
								{"Prev Run"}
							</Button>
						</View>
						<View style={{ flex: 1 }}>
							<Text
								style={{
									...styles.standardText,
									marginTop: 15,
									textAlign: "center"
								}}
							>
								{currentRun + 1}
							</Text>
						</View>
						<View style={{ flex: 1 }}>
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
