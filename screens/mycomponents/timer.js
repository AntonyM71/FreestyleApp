import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { styles } from "../../styles";


const timerPresentation = props => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    var timerID = setInterval(() => (time > 0 ? tick() : null), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });
  function tick() {
    setTime(time - 1);
  }

  if (props.showTimer) {
    return (
      <View>
        <Button
          onPress={() => {
            setTime(45);
          }}
          title={time.toString()}
          buttonStyle={
            time == 0
              ? styles.timerRed
              : time < 10
              ? styles.timerYellow
              : styles.timerGreen
          }
        />
      </View>
    );
  } else {
    return null;
  }
};
const mapStateToProps = state => {
  return {
    showTimer: state.paddlers.showTimer
  };
};

export default connect(
  mapStateToProps,
  null
)(timerPresentation);
