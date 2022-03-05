import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { batch, useDispatch, useSelector } from "react-redux"
import { changeRun, updateShowRun } from "../../actions"
import { getShowRunHandler } from "../../selectors"
import { styles } from "../../styles"

const runOptionsPresentation = () => {
	const dispatch = useDispatch()
	const showRunHandler = useSelector(getShowRunHandler)

	const _handleRunButtonPress = () => {
		batch(() => {
			showRunHandler == true ? dispatch(changeRun(0)) : null
			dispatch(updateShowRun(!showRunHandler))
		})
	}
	return (
		<View>
			<Button
				buttonStyle={showRunHandler ? styles.moveScored : styles.noMove}
				onPress={_handleRunButtonPress}
				title={showRunHandler ? "Hide Runs" : "Show Runs"}
			/>
		</View>
	)
}

export default runOptionsPresentation
