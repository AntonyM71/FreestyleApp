// Testing json import
import React from "react"
import { Dimensions, View } from "react-native"
import { useSelector } from "react-redux"
import moveList from "../../data/moves_lists/move_list"
import { IDirection, IPaddler } from "../../reducers"
import {
	getAvailableMovesForPaddler,
	getCurrentPaddler,
	getCurrentRun,
	getNumberOfPaddlersInHeat
} from "../../selectors"
import { DynamicButton } from "./dynamicButton"
import { EntryDynamicButton } from "./entryDynamicButton"
import { dataSourceMoveInterface } from "./makePaddlerScores"
import { TrophyDynamicButton } from "./trophyDynamicButton"

const NormalMove = (props: {
	currentPaddler: IPaddler
	currentRun: number
	item: dataSourceMoveInterface
	direction: IDirection
}) => (
	<DynamicButton
		paddler={props.currentPaddler}
		currentRun={props.currentRun}
		move={props.item}
		direction={props.direction}
	/>
)

export const MoveButtons = () => {
	const currentRun = useSelector(getCurrentRun)
	const currentPaddler = useSelector(getCurrentPaddler)
	const numberOfPaddlersInCurrentHeat = useSelector(getNumberOfPaddlersInHeat)
	const showMoves = useSelector(getAvailableMovesForPaddler)
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const screenWidth = Math.round(Dimensions.get("window").width)
	const availableMoves = moveList
	const buttonPercentage = screenWidth > 600 ? "25%" : "50%"
	const entryButtonPercentage = screenWidth > 600 ? "33%" : "33%"
	const trophyButtonPercentage = screenWidth > 600 ? "33%" : "50%"
	{
		if (numberOfPaddlersInCurrentHeat !== 0) {
			return (
				<View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "space-between"
						}}
					>
						{availableMoves.entry.map((item) => (
							<View
								style={{ width: entryButtonPercentage }}
								key={item.Move}
							>
								<EntryDynamicButton
									paddler={currentPaddler}
									move={item}
									direction={"left"}
								/>
							</View>
						))}
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "flex-start"
						}}
					>
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
												currentPaddler={currentPaddler}
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
													currentPaddler={
														currentPaddler
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
													currentPaddler={
														currentPaddler
													}
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
														currentPaddler={
															currentPaddler
														}
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
															currentRun={
																currentRun
															}
															currentPaddler={
																currentPaddler
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
															currentRun={
																currentRun
															}
															currentPaddler={
																currentPaddler
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
														currentPaddler={
															currentPaddler
														}
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
															currentRun={
																currentRun
															}
															currentPaddler={
																currentPaddler
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
															currentRun={
																currentRun
															}
															currentPaddler={
																currentPaddler
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
							{showMoves.nfl
								? availableMoves.nfl.map((item) => {
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
														currentPaddler={
															currentPaddler
														}
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
															currentRun={
																currentRun
															}
															currentPaddler={
																currentPaddler
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
															currentRun={
																currentRun
															}
															currentPaddler={
																currentPaddler
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
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "space-between"
						}}
					>
						{availableMoves.trophy.map((item, key) => (
							<View
								style={{ width: trophyButtonPercentage }}
								key={item.Move + key.toString()}
							>
								<TrophyDynamicButton
									paddler={currentPaddler}
									move={item}
									direction={"left"}
								/>
							</View>
						))}
					</View>
				</View>
			)
		} else {
			return null
		}
	}
}

export default MoveButtons
