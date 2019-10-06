import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from "../styles";
import ExpoLinksScreen from './mycomponents/ExpoLinksView';
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksScreen />
      </ScrollView>
    );
  }
}
