import _ from "lodash"
import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { batch, useDispatch, useSelector } from "react-redux"
import {
	addOrRemoveHeat,
	addOrRemovePaddlerName,
	changeHeat,
	changePaddler,
	changeRun,
	updatePaddlerScores
} from "../../actions"
import { IPaddler, IPaddlerList } from "../../reducers"
import {
	getAvailableHeats,
	getNumberOfRuns,
	getPaddlerHeatList,
	getScoresState
} from "../../selectors"
import { paperButtonProps, styles } from "../../styles"
import ConfirmationModal from "./ConfirmationModal"
import { initialScoresheet } from "./makePaddlerScores"
import PaddlerHeatManager from "./paddlerHeatManagementHandler"

// pull out heat logic into another file
// consider moving the button into another file
// general filesystem tyidy up
export const PaddlerManager = () => {
	const dispatch = useDispatch()
	const paddlerScores = useSelector(getScoresState)
	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const numberOfRuns = useSelector(getNumberOfRuns)
	const heats = useSelector(getAvailableHeats)
	const [confirmationVisible, setConfirmationVisible] = useState(false)
	const [confirmationMessage, setConfirmationMessage] = useState("")
	const [pendingActionKey, setPendingActionKey] = useState<"clearScores" | "clearPaddlers" | null>(null)

	const requestConfirmation = (message: string, actionKey: "clearScores" | "clearPaddlers") => {
		setConfirmationMessage(message)
		setPendingActionKey(actionKey)
		setConfirmationVisible(true)
	}

	const handleConfirm = () => {
		if (pendingActionKey === "clearScores") {
			clearScores()
		} else if (pendingActionKey === "clearPaddlers") {
			clearPaddlers()
		}
		setConfirmationVisible(false)
		setPendingActionKey(null)
	}

	const handleCancel = () => {
		setConfirmationVisible(false)
		setPendingActionKey(null)
	}

	const addHeat = () => {
		const newHeatList = _.cloneDeep(heats) || []
		const maxHeat = newHeatList.length > 0 ? Math.max(...newHeatList) : 0
		const newHeats = [...newHeatList, maxHeat + 1]
		dispatch(addOrRemoveHeat(newHeats))
	}
	const clearPaddlers = () => {
		const newHeatList: IPaddlerList = []
		const startingScoresheet = {}
		newHeatList.flat().map((paddler: IPaddler) => {
			// @ts-ignore
			startingScoresheet[paddler.name] = [initialScoresheet()]
		})

		batch(() => {
			dispatch(changePaddler(0))
			dispatch(changeHeat(0))
			dispatch(changeRun(0))
			dispatch(addOrRemovePaddlerName(newHeatList))
			dispatch(updatePaddlerScores(startingScoresheet))
		})
	}
	const clearScores = () => {
		const startingScoresheet = {}
		paddlerHeatList.flat().map((paddler: IPaddler) => {
			// @ts-ignore
			startingScoresheet[paddler.name] = [initialScoresheet()]
		})
		batch(() => {
			dispatch(changeRun(0))
			dispatch(updatePaddlerScores(startingScoresheet))
		})
	}

	return (
		<ScrollView style={styles.container} contentContainerStyle={layoutStyles.content}>
			<ConfirmationModal
				visible={confirmationVisible}
				message={confirmationMessage}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
			<View>
				{heats.map((heat) => (
					<View key={heat} style={layoutStyles.heatCard}>
						<PaddlerHeatManager
							paddlerList={paddlerHeatList.filter(
								(p) => p.heat === heat
							)}
							heatKey={heat}
						/>
					</View>
				))}

				<View style={layoutStyles.actionsCard}>
					<View style={layoutStyles.fullActionCell}>
						<Button
							onPress={() => {
								addHeat()
							}}
							{...paperButtonProps.timerGreen}
						>
							{"New Heat"}
						</Button>
					</View>
					<View style={layoutStyles.halfActionCell}>
						<Button
							onPress={() => {
								requestConfirmation(
									"Are you sure you want to clear all scores?",
									"clearScores"
								)
							}}
							{...paperButtonProps.timerRed}
						>
							{"Clear Scores"}
						</Button>
					</View>

					<View style={layoutStyles.halfActionCell}>
						<Button
							onPress={() => {
								requestConfirmation(
									"Are you sure you want to clear all paddlers?",
									"clearPaddlers"
								)
							}}
							{...paperButtonProps.timerRed}
						>
							{"Clear Paddlers"}
						</Button>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

const layoutStyles = StyleSheet.create({
	content: {
		paddingHorizontal: 10,
		paddingTop: 8,
		paddingBottom: 20
	},
	heatCard: {
		backgroundColor: "#FFFFFF",
		borderColor: "#D9DDE3",
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 12,
		elevation: 2,
		shadowColor: "#000000",
		shadowOpacity: 0.08,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 1
		}
	},
	actionsCard: {
		flexDirection: "row",
		flexWrap: "wrap",
		backgroundColor: "#F9FAFB",
		borderColor: "#E5E7EB",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 4,
		paddingVertical: 6
	},
	fullActionCell: {
		width: "100%",
		paddingHorizontal: 2
	},
	halfActionCell: {
		width: "50%",
		paddingHorizontal: 2
	}
})

export default PaddlerManager
