import React from "react"
import { Dimensions, SafeAreaView, ScrollView, View } from "react-native"
import { styles } from "../styles"
import HeatHandler from "./components/heatHandler"
import MoveButtons from "./components/JsonButtons"
import { PaddlerHandler } from "./components/paddlerHandler"
import Timer from "./components/timer"
export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	}

	state = {
		paddlerList: ["paddler1", "paddler2"],
		paddlerIndex: 0
	}
	render() {
		const buttonPercentage = (start: number) =>
			Math.round(Dimensions.get("window").width) > 600
				? `${start * 0.5}%`
				: `${start}%`

		return (
			<SafeAreaView style={styles.container}>
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
							<View style={{ width: buttonPercentage(33.3) }}>
								<Timer />
							</View>
							<View style={{ width: buttonPercentage(66.6) }}>
								<HeatHandler />
							</View>
							<View style={{ width: buttonPercentage(100) }}>
								<PaddlerHandler />
							</View>
							<View>
								<MoveButtons />
							</View>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		)
	}
}
