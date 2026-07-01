import React from "react"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"

import { updatePaddlerScores } from "../../actions"
import { IDirection, IPaddler } from "../../reducers"
import { getCurrentRun, getPaddlerScores } from "../../selectors"
import { paperButtonProps } from "../../styles"
import { dataSourceMoveInterface, moveSideInterface } from "./makePaddlerScores"

interface PropsType {
	paddler: IPaddler
	move: dataSourceMoveInterface
	direction: IDirection
}

interface BonusMoveButtonProps {
	onPress: () => void
	disabled: boolean
	isScored: boolean
	label: string
}

const BonusMoveButton = ({ onPress, disabled, isScored, label }: BonusMoveButtonProps) => (
	<View style={layoutStyles.thirdWidthCell}>
		<Button
			onPress={onPress}
			disabled={disabled}
			{...(isScored ? paperButtonProps.bonusScored : paperButtonProps.noBonus)}
		>
			{label}
		</Button>
	</View>
)

const DynamicButtonPresentation = React.memo((props: PropsType) => {
	const dispatch = useDispatch()
	const currentRun = useSelector(getCurrentRun)
	const paddlerScores = useSelector(getPaddlerScores)

	const handleMove = (
		paddler: string,
		run: number,
		move: string,
		direction: IDirection,
		type: keyof moveSideInterface
	) => () => {
		const newScores = { ...paddlerScores }
		newScores[paddler][run][move][direction][type] =
			!newScores[paddler][run][move][direction][type]

		if (newScores[paddler][run][move][direction].huge) {
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
		if (Array.isArray(thisMove)) {
			return <> </>
		}

		const bonusHandler = (type: keyof moveSideInterface) =>
			handleMove(props.paddler.name, currentRun, props.move.Move, props.direction, type)
		const side = thisMove[props.direction]

		if (!side.scored) {
			return (
				<View style={layoutStyles.unscoredButtonWrap}>
					<Button
						onPress={bonusHandler("scored")}
						{...paperButtonProps.noMove}
					>
						{props.move.Move}
					</Button>
				</View>
			)
		}

		return (
			<View style={layoutStyles.buttonBlock}>
				<View style={layoutStyles.fullWidthCell}>
					<Button onPress={bonusHandler("scored")} {...paperButtonProps.moveScored}>
						{props.move.Move}
					</Button>
				</View>
				<BonusMoveButton
					onPress={bonusHandler("clean")}
					disabled={!props.move.Clean}
					isScored={side.clean}
					label="C"
				/>
				<BonusMoveButton
					onPress={bonusHandler("superClean")}
					disabled={!props.move.SuperClean}
					isScored={side.superClean}
					label="SC"
				/>
				<BonusMoveButton
					onPress={bonusHandler("link")}
					disabled={!props.move.Link}
					isScored={side.link}
					label="L"
				/>
				<BonusMoveButton
					onPress={bonusHandler("air")}
					disabled={!props.move.Air}
					isScored={side.air}
					label="A"
				/>
				<BonusMoveButton
					onPress={bonusHandler("huge")}
					disabled={!props.move.Huge}
					isScored={side.huge}
					label="H"
				/>
				<BonusMoveButton
					onPress={bonusHandler("style")}
					disabled={!props.move.Style}
					isScored={side.style}
					label="S"
				/>
			</View>
		)
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
