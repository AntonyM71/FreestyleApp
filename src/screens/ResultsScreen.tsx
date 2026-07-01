import React from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { styles } from "../styles"
import ResultsView from "./mycomponents/resultsView"

export default class ResultsScreen extends React.Component {
	static navigationOptions = {
		title: "Results"
	}

	render() {
		return (
			<SafeAreaView style={styles.container} testID="results-safe-area" accessible={true}>
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
	}
}
