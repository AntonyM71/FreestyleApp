// Testing json import
import React, { Fragment } from "react"
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
	{
		if (numberOfPaddlersInCurrentHeat !== 0) {
			return (
				<View testID="move-buttons">
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "space-between"
						}}
					>
						{availableMoves.entry.map((item, index) => (
							<View
								testID="entry-button-container"
								style={{ width: entryButtonPercentage }}
								key={index}
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
							{availableMoves.both.map((item, index) => {
								if (!item.Reverse) {
									return (
										<View
											testID="normal-button-container"
											style={{ width: buttonPercentage }}
											key={index}
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
										<Fragment key={index}>
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
										</Fragment>
									)
								}
							})}
						</>
						<>
							{showMoves.hole
								? availableMoves.hole.map((item, index) => {
										if (!item.Reverse) {
											return (
												<View
													style={{
														width: buttonPercentage
													}}
													key={index}
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
												<Fragment key={index}>
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
												</Fragment>
											)
										}
									})
								: null}
						</>
						<>
							{showMoves.wave
								? availableMoves.wave.map((item, index) => {
										if (!item.Reverse) {
											return (
												<View
													style={{
														width: buttonPercentage
													}}
													key={index}
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
												<Fragment key={index}>
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
												</Fragment>
											)
										}
									})
								: null}
						</>
						<>
							{showMoves.nfl
								? availableMoves.nfl.map((item, index) => {
										if (!item.Reverse) {
											return (
												<View
													style={{
														width: buttonPercentage
													}}
													key={index}
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
												<Fragment key={index}>
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
												</Fragment>
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
						{availableMoves.trophy.map((item, index) => (
							<Fragment key={index}>
								<View
									style={{
										width: buttonPercentage
									}}
								>
									<NormalMove
										item={item}
										currentRun={currentRun}
										currentPaddler={currentPaddler}
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
										currentPaddler={currentPaddler}
										direction={"right"}
									/>
								</View>
							</Fragment>
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
