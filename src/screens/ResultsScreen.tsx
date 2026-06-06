import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { Button } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import { getPaddlerHeatList, getScoresState } from "../selectors"
import { styles } from "../styles"
import { exportScoresToCsv } from "../utils/exportScores"
import ExportModal from "./mycomponents/ExportModal"
import ResultsView from "./mycomponents/resultsView"

const ResultsScreenComponent = () => {
	const [exportModalVisible, setExportModalVisible] = useState(false)
	const paddlerList = useSelector(getPaddlerHeatList)
	const paddlerScores = useSelector(getScoresState)

	const handleExportCsv = async () => {
		setExportModalVisible(false)
		await exportScoresToCsv(paddlerList, paddlerScores)
	}

	const exportOptions = [
		{
			key: "csv",
			label: "Save as CSV",
			onPress: () => { void handleExportCsv() }
		}
	]

	return (
		<SafeAreaView style={styles.container} testID="results-safe-area" accessible={true}>
			<View style={styles.container}>
				<ResultsView />
			</View>
			<View style={layoutStyles.footer}>
				<Button
					mode="contained"
					onPress={() => setExportModalVisible(true)}
					testID="share-button"
				>
					{"Share"}
				</Button>
			</View>
			<ExportModal
				visible={exportModalVisible}
				options={exportOptions}
				onCancel={() => setExportModalVisible(false)}
			/>
		</SafeAreaView>
	)
}

ResultsScreenComponent.navigationOptions = {
	title: "Results"
}

const layoutStyles = StyleSheet.create({
	footer: {
		padding: 12,
		backgroundColor: "#fff"
	}
})

export default ResultsScreenComponent
