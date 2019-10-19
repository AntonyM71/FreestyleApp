// Testing json import
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
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
                        <DynamicButton paddler={props.paddlerList[props.paddlerIndex]} move={item} direction={"left"} />
                      </Col>
                    </Row>
    
                )
              } else {
                return (
                  <Row key={key}>
                    <Col>
                      <DynamicButton paddler={props.paddlerList[props.paddlerIndex]} move={item} direction={"left"} />
                    </Col>
                    <Col>
                      <DynamicButton paddler={props.paddlerList[props.paddlerIndex]} move={item} direction={"right"} />
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
  }
}



export default connect(mapStateToProps, null)(MoveButtons)