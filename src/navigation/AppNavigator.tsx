import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import TabBarIcon from "../components/TabBarIcon"
import HomeScreen from "../screens/HomeScreen"
import PaddlerManagerScreen from "../screens/PaddlerManagerScreen"
import ResultsScreen from "../screens/ResultsScreen"
import SettingsScreen from "../screens/SettingsScreen"
const Tab = createBottomTabNavigator()

const App = () => (
	<NavigationContainer>
		<Tab.Navigator>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({
						focused
					}: {
						focused: boolean
						color: string
						size: number
					}) => <TabBarIcon focused={focused} name="calculator" />
				}}
			/>

			<Tab.Screen
				name="Results"
				component={ResultsScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name="trophy" />
					)
				}}
			/>

			<Tab.Screen
				name="Paddlers"
				component={PaddlerManagerScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name="people" />
					)
				}}
			/>

			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<TabBarIcon focused={focused} name="settings" />
					)
				}}
			/>
		</Tab.Navigator>
	</NavigationContainer>
)

export default App
