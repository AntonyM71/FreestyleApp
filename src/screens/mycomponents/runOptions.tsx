import React from "react"
import { StyleSheet, Switch, Text, View } from "react-native"
import { batch, useDispatch, useSelector } from "react-redux"
import { changeRun, updateShowRun } from "../../actions"
import { getShowRunHandler } from "../../selectors"

const runOptionsPresentation = () => {
	const dispatch = useDispatch()
	const showRunHandler = useSelector(getShowRunHandler)
	const activeTrackColor = "#4F84C4"
	const inactiveTrackColor = "#C7CDD6"
	const thumbColor = "#223A5E"
	const thumbColorProps = {
		thumbColor
	}

	const handleRunToggle = (newValue: boolean) => {
		batch(() => {
			if (!newValue && showRunHandler) {
				dispatch(changeRun(0))
			}
			dispatch(updateShowRun(newValue))
		})
	}

	return (
		<View style={layoutStyles.row}>
			<View>
				<Text style={layoutStyles.label}>Runs</Text>
				<Text style={layoutStyles.value}>
					{showRunHandler ? "Shown" : "Hidden"}
				</Text>
			</View>
			<Switch
				testID="run-options-switch"
				value={showRunHandler}
				trackColor={{ false: inactiveTrackColor, true: activeTrackColor }}
				{...thumbColorProps}
				ios_backgroundColor={inactiveTrackColor}
				onValueChange={handleRunToggle}
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

export default runOptionsPresentation
