import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { updatePaddlerScores } from "../../actions"
import { getPaddlerScores } from "../../selectors"
import { styles } from "../../styles"

const DynamicButtonPresentation = React.memo((props: any) => {
	const dispatch = useDispatch()
	const paddlerScores = useSelector(getPaddlerScores)
	const _handleMove =
		(
			paddler: React.ReactText,
			run: React.ReactText,
			move: React.ReactText,
			direction: React.ReactText,
			type: string
		) =>
		() => {
			const newScores = { ...paddlerScores }
			// @ts-ignore
			const newField = !newScores[paddler][run][move][direction][type]
			// @ts-ignore
			newScores[paddler][run][move][direction][type] = newField

			// @ts-ignore
			if (newScores[paddler][run][move][direction]["huge"]) {
				// @ts-ignore
				newScores[paddler][run][move][direction]["air"] = true
			}
			// @ts-ignore
			if (newScores[paddler][run][move][direction]["superClean"]) {
				// @ts-ignore
				newScores[paddler][run][move][direction]["clean"] = true
			}
			dispatch(updatePaddlerScores(newScores))
		}
	// @ts-ignore
	const thisMove = paddlerScores[props.paddler][props.run][props.move.Move]
	if (thisMove[props.direction].scored == false) {
		const buttonName = props.move.Move
		return (
			<Button
				onPress={_handleMove(
					props.paddler,
					props.run,
					props.move.Move,
					props.direction,
					"scored"
				)}
				title={buttonName}
				buttonStyle={styles.noMove}
			/>
		)
	} else {
		const buttonName = props.move.Move
		return (
			<View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
				<View style={{ width: "100%" }}>
					<Button
						onPress={_handleMove(
							props.paddler,
							props.run,
							props.move.Move,
							props.direction,
							"scored"
						)}
						title={buttonName}
						buttonStyle={styles.moveScored}
					/>
				</View>
				<View style={{ width: "50%" }}>
					<Button
						onPress={_handleMove(
							props.paddler,
							props.run,
							props.move.Move,
							props.direction,
							"clean"
						)}
						title={"C"}
						disabled={props.move.Clean ? false : true}
						buttonStyle={
							thisMove[props.direction]["clean"]
								? styles.bonusScored
								: styles.noBonus
						}
					/>
				</View>
				<View style={{ width: "50%" }}>
					<Button
						onPress={_handleMove(
							props.paddler,
							props.run,
							props.move.Move,
							props.direction,
							"superClean"
						)}
						title={"SC"}
						disabled={props.move.SuperClean ? false : true}
						buttonStyle={
							thisMove[props.direction]["superClean"]
								? styles.bonusScored
								: styles.noBonus
						}
					/>
				</View>
				<View style={{ width: "33%" }}>
					<Button
						onPress={_handleMove(
							props.paddler,
							props.run,
							props.move.Move,
							props.direction,
							"air"
						)}
						title={"A"}
						disabled={props.move.Air ? false : true}
						buttonStyle={
							thisMove[props.direction]["air"]
								? styles.bonusScored
								: styles.noBonus
						}
					/>
				</View>
				<View style={{ width: "33%" }}>
					<Button
						onPress={_handleMove(
							props.paddler,
							props.run,
							props.move.Move,
							props.direction,
							"huge"
						)}
						title={"H"}
						disabled={props.move.Huge ? false : true}
						buttonStyle={
							thisMove[props.direction]["huge"]
								? styles.bonusScored
								: styles.noBonus
						}
					/>
				</View>
				<View style={{ width: "33%" }}>
					<Button
						onPress={_handleMove(
							props.paddler,
							props.run,
							props.move.Move,
							props.direction,
							"link"
						)}
						title={"L"}
						disabled={props.move.Link ? false : true}
						buttonStyle={
							thisMove[props.direction]["link"]
								? styles.bonusScored
								: styles.noBonus
						}
					/>
				</View>
			</View>
		)
	}
})

export const EntryDynamicButton = DynamicButtonPresentation
