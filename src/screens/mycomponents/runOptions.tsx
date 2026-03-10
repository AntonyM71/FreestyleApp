import React from "react"
import { View } from "react-native"
import { Button } from "react-native-paper"
import { batch, useDispatch, useSelector } from "react-redux"
import { changeRun, updateShowRun } from "../../actions"
import { getShowRunHandler } from "../../selectors"
import { paperButtonProps } from "../../styles"

const runOptionsPresentation = () => {
	const dispatch = useDispatch()
	const showRunHandler = useSelector(getShowRunHandler)

	const handleRunButtonPress = () => {
		batch(() => {
			if (showRunHandler) {
				dispatch(changeRun(0))
			}
			dispatch(updateShowRun(!showRunHandler))
		})
	}

	return (
		<View>
			<Button
				{...(showRunHandler
					? paperButtonProps.moveScored
					: paperButtonProps.noMove)}
				onPress={handleRunButtonPress}
			>
				{showRunHandler ? "Hide Runs" : "Show Runs"}
			</Button>
		</View>
	)
}

export default runOptionsPresentation
