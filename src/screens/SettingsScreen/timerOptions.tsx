import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { updateShowTimer } from "../../actions"
import { getShowTimer } from "../../selectors"
import { styles } from "../../styles"

const timerOptionsPresentation = () => {
	const showTimer = useSelector(getShowTimer)

	const dispatch = useDispatch()
	const handleTimerButtonPress = () => {
		dispatch(updateShowTimer(!showTimer))
	}

	return (
		<View>
			<Button
				buttonStyle={showTimer ? styles.moveScored : styles.noMove}
				onPress={handleTimerButtonPress}
				title={showTimer ? "Hide Timer" : "Show Timer"}
			/>
		</View>
	)
}

export default timerOptionsPresentation
