import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Button } from "react-native-paper"
import { batch, useDispatch, useSelector } from "react-redux"
import { changeHeat, changePaddler } from "../../actions"
import {
	getAvailableHeats,
	getCurrentHeat,
	getPaddlerHeatList
} from "../../selectors"
import { paperButtonProps, styles } from "../../styles"

export const PaddlerHandler = () => {
	const dispatch = useDispatch()

	const paddlerList = useSelector(getPaddlerHeatList)
	const currentHeat = useSelector(getCurrentHeat)

	const availableHeats = useSelector(getAvailableHeats)

	const currentHeatIndex = availableHeats.findIndex((h) => h === currentHeat)

	const numberOfHeats = availableHeats.length
	const handlePressNextHeat = () => {
		// Validate that heats array is not empty
		if (numberOfHeats === 0) {
			console.error("Cannot navigate: no heats available")

			return
		}

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
		// Validate that heats array is not empty
		if (numberOfHeats === 0) {
			console.error("Cannot navigate: no heats available")

			return
		}

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
			<View style={layoutStyles.controlRow}>
				<View style={layoutStyles.controlCell}>
					<Button
						onPress={handlePressPreviousHeat}
							{...paperButtonProps.changeButton}
					>
						{"Last"}
					</Button>
				</View>
				<View style={layoutStyles.centerCell}>
					<Text
						numberOfLines={1}
						ellipsizeMode="tail"
						style={{
							...styles.standardText,
							marginTop: 8,
							textAlign: "center",
							fontSize: 18
						}}
					>{`Heat ${currentHeat}`}</Text>
				</View>
				<View style={layoutStyles.controlCell}>
					<Button
						onPress={handlePressNextHeat}
							{...paperButtonProps.changeButton}
					>
						{"Next"}
					</Button>
				</View>
			</View>
		)
	} else {
		return null
	}
}

const layoutStyles = StyleSheet.create({
	controlRow: {
		flexDirection: "row",
		alignItems: "center",
		minHeight: 52
	},
	controlCell: {
		flex: 1,
		paddingHorizontal: 2
	},
	centerCell: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 2
	}
})

export default PaddlerHandler
