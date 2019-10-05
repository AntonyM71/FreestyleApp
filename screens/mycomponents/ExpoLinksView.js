import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default class ExpoLinksScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.optionsTitleText}>
          Resources
        </Text>

        <Touchable
          style={styles.option}
          background={Touchable.Ripple('#ccc', false)}
          onPress={this._handlePressICF}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('../../data/assets/images/icf.png')}
                resizeMode="contain"
                fadeDuration={0}
                style={{ width: 60, height: 60, marginTop: 1 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Go to the ICF Page
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          background={Touchable.Ripple('#ccc', false)}
          style={styles.option}
          onPress={this._handlePressNFL}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('../../data/assets/images/nfl.png')}
                fadeDuration={0}
                style={{ width: 60, height: 60 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Go to the NFL Page
              </Text>
            </View>
          </View>
        </Touchable>

        <Touchable
          background={Touchable.Ripple('#ccc', false)}
          style={styles.option}
          onPress={this._handlePressGBFreestyle}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Image
                source={require('../../data/assets/images/gb-freestyle.png')}
                fadeDuration={0}
                style={{ width: 60, height: 60 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                Go to the GB Freestyle Page
              </Text>
            </View>
          </View>
        </Touchable>

      </View>
    );
  }

  _handlePressNFL = () => {
    WebBrowser.openBrowserAsync('https://www.facebook.com/nottinghamfreestyleleague');
  };

  _handlePressICF = () => {
    WebBrowser.openBrowserAsync('https://www.canoeicf.com/discipline/canoe-freestyle');
  };

  _handlePressGBFreestyle = () => {
    WebBrowser.openBrowserAsync('https://www.gbfreestylekayaking.co.uk');
  };

}

const styles = StyleSheet.create({
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
