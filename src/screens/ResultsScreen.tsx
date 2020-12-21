import React from "react";
import { ScrollView } from "react-native";
import { styles } from "../styles";
import ResultsView from "./mycomponents/resultsView";
export default class ResultsScreen extends React.Component {
  static navigationOptions = {
      title: "Results"
  };

  render() {
      return (
          <ScrollView style={styles.container}>
              <ResultsView />
          </ScrollView>
      );
  }
}
