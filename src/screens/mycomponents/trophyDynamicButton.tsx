import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { updatePaddlerScores } from "../../actions"
import { getScoresState } from "../../selectors"
import { styles } from "../../styles"

const makeScoresObject = (move: { toString: () => any }) => {
	return {
		id: move.toString(),
		left: {
			scored: false,
			air: false,
			huge: false,
			clean: false,
			superClean: false,
			link: false
		},
		right: {
			scored: false,
			air: false,
			huge: false,
			clean: false,
			superClean: false,
			link: false
		}
	}
}

const TrophyDynamicButtonPresentation = React.memo((props: any) => {
	const paddlerScores = useSelector(getScoresState)
	const dispatch = useDispatch()
	const _handleMove =
		(
			paddler: string | number,
			run: string | number,
			move: string | number,
			direction: string | number,
			type: string,
			key: string | number
		) =>
		() => {
			const newScores = { ...paddlerScores }
			const newField =
				// @ts-ignore
				!newScores[paddler][run][move][key][direction][type]
			// @ts-ignore
			newScores[paddler][run][move][key][direction][type] = newField
			if (type == "huge") {
				// @ts-ignore
				newScores[paddler][run][move][key][direction]["air"] = newField
			}
			if (type == "superClean") {
				// @ts-ignore
				newScores[paddler][run][move][key][direction]["clean"] =
					newField
			}

			if (
				// @ts-ignore
				newScores[paddler][run][move][
					// @ts-ignore
					newScores[paddler][run][move].length - 1
				]["left"]["scored"] == true
			) {
				// @ts-ignore
				newScores[paddler][run][move].push(makeScoresObject(move))
			}

			dispatch(updatePaddlerScores(newScores))
		}
	// @ts-ignore
	const theMoves = paddlerScores[props.paddler][props.run][props.move.Move]
	return theMoves.map(
		(
			thisMove: { [x: string]: { [x: string]: any } },
			key: string | number
		) => {
			if (thisMove[props.direction].scored == false) {
				const buttonName = props.move.Move

				return (
					<Button
						onPress={_handleMove(
							props.paddler,
							props.run,
							props.move.Move,
							props.direction,
							"scored",
							key
						)}
						title={buttonName}
						buttonStyle={styles.noMove}
						key={key}
					/>
				)
			} else {
				const buttonName = props.move.Move
				return (
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap"
						}}
						key={key}
					>
						<View style={{ width: "100%" }}>
							<Button
								onPress={_handleMove(
									props.paddler,
									props.run,
									props.move.Move,
									props.direction,
									"scored",
									key
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
									"clean",
									key
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
									"superClean",
									key
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
									"air",
									key
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
									"huge",
									key
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
									"link",
									key
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
		}
	)
})

export const TrophyDynamicButton = TrophyDynamicButtonPresentation
