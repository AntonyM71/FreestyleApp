import * as WebBrowser from "expo-web-browser";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";

export default class PaddlerButtons extends React.Component {
  _handlePressNFL = () => {
    WebBrowser.openBrowserAsync(
      "https://www.facebook.com/nottinghamfreestyleleague"
    );
  };

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
                onPress={this._handlePressCount}
                title="Count"
                color="#649524"
                accessibilityLabel="Learn more about the Count"
              />
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15
    },
    optionsTitleText: {
      fontSize: 16,
      marginLeft: 15,
      marginTop: 9,
      marginBottom: 12
    },
    optionIconContainer: {
      marginRight: 9
    },
    option: {
      backgroundColor: "#fdfdfd",
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: "#EDEDED"
    },
    optionText: {
      fontSize: 15,
      marginTop: 1
    }
  });
}
