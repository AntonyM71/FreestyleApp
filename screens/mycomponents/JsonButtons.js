// Testing json import
import React from 'react';
import { Button, Text, View } from 'react-native';


const scoredMoves =  require('../../data/moves_lists/empty_move_list.json')

const handleMove = (move, paddler) => {
  console.log(move, paddler) 
  // toggle the move on or off when the button is pressed (this needs more work, so it can put things is the right objects)
  // scoredMoves.hole[move].Value = !scoredMoves.hole[move].Value
}
  
export const MoveButtons= (currentPaddler) => {
      const moveList = require('../../data/moves_lists/move_list.json');
      return (
        <View>

        <View style={{alignItems: 'center', top: 50}}>
          {moveList.hole.map((item, key) =>
            <Button
              onPress={handleMove(item.Move, currentPaddler.value)}
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
  
    export default MoveButtons