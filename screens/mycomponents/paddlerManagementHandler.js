import React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "react-native-elements";
import { batch, connect } from "react-redux";
import { addOrRemovePaddlerName, changeHeat, changePaddler, changeRun, updatePaddlerScores } from "../../actions";
import { getScoresState } from "../../selectors";
import { styles } from "../../styles";
import { initialScoresheet } from "./makePaddlerScores";
import PaddlerHeatManager from "./paddlerHeatManagementHandler";

// pull out heat logic into another file
// consider moving the button into another file
// general filesystem tyidy up
export const PaddlerManager = props => {
  const addHeat = heatKey => {
    const newHeatList = props.paddlerHeatList;
    newHeatList.push([`default ${heatKey}`]);
    var newPaddlerScores = props.paddlerScores;
    newHeatList.flat().map(paddler => {
      if (!newPaddlerScores[paddler]) newPaddlerScores[paddler.toString()] = [initialScoresheet()];
      console.log((newPaddlerScores[paddler]).length)
      console.log("number of runs = " +props.numberOfRuns)
      if (props.numberOfRuns +1 != (newPaddlerScores[paddler.toString()]).length  ) {
      for (i = 0; i < (props.numberOfRuns ) ; i++) {
        newPaddlerScores[paddler.toString()].push(initialScoresheet());
      }
    }
    });
    batch(() => {
      props.updatePaddler(0);
      props.addOrRemovePaddlerName([...newHeatList]);
      props.updatePaddlerScores(newPaddlerScores);
    });
  };
  const clearPaddlers = () => {
    const newHeatList = [["default"]];
    const startingScoresheet = {};
    newHeatList.flat().map(paddler => {
      startingScoresheet[paddler.toString()] = [initialScoresheet()];
    });
    batch(() => {
      props.updatePaddler(0);
      props.updateHeat(0);
      props.updateRun(0);
      props.addOrRemovePaddlerName(newHeatList);
      props.updatePaddlerScores(startingScoresheet);
    });
  };
  const clearScores = () => {
    const startingScoresheet = {};
    props.paddlerHeatList.flat().map(paddler => {
      startingScoresheet[paddler.toString()] = [initialScoresheet()];
    });
    batch(() => {
      props.updateRun(0);
      props.updatePaddlerScores(startingScoresheet);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {props.paddlerHeatList.map((paddlerList, heatKey) => (
          <PaddlerHeatManager paddlerList={paddlerList} heatKey={heatKey} />
        ))}

        <View style={{ flex: 1, flexDirection: "row", flexWrap: true }}>
          <View style={{ width: "100%" }}>
            <Button
              onPress={() => {
                addHeat(props.paddlerHeatList.length + 1);
              }}
              title="New Heat"
              buttonStyle={styles.timerGreen}
            />
          </View>
          <View style={{ width: "50%" }}>
            <Button
              onPress={() => {
                clearScores();
              }}
              title="Clear Scores"
              buttonStyle={styles.timerRed}
            />
          </View>

          <View style={{ width: "50%" }}>
            <Button
              onPress={clearPaddlers}
              title="Clear Paddlers"
              buttonStyle={styles.timerRed}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    paddlerHeatList: state.paddlers.paddlerList,
    paddlerScores: getScoresState(state),
    numberOfRuns: state.paddlers.numberOfRuns
  };
};

// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
  return {
    addOrRemovePaddlerName: paddlers => {
      dispatch(addOrRemovePaddlerName(paddlers));
    },
    updatePaddlerScores: scores => {
      dispatch(updatePaddlerScores(scores));
    },
    updatePaddler: index => {
      dispatch(changePaddler(index));
    },
    updateRun: run => {
      dispatch(changeRun(run));
    },
    updateHeat: index => {
      dispatch(changeHeat(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaddlerManager);
