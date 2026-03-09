import React from "react"
import { View } from "react-native"
import { Button } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { updatePaddlerScores } from "../../actions"
import { IDirection, IPaddler } from "../../reducers"
import { getCurrentRun, getPaddlerScores } from "../../selectors"
import { paperButtonProps } from "../../styles"
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
						{...paperButtonProps.noMove}
					>
						{buttonName}
					</Button>
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
								{...paperButtonProps.moveScored}
							>
								{buttonName}
							</Button>
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
								disabled={props.move.Clean ? false : true}
								{...(thisMove[props.direction].clean
									? paperButtonProps.bonusScored
									: paperButtonProps.noBonus)}
							>
								{"C"}
							</Button>
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
								disabled={props.move.SuperClean ? false : true}
								{...(thisMove[props.direction].superClean
									? paperButtonProps.bonusScored
									: paperButtonProps.noBonus)}
							>
								{"SC"}
							</Button>
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
								disabled={props.move.Air ? false : true}
								{...(thisMove[props.direction].air
									? paperButtonProps.bonusScored
									: paperButtonProps.noBonus)}
							>
								{"A"}
							</Button>
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
								disabled={props.move.Huge ? false : true}
								{...(thisMove[props.direction].huge
									? paperButtonProps.bonusScored
									: paperButtonProps.noBonus)}
							>
								{"H"}
							</Button>
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
								disabled={props.move.Link ? false : true}
								{...(thisMove[props.direction].link
									? paperButtonProps.bonusScored
									: paperButtonProps.noBonus)}
							>
								{"L"}
							</Button>
						</View>
					</View>
				)
			}
		}
	}

	return <> </>
})

export const EntryDynamicButton = DynamicButtonPresentation
