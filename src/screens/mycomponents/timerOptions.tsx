import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { updateShowTimer } from "../../actions";
import { styles } from "../../styles";

const timerOptionsPresentation = props => {
    const handleTimerButtonPress = () => {
        props.updateShowTimer(!props.showTimer);
    };
    return (
        <View>
            <Button
                buttonStyle={props.showTimer ? styles.moveScored : styles.noMove}
                onPress={handleTimerButtonPress}
                title={
                    props.showTimer
                        ? "Hide Timer"
                        : "Show Timer"
                }
            />
        </View>
    );
};
const mapStateToProps = state => {
    return {
        showTimer: state.paddlers.showTimer
    };
};
// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
    return {
        updateShowTimer: showTimer => {
            dispatch(updateShowTimer(showTimer));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(timerOptionsPresentation);
