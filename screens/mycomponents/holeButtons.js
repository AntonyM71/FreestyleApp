import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Col, Grid, Row } from "react-native-easy-grid";


var score = 0 


export default class HoleMoveButtons extends React.Component {
  state = {
    score: 0
  }
    render() {
      return (
        <View>
           <Grid>
      <Row>
    <Col>
    <Button
  onPress={this._handlePressNFL}
  title="NFL"
  color="#841583"
  accessibilityLabel="Learn more about this purple button"
/>
</Col>
    <Col>
    <Button
  onPress={this._handlePressICF}
  title="ICF"
  color="#649524"
  accessibilityLabel="Learn more about the ICF"
/>
</Col>
         </Row>
 
</Grid>
<View><Text>{this.state.score}</Text></View>

        </View>
      );
    }

  
    _handlePressNFL = () => {
      WebBrowser.openBrowserAsync('https://www.facebook.com/nottinghamfreestyleleague');
    };
  
    _handlePressICF = () => {
      this.setState({
        score: this.state.score+1
      })
      console.log(this.state.score)
      };



  styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
    },
    optionsTitleText: {
      fontSize: 16,
      marginLeft: 15,
      marginTop: 9,
      marginBottom: 12,
    },
    optionIconContainer: {
      marginRight: 9,
    },
    option: {
      backgroundColor: '#fdfdfd',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#EDEDED',
    },
    optionText: {
      fontSize: 15,
      marginTop: 1,
    },
  });
}