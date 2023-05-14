import React from "react"
import { SafeAreaView, ScrollView, View } from "react-native"
import { styles } from "../../styles"
import PaddlerManager from "./paddlerManagementHandler"
export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<ScrollView
						style={styles.container}
						contentContainerStyle={styles.contentContainer}
					>
						<PaddlerManager />
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}
}
