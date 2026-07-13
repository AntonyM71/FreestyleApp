// Testing json import
import React from "react"
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native"
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
				contentContainerStyle={layoutStyles.resultsContent}
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
	const nameColumnWidth = screenWidth > 900 ? "24%" : screenWidth > 600 ? "28%" : "36%"
	const runColumnWidth = screenWidth > 900 ? "76%" : screenWidth > 600 ? "72%" : "64%"
	const paddlerScores = useSelector(getScoresState)

	const getScoreCellWidth = (runCount: number) => {
		if (screenWidth > 900) {
			return runCount <= 5 ? "20%" : "16.66%"
		}

		if (screenWidth > 600) {
			return runCount <= 4 ? "25%" : "20%"
		}

		if (runCount <= 2) {
			return "50%"
		}

		if (runCount <= 4) {
			return "33.33%"
		}

		return "25%"
	}

	return (
		<View style={layoutStyles.card}>
			<View style={layoutStyles.cardHeader}>
				<Text style={layoutStyles.cardHeaderText}>{category}</Text>
			</View>
			{paddlerHeatList.map((paddler: IPaddler, key: string | number) => {
				const runs: unknown[] = paddlerScores[paddler.name] || []

				return (
					<View
						key={key}
						style={[
							layoutStyles.paddlerRow,
							key === paddlerHeatList.length - 1
								? layoutStyles.lastPaddlerRow
								: null
						]}
					>
						<View style={[layoutStyles.paddlerNameWrap, { width: nameColumnWidth }]}>
							<Text
								numberOfLines={1}
								ellipsizeMode="tail"
								style={layoutStyles.paddlerNameText}
							>
								{paddler.name}
							</Text>
						</View>
						<View style={[layoutStyles.scoreGrid, { width: runColumnWidth }]}>
							{runs.map((_: unknown, runKey: number) => (
								<View
									style={[
										layoutStyles.scoreCell,
										{ width: getScoreCellWidth(runs.length) }
									]}
									key={runKey}
								>
									<Text style={layoutStyles.scoreLabel}>{`Run ${runKey + 1}`}</Text>
									<DisplayScore
										paddler={paddler.name}
										run={runKey}
										fontSize={16}
									/>
								</View>
							))}
						</View>
					</View>
				)
			})}
		</View>
	)
}

const layoutStyles = StyleSheet.create({
	resultsContent: {
		paddingHorizontal: 10,
		paddingTop: 8,
		paddingBottom: 20
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 8,
		marginBottom: 12,
		borderColor: "#D9DDE3",
		borderWidth: 1,
		elevation: 2,
		shadowColor: "#000000",
		shadowOpacity: 0.08,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 1
		}
	},
	cardHeader: {
		backgroundColor: "#F5F7FA",
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		borderBottomColor: "#E8EBEF",
		borderBottomWidth: StyleSheet.hairlineWidth,
		paddingHorizontal: 12,
		paddingVertical: 10
	},
	cardHeaderText: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1F2937"
	},
	paddlerRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderBottomColor: "#ECEFF3",
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	lastPaddlerRow: {
		borderBottomWidth: 0
	},
	paddlerNameWrap: {
		paddingRight: 8,
		paddingTop: 4
	},
	paddlerNameText: {
		fontSize: 16,
		fontWeight: "500",
		color: "#111827"
	},
	scoreGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start"
	},
	scoreCell: {
		paddingRight: 6,
		paddingBottom: 3
	},
	scoreLabel: {
		fontSize: 12,
		color: "#6B7280",
		marginLeft: 8,
		marginTop: 2
	}
})

export default ResultsView
