import React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { useDispatch, useSelector } from "react-redux"
import { updatePaddlerScores } from "../../actions"
import { IDirection, IPaddler } from "../../reducers"
import { getCurrentRun, getPaddlerScores } from "../../selectors"
import { styles } from "../../styles"
import { dataSourceMoveInterface } from "./makePaddlerScores"

interface PropsType {
	paddler: IPaddler
	move: dataSourceMoveInterface
	direction: IDirection
}
// eslint-disable-next-line complexity
const DynamicButtonPresentation = React.memo((props: PropsType) => {
	const dispatch = useDispatch()
	const currentRun = useSelector(getCurrentRun)
	const paddlerScores = useSelector(getPaddlerScores)
	const handleMove =
		(
			paddler: string,
			run: string,
			move: string,
			direction: string,
			type: string
		) =>
		() => {
			const newScores = { ...paddlerScores }
			// @ts-ignore
			const newField = !newScores[paddler][run][move][direction][type]
			// @ts-ignore
			newScores[paddler][run][move][direction][type] = newField

			// @ts-ignore
			if (newScores[paddler][run][move][direction].huge) {
				// @ts-ignore
				newScores[paddler][run][move][direction].air = true
			}

			dispatch(updatePaddlerScores(newScores))
		}
	if (
		paddlerScores &&
		paddlerScores[props.paddler.name] &&
		paddlerScores[props.paddler.name][currentRun] &&
		paddlerScores[props.paddler.name][currentRun][props.move.Move]
	) {
		const thisMove =
			paddlerScores[props.paddler.name][currentRun][props.move.Move]
		if (!Array.isArray(thisMove)) {
			if (!thisMove[props.direction].scored) {
				const buttonName = props.move.Move

				return (
					<Button
						onPress={handleMove(
							props.paddler.name,
							currentRun,
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
									currentRun,
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
									currentRun,
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
									currentRun,
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
									currentRun,
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
									currentRun,
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
									currentRun,
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
	}

	return <> </>
})

export const EntryDynamicButton = DynamicButtonPresentation
