import React from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { styles } from "../styles"
import ResultsView from "./mycomponents/resultsView"

const ResultsScreen = () => (
	<SafeAreaView
		style={styles.container}
		testID="results-safe-area"
		accessible={true}
		edges={["top", "left", "right"]}>
		<View style={styles.container}>
			<ScrollView
				style={styles.container}
				testID="results-scroll-view"
				accessible={true}>
				<ResultsView />
			</ScrollView>
		</View>
	</SafeAreaView>
)

ResultsScreen.navigationOptions = {
	title: "Results"
}

export default ResultsScreen
