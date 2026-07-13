import React from "react"
import { StyleSheet, Switch, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import { updateShowTimer } from "../../actions"
import { getShowTimer } from "../../selectors"

const TimerOptionsPresentation = () => {
	const showTimer = useSelector(getShowTimer)
	const activeTrackColor = "#4F84C4"
	const inactiveTrackColor = "#C7CDD6"
	const thumbColor = "#223A5E"
	const thumbColorProps = {
		thumbColor
	}

	const dispatch = useDispatch()
	const handleTimerToggle = (newValue: boolean) => {
		dispatch(updateShowTimer(newValue))
	}

	return (
		<View style={layoutStyles.row}>
			<View>
				<Text style={layoutStyles.label}>Timer</Text>
				<Text style={layoutStyles.value}>{showTimer ? "Shown" : "Hidden"}</Text>
			</View>
			<Switch
				testID="timer-options-switch"
				value={showTimer}
				trackColor={{ false: inactiveTrackColor, true: activeTrackColor }}
				{...thumbColorProps}
				ios_backgroundColor={inactiveTrackColor}
				onValueChange={handleTimerToggle}
			/>
		</View>
	)
}

const layoutStyles = StyleSheet.create({
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 6,
		paddingVertical: 4
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
		color: "#1F2937"
	},
	value: {
		fontSize: 12,
		color: "#6B7280"
	}
})

export default TimerOptionsPresentation
