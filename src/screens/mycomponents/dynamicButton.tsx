import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { updatePaddlerScores } from "../../actions"
import { IMoves } from "../../data/moves_lists/move_list"
import { IDirection, IPaddler } from "../../reducers"
import { getPaddlerScores } from "../../selectors"
import { styles } from "../../styles"

// eslint-disable-next-line complexity
const DynamicButtonPresentation = React.memo((props: IPropsType) => {
	const dispatch = useDispatch()
	const paddlerScores = useSelector(getPaddlerScores)
	const oneSidedMoves = ["Loop", "Back Loop"]
	const handleMove =
		(
			paddler: string,
			currentRun: number,
			move: string,
			direction: string,
			type: string
		) =>
		() => {
			const newScores = JSON.parse(JSON.stringify(paddlerScores))
			console.log(paddler)
			const newField =
				// @ts-ignore
				!newScores[paddler][currentRun].scoredMoves[move][direction][
					type
				]

			// @ts-ignore
			newScores[paddler][currentRun].scoredMoves[move][direction][type] =
				newField

			if (
				// @ts-ignore
				newScores[paddler][currentRun].scoredMoves[move][direction].huge
			) {
				// @ts-ignore
				newScores[paddler][currentRun].scoredMoves[move][
					direction
				].air = true
			}
			dispatch(updatePaddlerScores(newScores))
		}

	const thisMove =
		paddlerScores[props.paddler.name][props.currentRun].scoredMoves[
			props.move.Move
		]
	if (!Array.isArray(thisMove)) {
		if (!thisMove[props.direction].scored) {
			const directionInitial = props.direction[0].toUpperCase()
			const buttonName =
				oneSidedMoves.indexOf(props.move.Move) > -1
					? props.move.Move
					: props.move.Move + " " + directionInitial

			return (
				<Button
					onPress={handleMove(
						props.paddler.name,
						props.currentRun,
						props.move.Move,
						props.direction,
						"scored"
					)}
					title={buttonName}
					buttonStyle={styles.noMove}
				/>
			)
		} else {
			const buttonName =
				props.move.Move === "Loop" || props.move.Move === "Back Loop"
					? props.move.Move
					: props.move.Move + " " + props.direction[0].toUpperCase()

			return (
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						flexWrap: "wrap"
					}}
				>
					<View style={{ width: "100%" }}>
						<Button
							onPress={handleMove(
								props.paddler.name,
								props.currentRun,
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
							onPress={handleMove(
								props.paddler.name,
								props.currentRun,
								props.move.Move,
								props.direction,
								"clean"
							)}
							title={"C"}
							disabled={props.move.Clean ? false : true}
							buttonStyle={
								thisMove[props.direction].clean
									? styles.bonusScored
									: styles.noBonus
							}
						/>
					</View>
					<View style={{ width: "50%" }}>
						<Button
							onPress={handleMove(
								props.paddler.name,
								props.currentRun,
								props.move.Move,
								props.direction,
								"superClean"
							)}
							title={"SC"}
							disabled={props.move.SuperClean ? false : true}
							buttonStyle={
								thisMove[props.direction].superClean
									? styles.bonusScored
									: styles.noBonus
							}
						/>
					</View>
					<View style={{ width: "33%" }}>
						<Button
							onPress={handleMove(
								props.paddler.name,
								props.currentRun,
								props.move.Move,
								props.direction,
								"air"
							)}
							title={"A"}
							disabled={props.move.Air ? false : true}
							buttonStyle={
								thisMove[props.direction].air
									? styles.bonusScored
									: styles.noBonus
							}
						/>
					</View>
					<View style={{ width: "33%" }}>
						<Button
							onPress={handleMove(
								props.paddler.name,
								props.currentRun,
								props.move.Move,
								props.direction,
								"huge"
							)}
							title={"H"}
							disabled={props.move.Huge ? false : true}
							buttonStyle={
								thisMove[props.direction].huge
									? styles.bonusScored
									: styles.noBonus
							}
						/>
					</View>
					<View style={{ width: "33%" }}>
						<Button
							onPress={handleMove(
								props.paddler.name,
								props.currentRun,
								props.move.Move,
								props.direction,
								"link"
							)}
							title={"L"}
							disabled={props.move.Link ? false : true}
							buttonStyle={
								thisMove[props.direction].link
									? styles.bonusScored
									: styles.noBonus
							}
						/>
					</View>
				</View>
			)
		}
	}

	return <> </>
})

interface IPropsType {
	paddler: IPaddler
	currentRun: number
	move: IMoves
	direction: IDirection
}

// can we make this go deeper, so that we only update a single component when we add a move?

export const DynamicButton = DynamicButtonPresentation
