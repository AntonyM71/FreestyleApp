import React from "react"
import { Dimensions, ScrollView, View, ViewStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useSelector } from "react-redux"

import { getShowTimer } from "../selectors"
import { styles } from "../styles"
import HeatHandler from "./mycomponents/heatHandler"
import MoveButtons from "./mycomponents/JsonButtons"
import { PaddlerHandler } from "./mycomponents/paddlerHandler"
import Timer from "./mycomponents/timer"

const HomeScreen = () => {
	const showTimer = useSelector(getShowTimer)
	const buttonPercentage = (start: number): ViewStyle => ({
		width: Math.round(Dimensions.get("window").width) > 600
			? `${start * 0.5}%`
			: `${start}%`
	})
	const isTabletLayout = Math.round(Dimensions.get("window").width) > 600

	const heatWidth = showTimer ? 66.6 : 100

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
					<View style={{ flex: 1 }}>
						{isTabletLayout ? (
							<View style={{ flexDirection: "row" }}>
								<View style={{ width: "50%", paddingHorizontal: 2 }}>
									{showTimer ? (
										<View testID="timer-container" style={{ width: "100%" }}>
											<Timer />
										</View>
									) : null}
									<View testID="heat-handler-container" style={{ width: "100%" }}>
										<HeatHandler />
									</View>
								</View>
								<View testID="paddler-handler-container" style={{ width: "50%", paddingHorizontal: 2 }}>
									<PaddlerHandler />
								</View>
							</View>
						) : (
							<>
								<View
									style={{
										flexDirection: "row",
										flexWrap: "wrap"
									}}>
									{showTimer ? (
										<View
											testID="timer-container"
											style={[buttonPercentage(33.3), { paddingHorizontal: 2 }]}
										>
											<Timer />
										</View>
									) : null}
									<View testID="heat-handler-container" style={buttonPercentage(heatWidth)}>
										<HeatHandler />
									</View>
								</View>
								<View testID="paddler-handler-container" style={buttonPercentage(100)}>
									<PaddlerHandler />
								</View>
							</>
						)}
						<View testID="move-buttons-container" style={{ width: "100%" }}>
							<MoveButtons />
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

HomeScreen.navigationOptions = {
	header: null
}

export default HomeScreen
