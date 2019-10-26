import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Col, Grid, Row } from "react-native-easy-grid";
import { connect, batch } from 'react-redux';
import { changePaddler, changeHeat } from "../../actions";
import { styles} from "../../styles"
export const PaddlerHandler = (props) => {


        const numberOfHeats = (props.paddlerList).length;
    
    const _handlePressNextHeat = () => {
        // -1 to account for zero indexing
        const newHeat= ((props.currentHeat < (numberOfHeats - 1)) ? props.currentHeat + 1 : 0)
        batch(() => {
        props.updatePaddler(0)
            props.updateHeat(newHeat)
        })

    };
    
    const _handlePressPreviousHeat = () => {
        // -1 to account for zero indexing
        const newHeat = ((props.currentHeat== 0) ? numberOfHeats -1 : props.currentHeat - 1 )
        batch(() => {
            props.updatePaddler(0)
            props.updateHeat(newHeat)
        })

      };
    
    // only show the component if we have multiple heats (preverve vertical space for phones)
    if ((props.paddlerList.length != 1)) {
        return (
            <View>
                <Grid>
                    <Row>
                        <Col>
                            <Button
                                onPress={_handlePressPreviousHeat}
                                title="Last"
                                buttonStyle={styles.changeButton}
                            />
                        </Col>
                        <Col>
                            <View>
                                <Text style={{ ...styles.standardText, marginTop: 10, textAlign: "center", fontSize: 25 }}>{`Heat ${props.currentHeat + 1}`}</Text>
                            </View>
                        </Col>
                        <Col>
                            <Button
                                onPress={_handlePressNextHeat}
                                title="Next"
                                buttonStyle={styles.changeButton}
                            />
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
    else {
        return null
    }
    
    
}


const mapStateToProps = state => {
    return {
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