import React from "react"
import { render, screen } from "@testing-library/react-native"
import AppNavigator from "../AppNavigator"

// Mock navigation hooks and components
jest.mock("@react-navigation/native", () => ({
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
  useNavigation: () => ({
    navigate: jest.fn()
  })
}))

jest.mock("@react-navigation/bottom-tabs", () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ name, options }: { name: string; options: any }) => (
      <mock-screen testID={`screen-${name.toLowerCase()}`}>
        {options.tabBarIcon({ focused: true })}
      </mock-screen>
    )
  })
}))

// Mock screens
jest.mock("../../screens/HomeScreen", () => "mock-home-screen")
jest.mock("../../screens/ResultsScreen", () => "mock-results-screen")
jest.mock("../../screens/PaddlerManagerScreen", () => "mock-paddler-manager-screen")
jest.mock("../../screens/SettingsScreen", () => "mock-settings-screen")

// Mock TabBarIcon
jest.mock("../../components/TabBarIcon", () =>
  (props: { focused: boolean; name: string }) => (
      <mock-tab-icon
        testID={`tab-icon-${props.name}`}
        focused={props.focused}
        name={props.name}
      />
    )
)

describe("AppNavigator", () => {
  it("renders all screens", () => {
    render(<AppNavigator />)

    expect(screen.getByTestId("screen-home")).toBeTruthy()
    expect(screen.getByTestId("screen-results")).toBeTruthy()
    expect(screen.getByTestId("screen-paddlers")).toBeTruthy()
    expect(screen.getByTestId("screen-settings")).toBeTruthy()
  })

  it("configures correct tab icons", () => {
    render(<AppNavigator />)

    expect(screen.getByTestId("tab-icon-calculator")).toBeTruthy()
    expect(screen.getByTestId("tab-icon-trophy")).toBeTruthy()
    expect(screen.getByTestId("tab-icon-people")).toBeTruthy()
    expect(screen.getByTestId("tab-icon-settings")).toBeTruthy()
  })

  it("passes focused prop to tab icons", () => {
    render(<AppNavigator />)

    const calculatorIcon = screen.getByTestId("tab-icon-calculator")
    const trophyIcon = screen.getByTestId("tab-icon-trophy")
    const peopleIcon = screen.getByTestId("tab-icon-people")
    const settingsIcon = screen.getByTestId("tab-icon-settings")

    expect(calculatorIcon).toHaveProp("focused", true)
    expect(trophyIcon).toHaveProp("focused", true)
    expect(peopleIcon).toHaveProp("focused", true)
    expect(settingsIcon).toHaveProp("focused", true)
  })

  it("configures correct screen components", () => {
    render(<AppNavigator />)

    const homeScreen = screen.getByTestId("screen-home")
    const resultsScreen = screen.getByTestId("screen-results")
    const paddlersScreen = screen.getByTestId("screen-paddlers")
    const settingsScreen = screen.getByTestId("screen-settings")

    expect(homeScreen).toBeTruthy()
    expect(resultsScreen).toBeTruthy()
    expect(paddlersScreen).toBeTruthy()
    expect(settingsScreen).toBeTruthy()
  })
})
