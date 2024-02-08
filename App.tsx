/* eslint-disable @typescript-eslint/no-misused-promises */
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
				// Pre-load fonts, make any API calls you need to do here
				await Font.loadAsync({
					"space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
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
