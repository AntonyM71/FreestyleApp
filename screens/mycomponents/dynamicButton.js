import React from "react";
import { Col, Grid, Row } from "react-native-easy-grid";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { updatePaddlerScores } from "../../actions";
import { getScoresState } from "../../selectors";
import { styles } from "../../styles";
const DynamicButtonPresentation = props => {
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

  if (
    props.paddlerScores[props.paddler][props.run][props.move.Move][
      props.direction
    ].scored == false
  ) {
    const buttonName =
      props.move.Move == "Loop" || props.move.Move == "Back Loop"
        ? props.move.Move
        : props.move.Move + " " + props.direction;
    return (
      <Button
        onPress={_handleMove(
          props.paddler,
          props.run,
          props.move.Move,
          props.direction,
          "scored"
        )}
        title={buttonName}
        buttonStyle={styles.noMove}
      />
    );
  } else {
    const buttonName =
      props.move.Move == "Loop" || props.move.Move == "Back Loop"
        ? props.move.Move
        : props.move.Move + " " + props.direction;
    return (
      <Grid>
        <Row>
          <Col>
            <Button
              onPress={_handleMove(
                props.paddler,
                props.run,
                props.move.Move,
                props.direction,
                "scored"
              )}
              title={buttonName}
              buttonStyle={styles.moveScored}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onPress={_handleMove(
                props.paddler,
                props.run,
                props.move.Move,
                props.direction,
                "clean"
              )}
              title={"Clean"}
              disabled={props.move.Clean ? false : true}
              buttonStyle={
                props.paddlerScores[props.paddler][props.run][props.move.Move][
                  props.direction
                ]["clean"]
                  ? styles.bonusScored
                  : styles.noBonus
              }
            />
          </Col>
          <Col>
            <Button
              onPress={_handleMove(
                props.paddler,
                props.run,
                props.move.Move,
                props.direction,
                "superClean"
              )}
              title={"S Clean"}
              disabled={props.move.SuperClean ? false : true}
              buttonStyle={
                props.paddlerScores[props.paddler][props.run][props.move.Move][
                  props.direction
                ]["superClean"]
                  ? styles.bonusScored
                  : styles.noBonus
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onPress={_handleMove(
                props.paddler,
                props.run,
                props.move.Move,
                props.direction,
                "air"
              )}
              title={"Air"}
              disabled={props.move.Air ? false : true}
              buttonStyle={
                props.paddlerScores[props.paddler][props.run][props.move.Move][
                  props.direction
                ]["air"]
                  ? styles.bonusScored
                  : styles.noBonus
              }
            />
          </Col>
          <Col>
            <Button
              onPress={_handleMove(
                props.paddler,
                props.run,
                props.move.Move,
                props.direction,
                "huge"
              )}
              title={"Huge"}
              disabled={props.move.Huge ? false : true}
              buttonStyle={
                props.paddlerScores[props.paddler][props.run][props.move.Move][
                  props.direction
                ]["huge"]
                  ? styles.bonusScored
                  : styles.noBonus
              }
            />
          </Col>
          <Col>
            <Button
              onPress={_handleMove(
                props.paddler,
                props.run,
                props.move.Move,
                props.direction,
                "link"
              )}
              title={"Link"}
              disabled={props.move.Link ? false : true}
              buttonStyle={
                props.paddlerScores[props.paddler][props.run][props.move.Move][
                  props.direction
                ]["link"]
                  ? styles.bonusScored
                  : styles.noBonus
              }
            />
          </Col>
        </Row>
      </Grid>
    );
  }
};

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
