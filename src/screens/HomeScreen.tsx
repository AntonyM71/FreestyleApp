import React from "react"
import { Dimensions, SafeAreaView, ScrollView, View, ViewStyle } from "react-native"
import { styles } from "../styles"
import HeatHandler from "./mycomponents/heatHandler"
import MoveButtons from "./mycomponents/JsonButtons"
import { PaddlerHandler } from "./mycomponents/paddlerHandler"
import Timer from "./mycomponents/timer"

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	state = {
		paddlerList: ["paddler1", "paddler2"],
		paddlerIndex: 0
	}

	render() {
		const buttonPercentage = (start: number): ViewStyle => ({
			width: Math.round(Dimensions.get("window").width) > 600
				? `${start * 0.5}%`
				: `${start}%`
		})

		return (
			<SafeAreaView
				style={styles.container}
				testID="home-safe-area"
				accessible={true}>
				<View style={styles.container}>
					<ScrollView
						style={styles.container}
						contentContainerStyle={styles.contentContainer}
						testID="home-scroll-view"
						accessible={true}>
						<View
							style={{
								flex: 1,
								flexDirection: "row",
								flexWrap: "wrap"
							}}>
							<View testID="timer-container" style={buttonPercentage(33.3)}>
								<Timer />
							</View>
							<View testID="heat-handler-container" style={buttonPercentage(66.6)}>
								<HeatHandler />
							</View>
							<View testID="paddler-handler-container" style={buttonPercentage(100)}>
								<PaddlerHandler />
							</View>
							<View testID="move-buttons-container">
								<MoveButtons />
							</View>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}
}
