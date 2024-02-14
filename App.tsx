/* eslint-disable @typescript-eslint/no-misused-promises */
import "expo-dev-client"
import * as SplashScreen from "expo-splash-screen"
import React, { useCallback } from "react"
import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { Provider } from "react-redux"

import { useFonts } from "expo-font"
import AppNavigator from "./src/navigation/AppNavigator"
import configureStore from "./src/store"

// eslint-disable-next-line @typescript-eslint/no-floating-promises
SplashScreen.preventAutoHideAsync()

const store = configureStore()
export default function App() {
	const [fontsLoaded, fontError] = useFonts({
		"SpaceMono-Regular": require("./assets/fonts/SpaceMono-Regular.ttf")
	})

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync()
		}
	}, [fontsLoaded, fontError])

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<View style={styles.container} onLayout={onLayoutRootView}>
			<Provider store={store}>
				{Platform.OS === "ios" && <StatusBar barStyle="default" />}
				<AppNavigator />
			</Provider>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff"
	}
})
