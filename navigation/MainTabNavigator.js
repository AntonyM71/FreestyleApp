import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import PaddlerManagerScreen from "../screens/PaddlerManagerScreen";
import SettingsScreen from "../screens/SettingsScreen";
const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Scoring',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-calculator`
          : 'md-calculator'
      }
    />
  ),
};

const ResultsStack = createStackNavigator({
  Links: ResultsScreen,
});

ResultsStack.navigationOptions = {
  tabBarLabel: 'Results',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-trophy' : 'md-trophy'}
    />
  ),
};
const PaddlerStack = createStackNavigator({
  Paddlers: PaddlerManagerScreen,
});

PaddlerStack.navigationOptions = {
  tabBarLabel: 'Paddlers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});


SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  ResultsStack,
  PaddlerStack,
  SettingsStack,
});
