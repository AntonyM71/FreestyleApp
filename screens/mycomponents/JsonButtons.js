// Testing json import
import React from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { updatePaddlerScores} from "../../actions"


  
export const MoveButtons= (props) => {
  const moveList = require('../../data/moves_lists/move_list.json');

  const _handleMove = ( paddler, move,  direction, type) => () => {
    var newScores = props.paddlerScores

    console.log(newScores[paddler][move][direction][type])
    newScores[paddler][move][direction][type] = !newScores[paddler][move][direction][type]
    console.log("now " + newScores[paddler][move][direction][type])
    props.updateScore(newScores);
    // newScores[pa¬
  }
      return (
        <View>

        <View style={{alignItems: 'center', top: 50}}>
            {moveList.hole.map((item, key) => {
              if (!item.Reverse) {
                return (
                  <View key={key}>
                    <Button
                      onPress={_handleMove(props.paddlerList[props.paddlerIndex], item.Move, "left", "scored")}
                      title={item.Move}
                      color="#841583"
                      
                    />
                    
                  </View>
                )
              } else {
                return (
                  <View key={key}>
                    <Button
                      onPress={_handleMove(props.paddlerList[props.paddlerIndex], item.Move, "left", "scored")}
                      title={item.Move + " left"}
                      color="#841583"
                    />
                    <Button
                      onPress={_handleMove(props.paddlerList[props.paddlerIndex], item.Move, "right", "scored")}
                      title={item.Move + " right"}
                      color="#841583"
                    />
                  </View>
                )
              }
            }
            )
            }
        </View>
        <View>
            <Text>
              {"Scores?"}
            </Text>
          </View>
          </View>
      );
    }


const mapStateToProps = state => {
  return {
    paddlerIndex: state.paddlers.paddlerIndex,
    paddlerList: state.paddlers.paddlerList,
    paddlerScores: state.paddlers.paddlerScores
  }
}

// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
  return {
      add: (score) => {
        dispatch(incrementScore(score))
    },
      updateScore: (newScores) => {
        dispatch(updatePaddlerScores(newScores))
      }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MoveButtons)