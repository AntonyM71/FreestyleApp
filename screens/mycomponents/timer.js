import { View, Text} from "react-native"
import { connect } from 'react-redux';
import React from 'react';

const timerPresentation = (props) => {
    if (props.showTimer) {
        return (
            <View>
                <Text>{"we can put a timer here"}</Text>
            </View>
        )
    } else {
        return null
    }
}
const mapStateToProps = state => {
    return {
        showTimer: state.paddlers.showTimer
    }
}
  
  export default connect(mapStateToProps, null)(timerPresentation)