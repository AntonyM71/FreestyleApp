import { connect } from 'react-redux';
import React from 'react';
import { Text } from 'react-native';
const moveList = require('../../data/moves_lists/move_list.json');

const calculateScoreAndBonuses = (move, truth) => {
    const moveScore = [
    
            truth.scored == true ? move.Value : 0,
            truth.clean == true ? move.Clean : 0,
            truth.superClean == true ? move.SuperClean : 0,
            truth.air == true ? move.Air: 0,
            truth.huge == true ? move.Huge : 0
    ].reduce((a, b) => a + b)
    return moveScore
}
const DisplayScorePresenetation = (props) => {
    const scoredMoves = (props.paddlerScores[props.paddler])
    const paddlerScore = [0]
    moveList.hole.map((item) => {
        const moveTotal = (
            calculateScoreAndBonuses(item, scoredMoves[item.Move]["left"]) +
            calculateScoreAndBonuses(item, scoredMoves[item.Move]["right"])
        );
        paddlerScore.push(moveTotal)
    })

    return (
        <Text>{paddlerScore.reduce((a, b) => a + b)}</Text>
    )
}

    const mapStateToProps = state => {
  return {
    paddlerScores: state.paddlers.paddlerScores
  }
}

export const DisplayScore =  connect(mapStateToProps, null)(DisplayScorePresenetation)