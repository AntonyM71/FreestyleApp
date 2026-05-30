import React from "react"
import { StyleSheet, View } from "react-native"
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
					<View style={layoutStyles.unscoredButtonWrap}>
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
					</View>
				)
			} else {
				const buttonName = props.move.Move

				return (
					<View
						style={layoutStyles.buttonBlock}
					>
						<View style={layoutStyles.fullWidthCell}>
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
						<View style={layoutStyles.thirdWidthCell}>
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
						<View style={layoutStyles.thirdWidthCell}>
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
						<View style={layoutStyles.thirdWidthCell}>
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
						<View style={layoutStyles.thirdWidthCell}>
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
						<View style={layoutStyles.thirdWidthCell}>
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
						<View style={layoutStyles.thirdWidthCell}>
								<Button
									onPress={handleMove(
										props.paddler.name,
										currentRun,
										props.move.Move,
										props.direction,
										"style"
									)}
									disabled={props.move.Style ? false : true}
									{...(thisMove[props.direction].style
										? paperButtonProps.bonusScored
										: paperButtonProps.noBonus)}
								>
									{"S"}
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

const layoutStyles = StyleSheet.create({
	unscoredButtonWrap: {
		width: "100%",
		marginTop: 4
	},
	buttonBlock: {
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 4
	},
	fullWidthCell: {
		width: "100%",
		paddingHorizontal: 1.5
	},
	halfWidthCell: {
		width: "50%",
		paddingHorizontal: 1.5
	},
	thirdWidthCell: {
		width: "33.33%",
		paddingHorizontal: 1.5
	}
})
