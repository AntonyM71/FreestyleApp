import React from "react";
import { ScrollView, View } from "react-native";
import { styles } from "../styles";
import PaddlerManager from "./mycomponents/paddlerManagementHandler";
import RunOptions from "./mycomponents/runOptions";
import TimerOptions from "./mycomponents/timerOptions";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Paddler Management"
  };

  state = {
    paddlerList: ["paddler1", "paddler2", "c1er"],
    paddlerIndex: 0
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: "wrap" }}>
            <View style={{ width: "50%" }}>
              <TimerOptions />
            </View>
            <View style={{ width: "50%" }}>
              <RunOptions />
            </View>
          </View>
          <PaddlerManager />
        </ScrollView>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}
        ></View>
      </View>
    );
  }
}
