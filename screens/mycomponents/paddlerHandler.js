import React from "react";
import { Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { changeHeat, changeNumberOfRuns, changePaddler, changeRun, updatePaddlerScores } from "../../actions";
import { getScoresState } from "../../selectors";
import { styles } from "../../styles";
import { DisplayScore } from "./calculateScore";
import { initialScoresheet } from "./makePaddlerScores";

export const PaddlerHandler = props => {
  const numberOfPaddlers = props.paddlerList[props.currentHeat].length;

  const _handlePressNext = () => {
    // -1 to account for zero indexing
    const newPaddlerIndex =
      props.paddlerIndex < numberOfPaddlers - 1 ? props.paddlerIndex + 1 : 0;
    props.updatePaddler(newPaddlerIndex);
  };

  const _handlePressPrevious = () => {
    // -1 to account for zero indexing
    const newPaddlerIndex =
      props.paddlerIndex == 0 ? numberOfPaddlers - 1 : props.paddlerIndex - 1;
    props.updatePaddler(newPaddlerIndex);
  };

  const _handlePressNextRun = () => {
    // -1 to account for zero indexing
    const newRunIndex = props.run + 1;
    handleChangeRun(newRunIndex);
  };

  const _handlePressPreviousRun = () => {
    const newRunIndex = props.run == 0 ? 0 : props.run - 1;
    handleChangeRun(newRunIndex);
  };

  const handleChangeRun = newRunIndex => {
    if (newRunIndex < props.numberOfRuns) {
      props.updateRun(newRunIndex);
    } else {
      const scores = props.paddlerScores;
      props.paddlerList.flat().map(paddler => {
        scores[paddler.toString()].push(initialScoresheet());
      });
      props.updateNumberOfRuns(newRunIndex);
      props.updateScore({ ...scores });
      props.updateRun(newRunIndex);
    }
  };

  if (props.paddlerList[props.currentHeat].length != 0) {
    return (
      <View>
        <Grid>
          <Row>
            <Col>
              <Button
                onPress={_handlePressPrevious}
                title="Last Paddler"
                buttonStyle={styles.changeButton}
              />
            </Col>
            <Col>
              <View>
                <Text
                  style={{
                    ...styles.standardText,
                    marginTop: 4,
                    textAlign: "center"
                  }}
                >
                  {props.paddlerList[props.currentHeat][props.paddlerIndex]}
                </Text>
                <DisplayScore
                  paddler={
                    props.paddlerList[props.currentHeat][props.paddlerIndex]
                  }
                  run={props.run}
                />
              </View>
            </Col>
            <Col>
              <Button
                onPress={_handlePressNext}
                title="Next"
                buttonStyle={styles.changeButton}
              />
            </Col>
          </Row>
          {props.showRunHandler
            ? (
              <Row>
                <Col>
                  <Button
                    onPress={_handlePressPreviousRun}
                    title="Prev Run"
                    buttonStyle={styles.changeButton}
                  />
                </Col>
                <Col>
                  <View>
                    <Text
                      style={{
                        ...styles.standardText,
                        marginTop: 15,
                        textAlign: "center"
                      }}
                    >
                      {props.run + 1}
                    </Text>
                  </View>
                </Col>
                <Col>
                  <Button
                    onPress={_handlePressNextRun}
                    title="New Run"
                    buttonStyle={styles.changeButton}
                  />
                </Col>
              </Row>
            )
            : null}
        </Grid>
      </View>
    );
  } else {
    return (<View align="center"><Text style={{ ...styles.standardText, textAlign: "center", marginTop: 10 }}>{"This heat has no paddlers."}</Text></View>)
  }
};

const mapStateToProps = state => {
  return {
    paddlerIndex: state.paddlers.paddlerIndex,
    paddlerList: state.paddlers.paddlerList,
    currentHeat: state.paddlers.currentHeat,
    run: state.paddlers.run,
    numberOfRuns: state.paddlers.numberOfRuns,
    paddlerScores: getScoresState(state),
    showRunHandler: state.paddlers.showRunHandler
  };
};

// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
  return {
    updatePaddler: index => {
      dispatch(changePaddler(index));
    },
    updateHeat: index => {
      dispatch(changeHeat(index));
    },
    updateRun: run => {
      dispatch(changeRun(run));
    },
    updateNumberOfRuns: numberOfRuns => {
      dispatch(changeNumberOfRuns(numberOfRuns));
    },
    updateScore: newScores => {
      dispatch(updatePaddlerScores(newScores));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaddlerHandler);
