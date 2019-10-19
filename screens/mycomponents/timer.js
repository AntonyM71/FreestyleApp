import { View, Text} from "react-native"
import { connect } from 'react-redux';
import React from 'react';
import {Button } from "react-native-elements"
import { styles } from "../../styles";

const timerPresentation = (props) => {

  const [counter, setCounter] = React.useState(0);

 

    if (props.showTimer) {
        return (
            <View>
                <Button
                    onPress={() => {setCounter(45)}}
                    title={counter.toString()}
                    buttonStyle={ counter == 0 ? styles.timerRed : ((counter < 10) ? styles.timerYellow : styles.timerGreen)}
                />
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