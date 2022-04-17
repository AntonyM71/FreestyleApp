import React from "react"
import { Text, View } from "react-native"
import { Col, Grid, Row } from "react-native-easy-grid"
import { Button } from "react-native-elements"
import { batch, useDispatch, useSelector } from "react-redux"
import { changeHeat, changePaddler } from "../../actions"
import {
	getAvailableHeats,
	getCurrentHeat,
	getPaddlerHeatList
} from "../../selectors"
import { styles } from "../../styles"

export const PaddlerHandler = () => {
	const dispatch = useDispatch()

	const paddlerList = useSelector(getPaddlerHeatList)
	const currentHeat = useSelector(getCurrentHeat)

	const availableHeats = useSelector(getAvailableHeats)

	const currentHeatIndex = availableHeats.findIndex((h) => h === currentHeat)

	const numberOfHeats = availableHeats.length
	const handlePressNextHeat = () => {
		// -1 to account for zero indexing
		const newHeatIndex =
			currentHeatIndex < numberOfHeats - 1 ? currentHeatIndex + 1 : 0
		const newHeat = availableHeats[newHeatIndex]

		batch(() => {
			dispatch(changePaddler(0))
			dispatch(changeHeat(newHeat))
		})
	}

	const handlePressPreviousHeat = () => {
		// -1 to account for zero indexing
		const newHeatIndex =
			currentHeatIndex === 0 ? numberOfHeats - 1 : currentHeatIndex - 1
		const newHeat = availableHeats[newHeatIndex]
		batch(() => {
			dispatch(changePaddler(0))
			dispatch(changeHeat(newHeat))
		})
	}

	// only show the component if we have multiple heats (preverve vertical space for phones)
	if (paddlerList.length !== 1 && paddlerList.flat().length !== 0) {
		return (
			<View>
				<Grid>
					<Row>
						<Col>
							<Button
								onPress={handlePressPreviousHeat}
								title="Last"
								buttonStyle={styles.changeButton}
							/>
						</Col>
						<Col>
							<View>
								<Text
									style={{
										...styles.standardText,
										marginTop: 15,
										textAlign: "center",
										fontSize: 23
									}}
								>{`Heat ${currentHeat}`}</Text>
							</View>
						</Col>
						<Col>
							<Button
								onPress={handlePressNextHeat}
								title="Next"
								buttonStyle={styles.changeButton}
							/>
						</Col>
					</Row>
				</Grid>
			</View>
		)
	} else {
		return null
	}
}

export default PaddlerHandler
