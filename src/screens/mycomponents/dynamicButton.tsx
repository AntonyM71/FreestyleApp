import React from "react"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"

import { updatePaddlerScores } from "../../actions"
import { IMoves } from "../../data/moves_lists/move_list"
import { IDirection, IPaddler, IPaddlerScores } from "../../reducers"
import { getPaddlerScores } from "../../selectors"
import { paperButtonProps } from "../../styles"
import { moveSideInterface } from "./makePaddlerScores"

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

interface IPropsType {
	paddler: IPaddler
	currentRun: number
	move: IMoves
	direction: IDirection
}

type PaddlerRuns = IPaddlerScores[string] | Record<number, IPaddlerScores[string][number]>

const DynamicButtonPresentation = React.memo((props: IPropsType) => {
	const dispatch = useDispatch()
	const paddlerScores = useSelector(getPaddlerScores)
	const oneSidedMoves = ["Loop", "Back Loop"]

	const handleMove = (
		paddler: string,
		currentRun: number,
		move: string,
		direction: IDirection,
		type: keyof moveSideInterface
	) => () => {
		const existingRuns = paddlerScores[paddler] as PaddlerRuns
		const paddlerRuns: PaddlerRuns = Array.isArray(existingRuns)
			? [...existingRuns]
			: { ...existingRuns }
		const runScores = { ...paddlerRuns[currentRun] }
		const moveScores = runScores[move]
		const nextSide = {
			...moveScores[direction],
			[type]: !moveScores[direction][type]
		}
		const updatedSide = nextSide.huge ? { ...nextSide, air: true } : nextSide
		paddlerRuns[currentRun] = {
			...runScores,
			[move]: {
				...moveScores,
				[direction]: updatedSide
			}
		}
		const newScores = {
			...paddlerScores,
			[paddler]: paddlerRuns as IPaddlerScores[string]
		}
		dispatch(updatePaddlerScores(newScores))
	}

	const thisMove =
		paddlerScores[props.paddler.name][props.currentRun][props.move.Move]
	if (Array.isArray(thisMove)) {
		return null
	}

	const isOneSided = oneSidedMoves.includes(props.move.Move)
	const buttonName = isOneSided
		? props.move.Move
		: props.move.Move + " " + props.direction[0].toUpperCase()

	if (!thisMove[props.direction].scored) {
		return (
			<View style={layoutStyles.unscoredButtonWrap}>
				<Button
					onPress={handleMove(
						props.paddler.name,
						props.currentRun,
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
	}

	const bonusHandler = (type: keyof moveSideInterface) =>
		handleMove(props.paddler.name, props.currentRun, props.move.Move, props.direction, type)
	const side = thisMove[props.direction]

	return (
		<View style={layoutStyles.buttonBlock}>
			<View style={layoutStyles.fullWidthCell}>
				<Button onPress={bonusHandler("scored")} {...paperButtonProps.moveScored}>
					{buttonName}
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
})

// can we make this go deeper, so that we only update a single component when we add a move?

export const DynamicButton = DynamicButtonPresentation

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
