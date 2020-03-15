import React from "react";
import { Dimensions, ScrollView, View, SafeAreaView } from "react-native";
import { styles } from "../styles";
import HeatHandler from "./mycomponents/heatHandler";
import MoveButtons from "./mycomponents/JsonButtons";
import PaddlerHandler from "./mycomponents/paddlerHandler";
import Timer from "./mycomponents/timer";
export default class HomeScreen extends React.Component {
  static navigationOptions= {
      header: null
    }

  state = {
    paddlerList: ["paddler1", "paddler2"],
    paddlerIndex: 0
  };
  render() {
    buttonPercentage = start =>
      Math.round(Dimensions.get("window").width) > 600
        ? `${start * 0.5}%`
        : `${start}%`;
    return (
      
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            <View style={{ width: buttonPercentage(33.3) }}>
              <Timer />
            </View>
            <View style={{ width: buttonPercentage(66.6) }}>
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
      </SafeAreaView>
     
    );
  }
}
