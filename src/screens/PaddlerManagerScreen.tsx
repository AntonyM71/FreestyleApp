import React from "react"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "../styles"
import PaddlerManager from "./mycomponents/paddlerManagementHandler"

export default class PaddlerManagerScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	render() {
		return (
			<SafeAreaView
				style={styles.container}
				testID="paddler-manager-safe-area"
				accessible={true}>
				<View style={styles.container}>
					<ScrollView
						style={styles.container}
						contentContainerStyle={styles.contentContainer}
						testID="paddler-manager-scroll-view"
						accessible={true}>
						<View testID="paddler-manager-container">
							<PaddlerManager />
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}
}
