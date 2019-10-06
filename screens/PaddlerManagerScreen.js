import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from "../styles";
import PaddlerManager from "./mycomponents/paddlerManagementHandler";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Paddler Management',
  };

  state = {
    paddlerList: ["paddler1", "paddler2", "c1er"],
    paddlerIndex: 0
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <PaddlerManager />
        </ScrollView>


        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>

        </View>
      </View>
    );
  }
}