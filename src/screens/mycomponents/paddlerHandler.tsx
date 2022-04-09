import React from "react"
import { Text, View } from "react-native"
import { Col, Grid, Row } from "react-native-easy-grid"
import { Button } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import {
	changeNumberOfRuns,
	changePaddler,
	changeRun,
	updatePaddlerScores
} from "../../actions"
import {
	getCurrentHeat,
	getCurrentRun,
	getNumberOfPaddlers,
	getNumberOfRuns,
	getPaddlerHeatList,
	getPaddlerIndex,
	getPaddlerScores,
	getShowRunHandler
} from "../../selectors"
import { styles } from "../../styles"
import { DisplayScore } from "./calculateScore"
import { initialScoresheet } from "./makePaddlerScores"

export const PaddlerHandler = () => {
	const dispatch = useDispatch()
	const numberOfPaddlers = useSelector(getNumberOfPaddlers)
	const numberOfRuns = useSelector(getNumberOfRuns)
	const paddlerIndex = useSelector(getPaddlerIndex)
	const paddlerScores = useSelector(getPaddlerScores)
	const currentRun = useSelector(getCurrentRun)
	const currentHeat = useSelector(getCurrentHeat)
	const paddlerList = useSelector(getPaddlerHeatList)
	const showRunHandler = useSelector(getShowRunHandler)
	const handlePressNext = () => {
		// -1 to account for zero indexing
		const newPaddlerIndex: number =
			paddlerIndex < numberOfPaddlers - 1 ? paddlerIndex + 1 : 0
		dispatch(changePaddler(newPaddlerIndex))
	}

	const handlePressPrevious = () => {
		// -1 to account for zero indexing
		const newPaddlerIndex =
			paddlerIndex === 0 ? numberOfPaddlers - 1 : paddlerIndex - 1
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
					scores[paddler.toString()].push(initialScoresheet())
				})
			dispatch(changeNumberOfRuns(newRunIndex))
			dispatch(updatePaddlerScores({ ...scores }))
			dispatch(changeRun(newRunIndex))
		}
	}

	if (paddlerList[currentHeat].length !== 0) {
		return (
			<View>
				<Grid>
					<Row>
						<Col>
							<Button
								onPress={handlePressPrevious}
								title="Last Paddler"
								buttonStyle={styles.changeButton}
							/>
						</Col>
						<Col>
							<View>
								<Text
									style={{
										...styles.standardText,
										marginTop: 4,
										textAlign: "center"
									}}
								>
									{
										paddlerList[currentHeat][paddlerIndex]
											.name
									}
								</Text>
								<DisplayScore
									paddler={
										paddlerList[currentHeat][paddlerIndex]
											.name
									}
									run={currentRun}
								/>
							</View>
						</Col>
						<Col>
							<Button
								onPress={handlePressNext}
								title="Next"
								buttonStyle={styles.changeButton}
							/>
						</Col>
					</Row>
					{showRunHandler ? (
						<Row>
							<Col>
								<Button
									onPress={handlePressPreviousRun}
									title="Prev Run"
									buttonStyle={styles.changeButton}
								/>
							</Col>
							<Col>
								<View>
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
							</Col>
							<Col>
								<Button
									onPress={handlePressNextRun}
									title="New Run"
									buttonStyle={styles.changeButton}
								/>
							</Col>
						</Row>
					) : null}
				</Grid>
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
