import React from "react"
import { ScrollView, Text, View } from "react-native"
import { styles } from "../styles"
import CategoryManager from "./mycomponents/categoryManager"
import RunOptions from "./mycomponents/runOptions"
import TimerOptions from "./mycomponents/timerOptions"

export default class SettingsScreen extends React.Component {
	static navigationOptions = {
		title: "Settings"
	}

	render() {
		return (
			<View style={styles.container} testID="settings-container">
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
					testID="settings-scroll-view"
					accessible={true}
				>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap",
							borderBottomColor: "lightgray",
							borderBottomWidth: 2,
							paddingBottom: 5
						}}
						testID="score-options-container"
					>
						<View
							style={{
								width: "100%"
							}}
						>
							<Text
								style={{
									...styles.headerText,
									justifyContent: "space-around",
									alignItems: "center",
									borderBottomColor: "lightgray",
									borderBottomWidth: 1,
									paddingBottom: 5
								}}
								testID="score-options-header"
							>
								{"Score Page Options"}
							</Text>
						</View>
						<View style={{ width: "50%" }} testID="timer-options-container">
							<TimerOptions />
						</View>
						<View style={{ width: "50%" }} testID="run-options-container">
							<RunOptions />
						</View>
					</View>
					<View>
						<Text
							style={{
								...styles.headerText,
								justifyContent: "space-around",
								alignItems: "center",
								borderBottomColor: "lightgray",
								borderBottomWidth: 1,
								paddingBottom: 5
							}}
							testID="categories-header"
						>
							{"Categories"}
						</Text>
					</View>
					<View style={{ width: "100%" }} testID="category-manager-container">
						<CategoryManager />
					</View>
				</ScrollView>
			</View>
		)
	}
}
