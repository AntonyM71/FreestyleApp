import React from 'react';
import { Button, Text, View } from 'react-native';
import { Col, Grid, Row } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { changePaddler } from "../../actions";

export const PaddlerHandler = (props) => {

    const numberOfPaddlers = props.paddlerList.length;
    
    const _handlePressNext = () => {
        // -2 to account for zero indexing, and the space for the next paddler
        const newPaddlerIndex = ((props.paddlerIndex < (numberOfPaddlers - 1)) ? props.paddlerIndex + 1 : 0)
        console.log(props.paddlerIndex)
        console.log(newPaddlerIndex)
        props.updatePaddler(newPaddlerIndex)

    };
    
    const _handlePressPrevious = () => {
        // -2 to account for zero indexing, and the space for the next paddler
        const newPaddlerIndex = ((props.paddlerIndex == 0) ? numberOfPaddlers -1 : props.paddlerIndex - 1 )
        console.log(props.paddlerIndex)
        console.log(newPaddlerIndex)
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
                                color="#649524"
                                accessibilityLabel="Learn more about the ICF"
                            />
                        </Col>
                        <Col>
                            <View><Text>{props.paddlerList[props.paddlerIndex]}</Text></View>
                        </Col>
                        <Col>
                            <Button
                                onPress={_handlePressNext}
                                title="Next Paddler"
                                color="#649524"
                                accessibilityLabel="Learn more about the ICF"
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
            console.log("updating")
        dispatch(changePaddler(index))
      }
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaddlerHandler)