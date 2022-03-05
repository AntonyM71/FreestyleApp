import React from "react"
import { Text, View } from "react-native"
import { Col, Grid, Row } from "react-native-easy-grid"
import { Button } from "react-native-elements"
import { batch, useDispatch, useSelector } from "react-redux"
import { changeHeat, changePaddler } from "../../actions"
import { getCurrentHeat, getPaddlerHeatList } from "../../selectors"
import { styles } from "../../styles"

export const PaddlerHandler = () => {
	const dispatch = useDispatch()

	const paddlerList = useSelector(getPaddlerHeatList)
	const currentHeat = useSelector(getCurrentHeat)
	const numberOfHeats = paddlerList.length

	const _handlePressNextHeat = () => {
		// -1 to account for zero indexing
		const newHeat = currentHeat < numberOfHeats - 1 ? currentHeat + 1 : 0
		batch(() => {
			dispatch(changePaddler(0))
			dispatch(changeHeat(newHeat))
		})
	}

	const _handlePressPreviousHeat = () => {
		// -1 to account for zero indexing
		const newHeat = currentHeat == 0 ? numberOfHeats - 1 : currentHeat - 1
		batch(() => {
			dispatch(changePaddler(0))
			dispatch(changeHeat(newHeat))
		})
	}

	// only show the component if we have multiple heats (preverve vertical space for phones)
	if (paddlerList.length != 1 && paddlerList.flat().length != 0) {
		return (
			<View>
				<Grid>
					<Row>
						<Col>
							<Button
								onPress={_handlePressPreviousHeat}
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
								>{`Heat ${currentHeat + 1}`}</Text>
							</View>
						</Col>
						<Col>
							<Button
								onPress={_handlePressNextHeat}
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
