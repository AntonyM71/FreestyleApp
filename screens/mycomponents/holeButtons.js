import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { WebBrowser } from 'expo';

export default class HoleMoveButtons extends React.Component {
    render() {
      return (
        <View>
           <Grid>
      <Row>
    <Col>
    <Button
  onPress={this._handlePressNFL}
  title="NFL"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
</Col>
    <Col>
    <Button
  onPress={this._handlePressICF}
  title="ICF"
  color="#649524"
  accessibilityLabel="Learn more about this purple button"
/>
</Col>
         </Row>
 
</Grid>
        </View>
      );
    }

  
    _handlePressNFL = () => {
      WebBrowser.openBrowserAsync('https://www.facebook.com/nottinghamfreestyleleague');
    };
  
    _handlePressICF = () => {
      WebBrowser.openBrowserAsync('https://www.canoeicf.com/discipline/canoe-freestyle');
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
  