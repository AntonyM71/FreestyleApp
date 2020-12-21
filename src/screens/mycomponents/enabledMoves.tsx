import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { enabledMoves, updatePaddlerScores, changeRun } from "../../actions";
import { styles } from "../../styles";
import { initialScoresheet } from "./makePaddlerScores";

const moveSelectionPresentation = (props:
    {
        enabledMovesList: { [x: string]: any; };
        enabledMoves: (arg0: any) => void;
        paddlerHeatList: { flat: () => any[]; };
        updateRun: (arg0: number) => void;
        updatePaddlerScores: () => void;
    }) => {

    const handleMoveButtonPress = (moveKey: string) => () => {
        const newMoves = { ...props.enabledMovesList };
        newMoves[moveKey] = !(newMoves[moveKey]);
        props.enabledMoves(newMoves);
        clearScores();
    };


    const clearScores = () => {
        const startingScoresheet = {};
        props.paddlerHeatList.flat().map((paddler: { toString: () => React.ReactText; }) => {
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
                    );
                })}
            </View>
        </View>
    );
};
const mapStateToProps = (state: { paddlers: { enabledMoves: any; paddlerList: any; }; }) => {
    return {
        enabledMovesList: state.paddlers.enabledMoves,
        paddlerHeatList: state.paddlers.paddlerList
    };
};
// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    return {
        enabledMoves: (key: any) => {
            dispatch(enabledMoves(key));
        },
        updatePaddlerScores: (scores: any) => {
            dispatch(updatePaddlerScores(scores));
        },
        updateRun: (run: any) => {
            dispatch(changeRun(run));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(moveSelectionPresentation);
