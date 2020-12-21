import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { batch, connect } from "react-redux";
import { changeRun, updateShowRun } from "../../actions";
import { styles } from "../../styles";

const runOptionsPresentation = props => {

    const _handleRunButtonPress = () => {
        batch(() => {
            props.showRunHandler == true ? props.updateRun(0) : null;
            props.updateShowRun(!props.showRunHandler);
        });
    };
    return (
        <View>
            <Button
                buttonStyle={props.showRunHandler ? styles.moveScored : styles.noMove}
                onPress={_handleRunButtonPress}
                title={
                    props.showRunHandler
                        ? "Hide Runs"
                        : "Show Runs"
                }
            />
        </View>
    );
};
const mapStateToProps = state => {
    return {
        showRunHandler: state.paddlers.showRunHandler
    };
};
// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
    return {
        updateShowRun: showRun => {
            dispatch(updateShowRun(showRun));
        },
        updateRun: run => {
            dispatch(changeRun(run));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(runOptionsPresentation);
