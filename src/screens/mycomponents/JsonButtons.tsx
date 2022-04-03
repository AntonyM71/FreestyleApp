// Testing json import
import React from "react"
import { Dimensions, View } from "react-native"
import { useSelector } from "react-redux"
import moveList from "../../data/moves_lists/move_list"
import { IDirection, IPaddlerList } from "../../reducers"
import {
	getCurrentHeat,
	getCurrentRun,
	getPaddlerHeatList,
	getPaddlerIndex,
	getShowMoves
} from "../../selectors"
import { DynamicButton } from "./dynamicButton"
import { EntryDynamicButton } from "./entryDynamicButton"
import { TrophyDynamicButton } from "./trophyDynamicButton"

const NormalMove = (props: {
	paddlerList: IPaddlerList
	currentHeat: number
	paddlerIndex: number
	currentRun: number
	item: any
	direction: IDirection
}) => (
	<DynamicButton
		paddler={props.paddlerList[props.currentHeat][props.paddlerIndex]}
		currentRun={props.currentRun}
		move={props.item}
		direction={props.direction}
	/>
)

export const MoveButtons = () => {
	const currentRun = useSelector(getCurrentRun)
	const paddlerIndex = useSelector(getPaddlerIndex)
	const paddlerList = useSelector(getPaddlerHeatList)
	const currentHeat = useSelector(getCurrentHeat)
	const showMoves = useSelector(getShowMoves)
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const screenWidth = Math.round(Dimensions.get("window").width)
	const availableMoves = moveList
	const buttonPercentage = screenWidth > 600 ? "25%" : "50%"
	const entryButtonPercentage = screenWidth > 600 ? "33%" : "33%"
	const trophyButtonPercentage = screenWidth > 600 ? "33%" : "50%"
	{
		if (paddlerList[currentHeat].length !== 0) {
			return (
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "space-between"
					}}
				>
					<>
						{availableMoves.entry.map((item) => (
							<View
								style={{ width: entryButtonPercentage }}
								key={item.Move}
							>
								<EntryDynamicButton
									paddler={
										paddlerList[currentHeat][paddlerIndex]
									}
									currentRun={currentRun}
									move={item}
									direction={"left"}
								/>
							</View>
						))}
					</>
					<>
						{availableMoves.both.map((item) => {
							if (!item.Reverse) {
								return (
									<View
										style={{ width: buttonPercentage }}
										key={item.Move}
									>
										<NormalMove
											item={item}
											currentRun={currentRun}
											paddlerList={paddlerList}
											paddlerIndex={paddlerIndex}
											currentHeat={currentHeat}
											direction={"left"}
										/>
									</View>
								)
							} else {
								return (
									<>
										<View
											style={{ width: buttonPercentage }}
											key={item.Move}
										>
											<NormalMove
												item={item}
												currentRun={currentRun}
												paddlerList={paddlerList}
												paddlerIndex={paddlerIndex}
												currentHeat={currentHeat}
												direction={"left"}
											/>
										</View>
										<View
											style={{ width: buttonPercentage }}
										>
											<NormalMove
												item={item}
												currentRun={currentRun}
												paddlerList={paddlerList}
												paddlerIndex={paddlerIndex}
												currentHeat={currentHeat}
												direction={"right"}
											/>
										</View>
									</>
								)
							}
						})}
					</>
					<>
						{showMoves.hole
							? availableMoves.hole.map((item) => {
									if (!item.Reverse) {
										return (
											<View
												style={{
													width: buttonPercentage
												}}
												key={item.Move}
											>
												<NormalMove
													item={item}
													currentRun={currentRun}
													paddlerList={paddlerList}
													paddlerIndex={paddlerIndex}
													currentHeat={currentHeat}
													direction={"left"}
												/>
											</View>
										)
									} else {
										return (
											<>
												<View
													style={{
														width: buttonPercentage
													}}
													key={item.Move}
												>
													<NormalMove
														item={item}
														currentRun={currentRun}
														paddlerList={
															paddlerList
														}
														paddlerIndex={
															paddlerIndex
														}
														currentHeat={
															currentHeat
														}
														direction={"left"}
													/>
												</View>
												<View
													style={{
														width: buttonPercentage
													}}
												>
													<NormalMove
														item={item}
														currentRun={currentRun}
														paddlerList={
															paddlerList
														}
														paddlerIndex={
															paddlerIndex
														}
														currentHeat={
															currentHeat
														}
														direction={"right"}
													/>
												</View>
											</>
										)
									}
							  })
							: null}
					</>
					<>
						{showMoves.wave
							? availableMoves.wave.map((item) => {
									if (!item.Reverse) {
										return (
											<View
												style={{
													width: buttonPercentage
												}}
												key={item.Move}
											>
												<NormalMove
													item={item}
													currentRun={currentRun}
													paddlerList={paddlerList}
													paddlerIndex={paddlerIndex}
													currentHeat={currentHeat}
													direction={"left"}
												/>
											</View>
										)
									} else {
										return (
											<>
												<View
													style={{
														width: buttonPercentage
													}}
													key={item.Move}
												>
													<NormalMove
														item={item}
														currentRun={currentRun}
														paddlerList={
															paddlerList
														}
														paddlerIndex={
															paddlerIndex
														}
														currentHeat={
															currentHeat
														}
														direction={"left"}
													/>
												</View>
												<View
													style={{
														width: buttonPercentage
													}}
												>
													<NormalMove
														item={item}
														currentRun={currentRun}
														paddlerList={
															paddlerList
														}
														paddlerIndex={
															paddlerIndex
														}
														currentHeat={
															currentHeat
														}
														direction={"right"}
													/>
												</View>
											</>
										)
									}
							  })
							: null}
					</>
					<>
						{availableMoves.trophy.map((item, key) => (
							<View
								style={{ width: trophyButtonPercentage }}
								key={item.Move + key.toString()}
							>
								<TrophyDynamicButton
									paddler={
										paddlerList[currentHeat][paddlerIndex]
									}
									currentRun={currentRun}
									move={item}
									direction={"left"}
								/>
							</View>
						))}
					</>
				</View>
			)
		} else {
			return null
		}
	}
}

export default MoveButtons
