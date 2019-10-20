import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Col, Grid, Row } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { changePaddler, changeHeat } from "../../actions";
import { DisplayScore } from './calculateScore';
import { styles} from "../../styles"
export const PaddlerHandler = (props) => {

    const numberOfPaddlers = (props.paddlerList[props.currentHeat]).length;
    
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
        const numberOfHeats = (props.paddlerList).length;
    
    const _handlePressNextHeat = () => {
        // -1 to account for zero indexing
        const newHeat= ((props.currentHeat < (numberOfHeats - 1)) ? props.currentHeat + 1 : 0)
        props.updatePaddler(0)
        props.updateHeat(newHeat)

    };
    
    const _handlePressPreviousHeat = () => {
        // -1 to account for zero indexing
        const newHeat = ((props.currentHeat== 0) ? numberOfHeats -1 : props.currentHeat - 1 )
        props.updatePaddler(0)
        props.updateHeat(newHeat)

      };
    
    
  
        return (
            <View>
                <Grid>
                            <Row>
                                <Col>
                                    <Button
                                        onPress={_handlePressPreviousHeat}
                                        title="Last Heat"
                                        buttonStyle={styles.changeButton}
                                    />
                                </Col>
                                <Col>
                                    <View>
                                        <Text style={{ ...styles.standardText, marginTop: 10, textAlign: "center", fontSize: 25 }}>{`Heat ${props.currentHeat+1}`}</Text>
                                    </View>
                                </Col>
                                <Col>
                                    <Button
                                        onPress={_handlePressNextHeat}
                                        title="Next Heat"
                                        buttonStyle={styles.changeButton}
                                    />
                                </Col>
                            </Row>
                    <Row>
                        <Col>
                            <Button
                                onPress={_handlePressPrevious}
                                title="Last Paddler"
                                buttonStyle={styles.changeButton}
                            />
                        </Col>
                        <Col>
                            <View>
                                <Text style={{ ...styles.standardText, marginTop: 2, textAlign: "center" }}>{props.paddlerList[props.currentHeat][props.paddlerIndex]}</Text>
                                <DisplayScore paddler={props.paddlerList[props.currentHeat][props.paddlerIndex]}/>
                            </View>
                        </Col>
                        <Col>
                            <Button
                                onPress={_handlePressNext}
                                title="Next Paddler"
                                buttonStyle={styles.changeButton}
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
        paddlerList: state.paddlers.paddlerList,
        currentHeat: state.paddlers.currentHeat
        
    }
}
  
  // not used currently, need to add an addmove function and redux pathway
  const mapDispatchToProps = dispatch => {
    return {
        updatePaddler: (index) => {
        dispatch(changePaddler(index))
        },
        updateHeat: (index) => {
        dispatch(changeHeat(index))
      }
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaddlerHandler)