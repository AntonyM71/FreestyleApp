import { View } from "react-native"
import { updateShowTimer } from "../../actions"
import { Button } from "react-native-elements"
import { connect } from 'react-redux';
import React from 'react';
import { styles } from "../../styles"

const timerOptionsPresentation = (props) => {
    
    _handleTimerButtonPress = () => {
        console.log(props.showTimer)
        props.updateShowTimer(!props.showTimer)
    }
        return (
            <View>
                <Button
                    buttonStyle={props.showTimer ? styles.moveScored : styles.noMove}
                    onPress={_handleTimerButtonPress}
                    title={(props.showTimer ? "Hide Scoring Page Timer" : "Show Scoring Page Timer")} />
            </View>
        )
}
const mapStateToProps = state => {
    return {
        showTimer: state.paddlers.showTimer
    }
}
  // not used currently, need to add an addmove function and redux pathway
  const mapDispatchToProps = dispatch => {
    return {
        updateShowTimer: (showTimer) => {
        dispatch(updateShowTimer(showTimer))
      }
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(timerOptionsPresentation)