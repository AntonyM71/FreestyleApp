import React from "react"
import { ScrollView, Text, View } from "react-native"
import { styles } from "../styles"
import CategoryManager from "./mycomponents/categoryManager"
import RunOptions from "./mycomponents/runOptions"
import TimerOptions from "./mycomponents/timerOptions"
export default class HomeScreen extends React.Component {
	static navigationOptions = {
		title: "Settings"
	}

	state = {
		paddlerList: ["paddler1", "paddler2", "c1er"],
		paddlerIndex: 0
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							flexWrap: "wrap",

							borderBottomColor: "gray",
							borderBottomWidth: 1,
							paddingBottom: 5
						}}
					>
						<View style={{ width: "50%" }}>
							<TimerOptions />
						</View>
						<View style={{ width: "50%" }}>
							<RunOptions />
						</View>
					</View>
					<Text
						style={{
							...styles.standardText,
							justifyContent: "space-around",
							alignItems: "center",
							borderBottomColor: "gray",
							borderBottomWidth: 1,
							paddingBottom: 5
						}}
					>
						{"Categories"}
					</Text>
					<View style={{ width: "100%" }}>
						<CategoryManager />
					</View>
				</ScrollView>
			</View>
		)
	}
}
