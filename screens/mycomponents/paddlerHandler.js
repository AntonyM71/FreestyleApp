import React from 'react';
import { Button, Text, View } from 'react-native';
import { Col, Grid, Row } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { changePaddler } from "../../actions";
import { DisplayScore } from './calculateScore';

export const PaddlerHandler = (props) => {

    const numberOfPaddlers = props.paddlerList.length;
    
    const _handlePressNext = () => {
        // -1 to account for zero indexing
        const newPaddlerIndex = ((props.paddlerIndex < (numberOfPaddlers - 1)) ? props.paddlerIndex + 1 : 0)
        props.updatePaddler(newPaddlerIndex)

    };
    
    const _handlePressPrevious = () => {
        // -1 to account for zero indexing
        const newPaddlerIndex = ((props.paddlerIndex == 0) ? numberOfPaddlers -1 : props.paddlerIndex - 1 )
        props.updatePaddler(newPaddlerIndex)

      };
    
  
        return (
            <View>
                <Grid>
                    <Row>
                        <Col>
                            <Button
                                onPress={_handlePressPrevious}
                                title="Previous"
                                color="#000066"
                                accessibilityLabel="Select Previous Paddler"
                            />
                        </Col>
                        <Col>
                            <View>
                                <Text>{props.paddlerList[props.paddlerIndex]}</Text>
                                <DisplayScore paddler={props.paddlerList[props.paddlerIndex]}/>
                            </View>
                        </Col>
                        <Col>
                            <Button
                                onPress={_handlePressNext}
                                title="Next Paddler"
                                color="#000099"
                                accessibilityLabel="Select Next Paddler"
                            />
                        </Col>
                    </Row>
                </Grid>
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
        updatePaddler: (index) => {
        dispatch(changePaddler(index))
      }
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaddlerHandler)