import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "react-native-elements";
import { batch, connect } from "react-redux";
import { addOrRemovePaddlerName, changePaddler, updatePaddlerScores } from "../../actions";
import { getScoresState } from "../../selectors";
import { styles } from "../../styles";
import { initialScoresheet } from "./makePaddlerScores";

export const PaddlerHeatManagerPresentation = props => {
  const [newPaddler, setNewPaddler] = useState("");
  const [inputBorder, setInputBorder] = useState("black");

  const _handleDeletePaddler = (
    heatKey,
    paddlerList,
    paddler,
    paddlerScores
  ) => () => {
    addOrRemovePaddler(
      heatKey,
      paddlerList.filter(e => e !== paddler),
      paddlerScores
    );
  };

  const _handleAddChange = newPaddler => {
    setNewPaddler(newPaddler);
    if (props.paddlerHeatList.flat().indexOf(newPaddler) > -1) {
      setInputBorder("red");
    } else {
      setInputBorder("black");
    }
  };
  const _handleAddPaddler = (
    heatKey,
    paddlerList,
    newPaddler,
    paddlerScores
  ) => () => {
    if (newPaddler.length == 0) {
      alert("People like having names :)");
    } else {
      if (props.paddlerHeatList.flat().indexOf(newPaddler) > -1) {
        alert("You've already added this paddler");
      } else {
        batch(() => {
          setNewPaddler("");
          addOrRemovePaddler(
            heatKey,
            [...paddlerList, newPaddler],
            paddlerScores
          );
        });
      }
    }
  };
  const addOrRemovePaddler = (heatKey, remainingPaddlers, paddlerScores) => {
    const newList =
      remainingPaddlers.length == 0 ? [`default ${heatKey+1}`]: remainingPaddlers;
    var newPaddlerScores = paddlerScores;
    newList.flat().map(paddler => {
      if (!newPaddlerScores[paddler]) newPaddlerScores[paddler.toString()] = [];
      if (props.numberOfRuns + 1 != (newPaddlerScores[paddler.toString()]).length) {
        for (i = 0; i < props.numberOfRuns + 1; i++) {
          newPaddlerScores[paddler.toString()].push(initialScoresheet());
        }
      }
    });

    const newHeatList = props.paddlerHeatList;
    newHeatList[heatKey] = newList;
    batch(() => {
      props.updatePaddler(0);
      props.addOrRemovePaddlerName([...newHeatList]);
      props.updatePaddlerScores(newPaddlerScores);
    });
  };

  return (
    <View>
      <View>
        <Text style={styles.heatStyle}>{`Heat ${props.heatKey + 1}`}</Text>

        {props.paddlerList.map((paddler, key) => (
          <View
            style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}
            key={key}
          >
            <View style={{ width: "70%" }}>
              <Text
                style={{
                  ...styles.standardText,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {paddler}
              </Text>
            </View>

            <View style={{ width: "30%" }}>
              <Button
                onPress={_handleDeletePaddler(
                  props.heatKey,
                  props.paddlerList,
                  paddler,
                  props.paddlerScores
                )}
                title="Delete"
                buttonStyle={styles.deleteButton}
              />
            </View>
          </View>
        ))}
      </View>
      <View>
        <TextInput
          blurOnSubmit={true}
          autoCorrect={false}
          style={{ height: 40 }}
          placeholder="New Paddler Name"
          value={newPaddler}
          onChangeText={text => _handleAddChange(text)}
          onSubmitEditing={_handleAddPaddler(
            props.heatKey,
            props.paddlerList,
            newPaddler,
            props.paddlerScores
          )}
          clearButtonMode="always"
          style={[
            {
              borderColor: inputBorder,
              borderWidth: 3,
              padding: 10,
              borderRadius: 3,
              marginHorizontal: 5,
              marginLeft: 4,
              marginRight: 4,
              marginTop: 8
            }
          ]}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    // paddlerIndex: state.paddlers.paddlerIndex,
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaddlerHeatManagerPresentation);
