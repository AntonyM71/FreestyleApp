import React, { useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { Col, Grid, Row } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { addOrRemovePaddler } from "../../actions";
import { styles } from "../../styles";
export const PaddlerManager = (props) => {
  const [newPaddler, setNewPaddler] = useState("");
  const [inputBorder, setInputBorder] = useState("black");

  const _handleDeletePaddler = (paddler) => () => {
 props.addOrRemovePaddler(props.paddlerList.filter(e => e !== paddler))
  }


  const _handleAddChange = (newPaddler) => {
    setNewPaddler(newPaddler)
    if ((props.paddlerList).indexOf(newPaddler) > -1) {
      setInputBorder("red")
    } else {
      setInputBorder("black")
    }
  } 
  const _handleAddPaddler = (newPaddler) => () => {
    if (newPaddler.length == 0) {
      alert("People like having names :)")
    } else {
      if ((props.paddlerList).indexOf(newPaddler) > -1) {
        alert("You've already added this paddler")
      } else {
        setNewPaddler("")
        props.addOrRemovePaddler([...props.paddlerList, newPaddler])
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
                  <Text>{paddler}</Text>
                </Col>
                <Col>
                  <Button
                    onPress={_handleDeletePaddler(paddler)}
                    title="Delete"
                    color="red"
                    accessibilityLabel="Delete the paddler"
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
            onSubmitEditing={_handleAddPaddler(newPaddler)}
            clearButtonMode="always"
            style={[{
              borderColor: inputBorder,
              borderWidth: 3,
              padding: 10,
              borderRadius: 3,
              marginHorizontal: 5

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
      paddlerList: state.paddlers.paddlerList
  }
}


// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
  return {
   addOrRemovePaddler: (index) => {
      console.log("updating")
      dispatch(addOrRemovePaddler(index))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PaddlerManager)