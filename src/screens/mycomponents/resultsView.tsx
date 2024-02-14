// Testing json import
import React from "react"
import { Dimensions, ScrollView, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { IPaddler, IPaddlerList } from "../../reducers"
import { getPaddlerHeatList, getScoresState } from "../../selectors"
import { styles } from "../../styles"
import { DisplayScore } from "./calculateScore"
export const ResultsView = () => {
	const paddlerHeatList = useSelector(getPaddlerHeatList)

	const paddlerCategories = Array.from(
		new Set(paddlerHeatList.map((p) => p.category))
	)
	const paddlerCategoriesList = paddlerCategories.map((c) =>
		paddlerHeatList.filter((p) => p.category === c)
	)

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				{paddlerCategoriesList.map((paddlersInCategory, index) => (
					<CategoryScores
						paddlerHeatList={paddlersInCategory}
						category={paddlerCategories[index]}
						key={index}
					/>
				))}
			</ScrollView>
		</View>
	)
}

const CategoryScores = ({
	paddlerHeatList,
	category
}: {
	paddlerHeatList: IPaddlerList
	category: string
}) => {
	const screenWidth = Math.round(Dimensions.get("window").width)
	const buttonPercentage = screenWidth > 600 ? "12.5%" : "25%"
	const paddlerScores = useSelector(getScoresState)

	return (
		<View
			style={{
				borderTopColor: "gray",
				borderTopWidth: 2
			}}
		>
			<View
				style={{
					borderBottomColor: "lightgray",
					borderBottomWidth: 2,
					justifyContent: "center"
				}}
			>
				<Text
					style={{
						...styles.headerText,
						justifyContent: "center"
					}}
				>
					{category}
				</Text>
			</View>
			{paddlerHeatList.map((paddler: IPaddler, key: string | number) => (
				<View
					key={key}
					style={{
						borderBottomColor: "lightgray",
						borderBottomWidth: 1
					}}
				>
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
									(runScore: any, runKey: number) => (
										<View
											style={{
												width: buttonPercentage
											}}
											key={runKey}
										>
											<DisplayScore
												paddler={paddler.name}
												run={runKey}
											/>
										</View>
									)
								)
							}
						</View>
					</>
				</View>
			))}
		</View>
	)
}
export default ResultsView
