import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button } from "react-native-elements";
import { connect } from 'react-redux';
import { addOrRemovePaddlerName, updatePaddlerScores, changePaddler } from "../../actions";
import { styles } from "../../styles";
import { initialScoresheet } from './makePaddlerScores';
import { DisplayScore } from './calculateScore';



export const PaddlerHeatManagerPresentation = (props) => {
  const [newPaddler, setNewPaddler] = useState("");
  const [inputBorder, setInputBorder] = useState("black");

const _handleDeletePaddler = (heatKey, paddlerList, paddler, paddlerScores) => () => {
  addOrRemovePaddler(heatKey,(paddlerList.filter(e => e !== paddler)), paddlerScores)
  }


  const _handleAddChange = (newPaddler) => {
    setNewPaddler(newPaddler)
    if ((props.paddlerHeatList.flat()).indexOf(newPaddler) > -1) {
      setInputBorder("red")
    } else {
      setInputBorder("black")
    }
  } 
  const _handleAddPaddler = (heatKey, paddlerList, newPaddler, paddlerScores) => () => {
    if (newPaddler.length == 0) {
      alert("People like having names :)")
    } else {
      if ((props.paddlerHeatList.flat()).indexOf(newPaddler) > -1) {
        alert("You've already added this paddler")
      } else {
        setNewPaddler("")
        addOrRemovePaddler(heatKey, [...paddlerList, newPaddler], paddlerScores)
      }
    }
  }
      const addOrRemovePaddler = (heatKey, remainingPaddlers, paddlerScores) => {

    const newList = (remainingPaddlers.length == 0) ? ["default"] : remainingPaddlers

    var newPaddlerScores = paddlerScores
    newList.map((paddler) => {
      if (!newPaddlerScores[paddler])
        newPaddlerScores[(paddler.toString())] = initialScoresheet()
    })

    const newHeatList = props.paddlerHeatList
    newHeatList[heatKey]=newList
    props.updatePaddler(0)
    props.addOrRemovePaddlerName([...newHeatList]);
    props.updatePaddlerScores(newPaddlerScores);
  }

    

    return (
        <View>
            <View>
                <Text style={styles.heatStyle}>{`Heat ${props.heatKey+1}`}</Text>
       
                {props.paddlerList.map((paddler, key) =>
                  <View style={{ flex: 1, flexDirection: 'row', flexWrap: true }} key={key}>
                    <View style={{ width: "30%" }}>
                      <Text style={{
                        ...styles.standardText, justifyContent: 'center',
                        alignItems: 'center'
                      }}>{paddler}</Text>
                    </View>
                    <View style={{ width: "30%" }}>
                      <DisplayScore paddler={paddler} align="center" />
                    </View>
                    <View style={{ width: "40%" }}>
                      <Button
                        onPress={_handleDeletePaddler(props.heatKey, props.paddlerList, paddler, props.paddlerScores)}
                        title="Delete"
                        buttonStyle={styles.deleteButton}
                      />
                    </View>

                  </View>
            
                )
                }
            </View>
            <View>
              <TextInput
                blurOnSubmit={true}
                autoCorrect={false}
                style={{ height: 40 }}
                placeholder="New Paddler Name"
                value={newPaddler}
                onChangeText={text => _handleAddChange(text)}
                onSubmitEditing={_handleAddPaddler(props.heatKey, props.paddlerList, newPaddler, props.paddlerScores)}
                clearButtonMode="always"
                style={[{
                  borderColor: inputBorder,
                  borderWidth: 3,
                  padding: 10,
                  borderRadius: 3,
                  marginHorizontal: 5,
                  marginLeft: 4,
                  marginRight: 4,
                  marginTop: 8

                }]}
                />
            </View>
          </View>
        )}


const mapStateToProps = state => {
  return {
    // paddlerIndex: state.paddlers.paddlerIndex,
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



export default connect(mapStateToProps, mapDispatchToProps)(PaddlerHeatManagerPresentation)