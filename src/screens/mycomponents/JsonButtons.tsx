// Testing json import
import React, { Fragment } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { batch, useDispatch, useSelector } from "react-redux"
import { addOrRemovePaddlerName, updatePaddlerScores } from "../../actions"
import moveList from "../../data/moves_lists/move_list"
import { IDirection, IPaddler } from "../../reducers"
import {
	getAvailableMovesForPaddler,
	getCategories,
	getCurrentPaddler,
	getCurrentRun,
	getNumberOfPaddlersInHeat,
	getPaddlerHeatList,
	getScoresState
} from "../../selectors"
import { DynamicButton } from "./dynamicButton"
import { EntryDynamicButton } from "./entryDynamicButton"
import CategoryPicker from "./CategoryPicker"
import { dataSourceMoveInterface, initialScoresheet } from "./makePaddlerScores"
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
	const dispatch = useDispatch()
	const currentRun = useSelector(getCurrentRun)
	const currentPaddler = useSelector(getCurrentPaddler)
	const categories = useSelector(getCategories)
	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const paddlerScores = useSelector(getScoresState)
	const numberOfPaddlersInCurrentHeat = useSelector(getNumberOfPaddlersInHeat)
	const showMoves = useSelector(getAvailableMovesForPaddler)
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const screenWidth = Math.round(Dimensions.get("window").width)
	const availableMoves = moveList
	const buttonPercentage = screenWidth > 600 ? "25%" : "50%"
	const entryButtonPercentage = screenWidth > 600 ? "33.33%" : "33.33%"
	const hasCategory = Boolean(currentPaddler?.category)

	const handleCategorySelection = (categoryName: string) => {
		if (
			!currentPaddler ||
			categoryName === "" ||
			categoryName === currentPaddler.category
		) {
			return
		}

		const newPaddlerList = paddlerHeatList.map((p) =>
			p.name === currentPaddler.name ? { ...p, category: categoryName } : p
		)
		const newPaddlerScores = {
			...paddlerScores,
			[currentPaddler.name]: [initialScoresheet()]
		}

		batch(() => {
			dispatch(addOrRemovePaddlerName(newPaddlerList))
			dispatch(updatePaddlerScores(newPaddlerScores))
		})
	}
	{
		if (numberOfPaddlersInCurrentHeat !== 0) {
			if (!hasCategory) {
				return (
					<View testID="category-required-prompt" style={layoutStyles.promptCard}>
						<Text style={layoutStyles.promptTitle}>{"Category Required"}</Text>
						<Text style={layoutStyles.promptText}>
							{`Select a category for ${currentPaddler.name} to show the move list.`}
						</Text>
						{categories.length > 0 ? (
							<CategoryPicker
								currentCategory={currentPaddler.category}
								categoryNames={categories.map((c) => c.name)}
								onSelectCategory={handleCategorySelection}
								pickerTestID="category-picker"
								getOptionTestID={(categoryName) =>
									`set-category-${categoryName}`
								}
							/>
						) : (
							<Text style={layoutStyles.promptSubText}>
								{"Add a category in the Paddlers screen to enable moves."}
							</Text>
						)}
					</View>
				)
			}

			return (
				<View testID="move-buttons" style={layoutStyles.container}>
					<View
						style={layoutStyles.rowWrap}
					>
						{availableMoves.entry.map((item, index) => (
							<View
								testID="entry-button-container"
								style={[
									layoutStyles.cell,
									{ width: entryButtonPercentage }
								]}
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
						style={layoutStyles.rowWrap}
					>
						<>
							{availableMoves.both.map((item, index) => {
								if (!item.Reverse) {
									return (
										<View
											testID="normal-button-container"
											style={[
												layoutStyles.cell,
												{ width: buttonPercentage }
											]}
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
												style={[
													layoutStyles.cell,
													{ width: buttonPercentage }
												]}
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
												style={[
													layoutStyles.cell,
													{ width: buttonPercentage }
												]}
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
													style={[
														layoutStyles.cell,
														{ width: buttonPercentage }
													]}
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
														style={[
															layoutStyles.cell,
															{ width: buttonPercentage }
														]}
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
														style={[
															layoutStyles.cell,
															{ width: buttonPercentage }
														]}
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
													style={[
														layoutStyles.cell,
														{ width: buttonPercentage }
													]}
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
														style={[
															layoutStyles.cell,
															{ width: buttonPercentage }
														]}
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
														style={[
															layoutStyles.cell,
															{ width: buttonPercentage }
														]}
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
													style={[
														layoutStyles.cell,
														{ width: buttonPercentage }
													]}
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
														style={[
															layoutStyles.cell,
															{ width: buttonPercentage }
														]}
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
														style={[
															layoutStyles.cell,
															{ width: buttonPercentage }
														]}
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
						style={layoutStyles.rowWrap}
					>
						{availableMoves.trophy.map((item, index) => (
							<Fragment key={index}>
								<View
									style={[
										layoutStyles.cell,
										{ width: buttonPercentage }
									]}
								>
									<NormalMove
										item={item}
										currentRun={currentRun}
										currentPaddler={currentPaddler}
										direction={"left"}
									/>
								</View>
								<View
									style={[
										layoutStyles.cell,
										{ width: buttonPercentage }
									]}
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

const layoutStyles = StyleSheet.create({
	container: {
		width: "100%"
	},
	promptCard: {
		marginTop: 6,
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderRadius: 6,
		backgroundColor: "#F9FAFB"
	},
	promptTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1F2937",
		marginBottom: 4
	},
	promptText: {
		fontSize: 15,
		color: "#374151",
		marginBottom: 8
	},
	promptSubText: {
		fontSize: 14,
		color: "#6B7280"
	},
	rowWrap: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start"
	},
	cell: {
		paddingHorizontal: 2
	}
})
