import React from "react";
import { Col, Grid, Row } from "react-native-easy-grid";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { updatePaddlerScores } from "../../actions";
import { getScoresState } from "../../selectors";
import { styles } from "../../styles";
import { View } from "react-native" 

const makeScoresObject = (move) => {
    return ({
        id: move.toString(),
        left: {
            scored: false,
            air: false,
            huge: false,
            clean: false,
            superClean: false,
            link: false
        },
        right: {
            scored: false,
            air: false,
            huge: false,
            clean: false,
            superClean: false,
            link: false
        }
    })
}

const DynamicButtonPresentation = props => {
    const oneSidedMoves = ["Loop", "Back Loop", "Entry 1", "Entry 2", "Entry 3", "Trophy 1", "Trophy 2", "Trophy 3"]
    const _handleMove = (paddler, run, move, direction, type, key) => () => {
        var newScores = { ...props.paddlerScores };
        if (move == "Trophy 1"|| move == "Trophy 2" || move == "Trophy 3") {
            const newField = !newScores[paddler][run][move][key][direction][type];
            newScores[paddler][run][move][key][direction][type]= newField;
            if (type == "huge") {
                newScores[paddler][run][move][key][direction]["air"] = newField;
            }
            if (type == "superClean") {
                newScores[paddler][run][move][key][direction]["clean"]= newField;
            }

            if (newScores[paddler][run][move][(newScores[paddler][run][move]).length - 1]["left"]["scored"] == true) {
                (newScores[paddler][run][move]).push(makeScoresObject(move))
            }

            props.updateScore(newScores);
        } else {
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
    }

    const theMoves = Array.isArray(props.paddlerScores[props.paddler][props.run][props.move.Move]) 
        ? props.paddlerScores[props.paddler][props.run][props.move.Move]
        : [props.paddlerScores[props.paddler][props.run][props.move.Move]]
    return (
    theMoves.map((thisMove, key) => {
        if (
            thisMove[
                props.direction
            ].scored == false
        ) {
            const buttonName =
                oneSidedMoves.indexOf(props.move.Move) > -1
                    ? props.move.Move
                    : props.move.Move + " " + props.direction;
            return (
                <Button
                    onPress={_handleMove(
                        props.paddler,
                        props.run,
                        props.move.Move,
                        props.direction,
                        "scored",
                        key
                    )}
                    title={buttonName}
                    buttonStyle={styles.noMove}
                    key={key}
                />
            );

        } else {
            const buttonName = (props.move.Move == ("Loop") || props.move.Move == ("Back Loop")) ? props.move.Move : props.move.Move + " " + props.direction;
            return (
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: "wrap" }} key={key}>
                    <View style={{ width: "100%" }}>
                        <Button
                            onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, "scored", key)}
                            title={buttonName}
                            buttonStyle={styles.moveScored}
                        />
                    </View>
                
                    {(props.move.Move == "Entry 1" || props.move.Move == "Entry 2" || props.move.Move == "Entry 3")
                        ? <> (
                        <View style={{ width: "50%" }}>
                            <Button
                                onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, "clean", key)}
                                title={"Clean"}
                                disabled={props.move.Clean ? false : true}
                                buttonStyle={thisMove[props.direction]["clean"] ? styles.bonusScored : styles.noBonus}
                            />
                        </View>
                        <View style={{ width: "50%" }}>
                            <Button
                                onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, "superClean", key)}
                                title={"S Clean"}
                                disabled={props.move.SuperClean ? false : true}
                                buttonStyle={thisMove[props.direction]["superClean"] ? styles.bonusScored : styles.noBonus}
                            />
                        </View>
                        <View style={{ width: "25%" }}>
                            <Button
                                onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, "air", key)}
                                title={"Air"}
                                disabled={props.move.Air ? false : true}
                                buttonStyle={thisMove[props.direction]["air"] ? styles.bonusScored : styles.noBonus}
                            />
                        </View>
                        <View style={{ width: "40%" }}>
                            <Button
                                onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, "huge", key)}
                                title={"Huge"}
                                disabled={props.move.Huge ? false : true}
                                buttonStyle={thisMove[props.direction]["huge"] ? styles.bonusScored : styles.noBonus}
                            />
                        </View>
                        <View style={{ width: "35%" }}>
                            <Button
                                onPress={_handleMove(props.paddler, props.run, props.move.Move, props.direction, "link", key)}
                                title={"Link"}
                                disabled={props.move.Link ? false : true}
                                buttonStyle={thisMove[props.direction]["link"] ? styles.bonusScored : styles.noBonus}
                        
                            />
                        </View> )</>
                        : null}
                        
                </View>
            )
        }
    })
    )
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

export const DynamicButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(DynamicButtonPresentation);
