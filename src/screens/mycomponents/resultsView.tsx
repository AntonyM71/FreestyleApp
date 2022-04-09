// Testing json import
import React from "react"
import { Dimensions, ScrollView, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { IPaddler } from "../../reducers"
import { getPaddlerHeatList, getScoresState } from "../../selectors"
import { styles } from "../../styles"
import { DisplayScore } from "./calculateScore"
export const ResultsView = () => {
	const screenWidth = Math.round(Dimensions.get("window").width)
	const buttonPercentage = screenWidth > 600 ? "12.5%" : "25%"

	const paddlerHeatList = useSelector(getPaddlerHeatList)
	const paddlerScores = useSelector(getScoresState)

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				{paddlerHeatList.flat().length !== 0 ? (
					<View>
						<Text style={styles.heatStyle}>{"Results"}</Text>
						{paddlerHeatList
							.flat()
							.map((paddler: IPaddler, key: string | number) => (
								<View key={key}>
									<View>
										<Text
											style={{
												...styles.standardText,
												justifyContent: "center",
												alignItems: "center"
											}}
										>
											{paddler.name}
										</Text>
									</View>
									<>
										<View
											style={{
												flex: 1,
												flexDirection: "row",
												flexWrap: "wrap"
											}}
										>
											{
												// @ts-ignore
												paddlerScores[paddler.name].map(
													(
														runScore: any,
														runKey: string | number
													) => (
														<View
															style={{
																width: buttonPercentage
															}}
															key={runKey}
														>
															<DisplayScore
																paddler={
																	paddler.name
																}
																run={runKey}
															/>
														</View>
													)
												)
											}
											{/* <Divider style={{ backgroundColor: 'blue' }} />; */}
										</View>
									</>
								</View>
							))}
					</View>
				) : (
					<View>
						<Text
							style={{
								...styles.standardText,
								textAlign: "center",
								marginTop: 10
							}}
						>
							{"Please add a paddler."}
						</Text>
					</View>
				)}
			</ScrollView>
		</View>
	)
}

export default ResultsView
