import { connect } from 'react-redux';
import React from 'react';
import { Text } from 'react-native';
import { styles } from '../../styles.js';
const moveList = Object.values(require('../../data/moves_lists/move_list.json')).flat();

const calculateScoreAndBonuses = (move, truth) => {
  // the below is a bit of a hack for an unlikely scenario where we have huge but no air,  it will add in the air bonus
  truth.air = truth.huge ? true : truth.air;
  truth.clean = truth.superClean ? true : truth.clean;
  const moveScore = truth.scored
    ? [
        truth.scored == true ? move.Value : 0,
        truth.clean == true ? move.Clean : 0,
        truth.superClean == true ? move.SuperClean : 0,
        truth.air == true ? move.Air : 0,
        truth.huge == true ? move.Huge : 0,
        truth.link == true ? move.Link : 0
      ].reduce((a, b) => a + b)
    : 0;
  return moveScore;
};
const DisplayScorePresenetation = props => {
  const paddlerScore = [0];
  if (props.paddlerScores[props.paddler][props.run]) {
    const scoredMoves = props.paddlerScores[props.paddler][props.run];

        moveList.map((item) => {
            const moveTotal = (
                calculateScoreAndBonuses(item, scoredMoves[item.Move]["left"]) +
                calculateScoreAndBonuses(item, scoredMoves[item.Move]["right"])
            );
            paddlerScore.push(moveTotal)
        })
    }

  return (
    <Text style={{ ...styles.standardText, textAlign: "center", marginTop: 2 }}>
      {paddlerScore.reduce((a, b) => a + b)}
    </Text>
  );
};

const mapStateToProps = state => {
  return {
    paddlerScores: state.paddlers.paddlerScores
  };
};

export const DisplayScore = connect(
  mapStateToProps,
  null
)(DisplayScorePresenetation);
