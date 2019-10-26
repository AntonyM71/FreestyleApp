import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { styles } from "../styles";
import HeatHandler from "./mycomponents/heatHandler";
import MoveButtons from "./mycomponents/JsonButtons";
import PaddlerHandler from "./mycomponents/paddlerHandler";
import Timer from "./mycomponents/timer";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Scoring"
  };

  state = {
    paddlerList: ["paddler1", "paddler2", "c1er"],
    paddlerIndex: 0
  };
  render() {
    buttonPercentage = start =>
      Math.round(Dimensions.get("window").width) > 600
        ? `${start * 0.5}%`
        : `${start}%`;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={{ flex: 1, flexDirection: "row", flexWrap: true }}>
            <View style={{ width: buttonPercentage(30) }}>
              <Timer />
            </View>
            <View style={{ width: buttonPercentage(70) }}>
              <HeatHandler state={this.state} />
            </View>
            <View style={{ width: buttonPercentage(100) }}>
              <PaddlerHandler state={this.state} />
            </View>
            <View>
              <MoveButtons />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
