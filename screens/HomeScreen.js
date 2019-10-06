import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from "../styles";
import MoveButtons from './mycomponents/JsonButtons';
import PaddlerHandler from "./mycomponents/paddlerHandler";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Scoring',
  };

  state = {
    paddlerList: ["paddler1", "paddler2", "c1er"],
    paddlerIndex: 0
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View>
      {/* <PaddlerButtons /> */}
          </View>
          <View>
            <PaddlerHandler state={this.state}/>
          </View>
      <View>
        <MoveButtons />
      </View>
        </ScrollView>


          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>

        </View>
      </View>
    );
  }
  _handlePressNFL = () => {
    WebBrowser.openBrowserAsync('https://www.facebook.com/nottinghamfreestyleleague');
  };

  _handlePressICF = () => {
    WebBrowser.openBrowserAsync('https://www.canoeicf.com/discipline/canoe-freestyle');
  };
}
