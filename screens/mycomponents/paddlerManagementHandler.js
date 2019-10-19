import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Divider } from "react-native-elements";
import { Col, Grid, Row } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { addOrRemovePaddlerName, updatePaddlerScores, changePaddler } from "../../actions";
import { styles } from "../../styles";
import { initialScoresheet } from './makePaddlerScores';
import { DisplayScore } from './calculateScore';
import PaddlerHeatManager from "./paddlerHeatManagementHandler"

// pull out heat logic into another file
// consider moving the button into another file
// general filesystem tyidy up
export const PaddlerManager = (props) => {

  const addHeat = (heatKey) => {
    const newHeatList = props.paddlerHeatList
    newHeatList.push([`default ${heatKey}`])
        var newPaddlerScores = props.paddlerScores
    newHeatList.map((paddler) => {
      if (!newPaddlerScores[paddler])
        newPaddlerScores[(paddler.toString())] = initialScoresheet()
    })
    console.log(newHeatList)
    props.updatePaddler(0)
    props.addOrRemovePaddlerName([...newHeatList]);
    props.updatePaddlerScores(newPaddlerScores);
  }
  

  
  return (
    <ScrollView style={styles.container}>
      <View>
        {props.paddlerHeatList.map((paddlerList, heatKey) =>
          
          <PaddlerHeatManager paddlerList={paddlerList} heatKey={heatKey} />
        )}
        <Button
          onPress={() => {addHeat(props.paddlerHeatList.length +1)}}
          title="New Heat"
          buttonStyle={styles.timerGreen}
        />
      </View>
    </ScrollView>
  )
}
  
const mapStateToProps = state => {
  return {
    paddlerHeatList: state.paddlers.paddlerList,
    paddlerScores: state.paddlers.paddlerScores,
  }
}


// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
  return {
   addOrRemovePaddlerName: (paddlers) => {
      dispatch(addOrRemovePaddlerName(paddlers))
    },
       updatePaddlerScores: (scores) => {
      dispatch(updatePaddlerScores(scores))
    },
    updatePaddler: (index) => {
      dispatch(changePaddler(index))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PaddlerManager)