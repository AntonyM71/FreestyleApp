// Testing json import
import React from 'react';
import { View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import { DynamicButton } from "./dynamicButton";

export const MoveButtons= (props) => {
  const moveList = require('../../data/moves_lists/move_list.json');
  const screenWidth = Math.round(Dimensions.get('window').width);
  const availableMoves = Object.values(moveList)
  const buttonPercentage = screenWidth > 600 ? "25%" : "50%"
      return (
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: true }}>
            {availableMoves.map((item, key) => {
              if (!item.Reverse) {
                return (
                  <View style={{ width: buttonPercentage }} key={key}>
                    <DynamicButton paddler={props.paddlerList[props.currentHeat][props.paddlerIndex]} move={item} direction={"left"} />
                  </View>

    
                )
              } else {
                return (
                  // <View key={key}>
                  <>
                    <View style={{ width: buttonPercentage }}>
                      <DynamicButton paddler={props.paddlerList[props.currentHeat][props.paddlerIndex]} move={item} direction={"left"} />
                    </View>
                    <View style={{ width: buttonPercentage }}>
                      <DynamicButton paddler={props.paddlerList[props.currentHeat][props.paddlerIndex]} move={item} direction={"right"} />
                    </View>
                   {/* </View> */}
                  </>

                )
              }
            }
            )
              }
        </View>
      );
    }


const mapStateToProps = state => {
  return {
    paddlerIndex: state.paddlers.paddlerIndex,
    paddlerList: state.paddlers.paddlerList,
    currentHeat: state.paddlers.currentHeat
  }
}



export default connect(mapStateToProps, null)(MoveButtons)