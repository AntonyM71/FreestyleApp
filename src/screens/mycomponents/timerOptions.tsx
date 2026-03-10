import React from "react"
import { View } from "react-native"
import { Button } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { updateShowTimer } from "../../actions"
import { getShowTimer } from "../../selectors"
import { paperButtonProps } from "../../styles"

const timerOptionsPresentation = () => {
	const showTimer = useSelector(getShowTimer)

	const dispatch = useDispatch()
	const handleTimerButtonPress = () => {
		dispatch(updateShowTimer(!showTimer))
	}

	return (
		<View>
			<Button
				{...(showTimer ? paperButtonProps.moveScored : paperButtonProps.noMove)}
				onPress={handleTimerButtonPress}
			>
				{showTimer ? "Hide Timer" : "Show Timer"}
			</Button>
		</View>
	)
}

export default timerOptionsPresentation
