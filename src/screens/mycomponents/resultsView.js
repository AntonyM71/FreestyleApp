// Testing json import
import React from 'react';
import {
  Dimensions, ScrollView, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import { getScoresState } from '../../selectors';
import { styles } from '../../styles';
import { DisplayScore } from './calculateScore';

export const ResultsView = (props) => {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const buttonPercentage = screenWidth > 600 ? '12.5%' : '25%';
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {props.paddlerHeatList.flat().length != 0
          ? (
            <View>
              <Text style={styles.heatStyle}>Results</Text>
              {props.paddlerHeatList.flat().map((paddler, key) => (
                <View key={key}>
                  <View>
                    <Text
                      style={{
                        ...styles.standardText,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {paddler.toString()}
                    </Text>
                  </View>
                  <>
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                      {props.paddlerScores[paddler].map((runScore, runKey) => (
                        <View style={{ width: buttonPercentage }} key={runKey}>
                          <DisplayScore
                            paddler={paddler}
                            run={runKey}
                            align="center"
                          />
                        </View>
                      ))}
                      {/* <Divider style={{ backgroundColor: 'blue' }} />; */}
                    </View>
                  </>
                </View>
              ))}
            </View>
          )
          : <View align="center"><Text style={{ ...styles.standardText, textAlign: 'center', marginTop: 10 }}>Please add a paddler.</Text></View>}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  paddlerScores: getScoresState(state),
  paddlerHeatList: state.paddlers.paddlerList,
});

export default connect(
  mapStateToProps,
  null,
)(ResultsView);