import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { enabledMoves, updatePaddlerScores, changeRun } from '../../actions';
import { styles } from '../../styles';
import { initialScoresheet } from './makePaddlerScores';

const moveSelectionPresentation = (props) => {
  _handleMoveButtonPress = (moveKey) => () => {
    const newMoves = { ...props.enabledMovesList };
    newMoves[moveKey] = !(newMoves[moveKey]);
    props.enabledMoves(newMoves);
    clearScores(newMoves);
  };

  const clearScores = (newMoves) => {
    const startingScoresheet = {};
    props.paddlerHeatList.flat().map((paddler) => {
      startingScoresheet[paddler.toString()] = [initialScoresheet(newMoves)];
    });
    props.updateRun(0);
    props.updatePaddlerScores(startingScoresheet);
  };

  return (
    <View>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>

        {Object.keys(props.enabledMovesList).map((moveKey, key) => (
          <View style={{ width: '50%' }} key={key}>
            <Button
              buttonStyle={props.enabledMovesList[moveKey] ? styles.moveScored : styles.noMove}
              onPress={_handleMoveButtonPress(moveKey)}
              title={
            props.enabledMovesList[moveKey]
              ? `Hide ${moveKey}`
              : `Show ${moveKey}`
          }
            />
          </View>
        ))}
      </View>
    </View>
  );
};
const mapStateToProps = (state) => ({
  enabledMovesList: state.paddlers.enabledMoves,
  paddlerHeatList: state.paddlers.paddlerList,
});
// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = (dispatch) => ({
  enabledMoves: (key) => {
    dispatch(enabledMoves(key));
  },
  updatePaddlerScores: (scores) => {
    dispatch(updatePaddlerScores(scores));
  },
  updateRun: (run) => {
    dispatch(changeRun(run));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(moveSelectionPresentation);
