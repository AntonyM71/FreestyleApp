import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Divider } from "react-native-elements";
import { Col, Grid, Row } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { addOrRemovePaddlerName, updatePaddlerScores, changePaddler } from "../../actions";
import { styles } from "../../styles";
import { initialScoresheet } from './makePaddlerScores';
import { DisplayScore } from './calculateScore';


export const PaddlerManager = (props) => {
  const [newPaddler, setNewPaddler] = useState("");
  const [inputBorder, setInputBorder] = useState("black");


  
  const addOrRemovePaddler = (remainingPaddlers, paddlerScores) => {
    console.log(remainingPaddlers)
    console.log((remainingPaddlers.length))
    const newList = (remainingPaddlers.length == 0) ? ["default"] : remainingPaddlers
    console.log(newList)
    var newPaddlerScores = paddlerScores
    newList.map((paddler) => {
      if (!newPaddlerScores[paddler])
        newPaddlerScores[(paddler.toString())] = initialScoresheet()
    })
    props.updatePaddler(0)
    props.addOrRemovePaddlerName(newList);
    props.updatePaddlerScores(newPaddlerScores);
  }
  const _handleDeletePaddler = (paddler, currentScores) => () => {
  addOrRemovePaddler((props.paddlerList.filter(e => e !== paddler)), currentScores)
  }


  const _handleAddChange = (newPaddler) => {
    setNewPaddler(newPaddler)
    if ((props.paddlerList).indexOf(newPaddler) > -1) {
      setInputBorder("red")
    } else {
      setInputBorder("black")
    }
  } 
  const _handleAddPaddler = (newPaddler, currentScores) => () => {
    if (newPaddler.length == 0) {
      alert("People like having names :)")
    } else {
      if ((props.paddlerList).indexOf(newPaddler) > -1) {
        alert("You've already added this paddler")
      } else {
        setNewPaddler("")
        addOrRemovePaddler([...props.paddlerList, newPaddler], currentScores)
      }
    }
   }
    
  
  return (
    <ScrollView style={styles.container}>
      <View>

        <View>
          <Grid>
            {props.paddlerList.map((paddler, key) => 
              <Row key={key}>
                <Col>
                  <Text style={{...styles.standardText, justifyContent: 'center', 
alignItems: 'center' }}>{paddler}</Text>
                </Col>
                <Col>
                  <DisplayScore paddler={paddler} align="center"/>
                </Col>
                <Col>
                  <Button
                    onPress={_handleDeletePaddler(paddler, props.currentScores)}
                    title="Delete"
                    buttonStyle={styles.deleteButton}
                  />
                </Col>

              </Row>
            
            )
                }
          </Grid>
        </View>
        <View>
          <TextInput
            blurOnSubmit={true}
            autoCorrect={false}    
            style={{height: 40}}
            placeholder="New Paddler Name"
            value={newPaddler}
            onChangeText={text => _handleAddChange(text)}
            onSubmitEditing={_handleAddPaddler(newPaddler, props.currentScores)}
            clearButtonMode="always"
            style={[{
              borderColor: inputBorder,
              borderWidth: 3,
              padding: 10,
              borderRadius: 3,
              marginHorizontal: 5,
              marginLeft: 4,
              marginRight: 4, 
              marginTop:8

            }]}
            // onEndEditing={TextInput.clear()}
   />
        </View>
      </View>
    </ScrollView>
  )
}
  
const mapStateToProps = state => {
  return {
      paddlerIndex: state.paddlers.paddlerIndex,
      paddlerList: state.paddlers.paddlerList,
      currentScores: state.paddlers.paddlerScores
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