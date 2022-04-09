import React from "react"
import { ScrollView, Text, View } from "react-native"
import { styles } from "../styles"
import MoveSelection from "./mycomponents/enabledMoves"
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
							flexWrap: "wrap"
						}}
					>
						<View style={{ width: "50%" }}>
							<TimerOptions />
						</View>
						<View style={{ width: "50%" }}>
							<RunOptions />
						</View>
						<View style={{ width: "100%" }}>
							<Text
								style={{
									...styles.standardText,
									textAlign: "center",
									marginBottom: -15
								}}
							>
								{"Changing available moves will reset scores"}
							</Text>
						</View>
						<View style={{ width: "100%" }}>
							<MoveSelection />
						</View>
					</View>
				</ScrollView>
			</View>
		)
	}
}
