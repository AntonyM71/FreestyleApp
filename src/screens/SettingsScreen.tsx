import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
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
			<SafeAreaView style={styles.container} testID="settings-safe-area" accessible={true}>
				<View style={styles.container} testID="settings-container">
					<ScrollView
						style={styles.container}
						contentContainerStyle={layoutStyles.settingsContent}
						testID="settings-scroll-view"
						accessible={true}
					>
						<View
							style={layoutStyles.card}
							testID="score-options-container"
						>
							<View style={layoutStyles.cardHeader}>
								<Text
									style={layoutStyles.cardHeaderText}
									testID="score-options-header"
								>
									{"Score Page Options"}
								</Text>
							</View>
							<View
								style={layoutStyles.halfWidthOption}
								testID="timer-options-container"
							>
								<TimerOptions />
							</View>
							<View
								style={layoutStyles.halfWidthOption}
								testID="run-options-container"
							>
								<RunOptions />
							</View>
						</View>
						<View style={layoutStyles.card}>
							<View style={layoutStyles.cardHeader}>
								<Text style={layoutStyles.cardHeaderText} testID="categories-header">
									{"Categories"}
								</Text>
							</View>
							<View style={layoutStyles.categoryManagerWrap} testID="category-manager-container">
								<CategoryManager />
							</View>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}
}

const layoutStyles = StyleSheet.create({
	settingsContent: {
		paddingHorizontal: 10,
		paddingTop: 8,
		paddingBottom: 20
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderColor: "#D9DDE3",
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 12,
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
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: "#F5F7FA",
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		borderBottomColor: "#E8EBEF",
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	cardHeaderText: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1F2937"
	},
	halfWidthOption: {
		width: "50%",
		paddingHorizontal: 6,
		paddingVertical: 8
	},
	categoryManagerWrap: {
		width: "100%",
		paddingHorizontal: 8,
		paddingBottom: 8
	}
})
