import React from 'react';
import { ScrollView } from 'react-native';
import { styles } from "../styles";
import ResultsView from './mycomponents/resultsView';
export default class ResultsScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ResultsView />
      </ScrollView>
    );
  }
}
