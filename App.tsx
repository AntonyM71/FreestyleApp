import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import React, { useCallback, useEffect, useState } from "react"
import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { Provider } from "react-redux"
import AppNavigator from "./src/navigation/AppNavigator"
import configureStore from "./src/store"

const store = configureStore()

// Keep the splash screen visible while we fetch resources
// eslint-disable-next-line @typescript-eslint/no-floating-promises
// SplashScreen.preventAutoHideAsync()

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false)

	useEffect(() => {
		async function prepare() {
			try {
				await Font.loadAsync({
					// This is the font that we are using for our tab bar
					// ...Icon.Ionicons.font,
					// We include SpaceMono because we use it in HomeScreen.js. Feel free
					// to remove this if you are not using it in your app
					"space-mono": require("./src/assets/fonts/SpaceMono-Regular.ttf")
				})
			} catch (e) {
				console.warn(e)
			} finally {
				// Tell the application to render
				setAppIsReady(true)
			}
		}

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		prepare()
	}, [])

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])

	if (!appIsReady) {
		return null
	}

	return (
		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		<View onLayout={onLayoutRootView}>
			<Provider store={store}>
				<View style={styles.container}>
					{Platform.OS === "ios" && <StatusBar barStyle="default" />}
					<AppNavigator />
				</View>
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
