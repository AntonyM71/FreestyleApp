// Testing json import
import React from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';

const scoredMoves =  require('../../data/moves_lists/empty_move_list.json')

const _handleMove = (move, paddler) => {
  console.log(move, paddler) 
  // toggle the move on or off when the button is pressed (this needs more work, so it can put things is the right objects)
  // scoredMoves.hole[move].Value = !scoredMoves.hole[move].Value
}
  
export const MoveButtons= (props) => {
      const moveList = require('../../data/moves_lists/move_list.json');
      return (
        <View>

        <View style={{alignItems: 'center', top: 50}}>
          {moveList.hole.map((item, key) =>
            <Button
              onPress={_handleMove(item.Move,  props.paddlerList[props.paddlerIndex])}
              title={item.Move}
              color="#841583"
              key={key}
          />
            
          )}
        </View>
        <View>
            <Text>{"We could put some scores here"}</Text>
          </View>
          </View>
      );
    }


const mapStateToProps = state => {
  return {
    paddlerIndex: state.paddlers.paddlerIndex,
    paddlerList: state.paddlers.paddlerList
  }
}

// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
  return {
    add: (score) => {
      dispatch(incrementScore(score))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MoveButtons)