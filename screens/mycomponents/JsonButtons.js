// Testing json import
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { updatePaddlerScores } from "../../actions";
import { DynamicButton } from "./dynamicButton";
import { Col, Grid, Row } from "react-native-easy-grid";
  
export const MoveButtons= (props) => {
  const moveList = require('../../data/moves_lists/move_list.json');

      return (
        <View>
            <Grid>
            {moveList.hole.map((item, key) => {
              if (!item.Reverse) {
                return (
                    <Row key={key}>
                      <Col>
                        <DynamicButton paddler={props.paddlerList[props.paddlerIndex]} move={item.Move} direction={"left"} />
                      </Col>
                    </Row>
    
                )
              } else {
                return (
                  <Row key={key}>
                    <Col>
                      <DynamicButton paddler={props.paddlerList[props.paddlerIndex]} move={item.Move} direction={"left"} />
                    </Col>
                    <Col>
                      <DynamicButton paddler={props.paddlerList[props.paddlerIndex]} move={item.Move} direction={"right"} />
                    </Col>
                  </Row>
                )
              }
            }
            )
              }
          </Grid>
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