import React from "react";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { updatePaddlerScores } from "../../actions";
import { getScoresState } from "../../selectors";
import { styles } from "../../styles";
import { View } from "react-native" 


const EntryDynamicButtonPresentation = props => {
const _handleMove = (paddler, run, move, direction, type) => () => {
        var newScores = { ...props.paddlerScores };

            const newField = !newScores[paddler][run][move][direction][type];
            newScores[paddler][run][move][direction][type] = newField;
            if (type == "huge") {
                newScores[paddler][run][move][direction]["air"] = newField;
            }
            if (type == "superClean") {
                newScores[paddler][run][move][direction]["clean"] = newField;
            }
            props.updateScore(newScores);
        };
    

    const thisMove = (props.paddlerScores[props.paddler][props.run][props.move.Move])
        
        if (
            thisMove[
                props.direction
            ].scored == false
        ) {
            const buttonName = props.move.Move
            return (
                <Button
                    onPress={_handleMove(
                        props.paddler,
                        props.run,
                        props.move.Move,
                        props.direction,
                        "scored",
                    )}
                    title={buttonName}
                    buttonStyle={styles.noMove}
                />
            );

        } else {
            const buttonName = props.move.Move
            return (
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: "wrap" }}>
                    <View style={{ width: "100%" }}>
                        <Button
                            onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, "scored")}
                            title={buttonName}
                            buttonStyle={styles.moveScored}
                        />
                    </View>
                </View>
            )
        }
}


// can we make this go deeper, so that we only update a single component when we add a move?
const mapStateToProps = state => {
  return {
    paddlerScores: getScoresState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateScore: newScores => {
      dispatch(updatePaddlerScores(newScores));
    }
  };
};

export const EntryDynamicButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDynamicButtonPresentation);
