import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { enabledMoves, updatePaddlerScores, changeRun } from "../../actions";
import { styles } from "../../styles";
import { initialScoresheet } from "./makePaddlerScores";

const moveSelectionPresentation = props => {

  const handleMoveButtonPress = (moveKey) => () => {
    const newMoves = { ...props.enabledMovesList }
    newMoves[moveKey] = !(newMoves[moveKey])
    props.enabledMoves(newMoves);
    clearScores()
  };


  const clearScores = () => {
    const startingScoresheet = {};
    props.paddlerHeatList.flat().map(paddler => {
      startingScoresheet[paddler.toString()] = [initialScoresheet()];
    });
    props.updateRun(0);
    props.updatePaddlerScores(startingScoresheet);
  };

  return (
    <View>
      <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>

        {Object.keys(props.enabledMovesList).map((moveKey, key) => {
          return (
            <View style={{ width: "50%" }} key={key}>
              <Button
                buttonStyle={props.enabledMovesList[moveKey] ? styles.moveScored : styles.noMove}
                onPress={handleMoveButtonPress(moveKey)}
                title={
                  props.enabledMovesList[moveKey]
                    ? `Hide ${moveKey}`
                    : `Show ${moveKey}`
                }

              />
            </View>
          )
        })}
      </View>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    enabledMovesList: state.paddlers.enabledMoves,
    paddlerHeatList: state.paddlers.paddlerList
  };
};
// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
  return {
    enabledMoves: key => {
      dispatch(enabledMoves(key));
    },
    updatePaddlerScores: scores => {
      dispatch(updatePaddlerScores(scores));
    },
    updateRun: run => {
      dispatch(changeRun(run));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(moveSelectionPresentation);
