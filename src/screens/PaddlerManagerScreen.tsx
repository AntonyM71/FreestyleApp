import React from "react";
import { ScrollView, View, SafeAreaView } from "react-native";
import { styles } from "../styles";
import PaddlerManager from "./mycomponents/paddlerManagementHandler";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
      header: null
  }

  state = {
      paddlerList: ["paddler1", "paddler2", "c1er"],
      paddlerIndex: 0
  };
  render() {
      return (
          <SafeAreaView style={styles.container}>
              <View style={styles.container}>
                  <ScrollView
                      style={styles.container}
                      contentContainerStyle={styles.contentContainer}
                  >
                      <PaddlerManager />
                  </ScrollView>

              </View>
          </SafeAreaView>
      );
  }
}
