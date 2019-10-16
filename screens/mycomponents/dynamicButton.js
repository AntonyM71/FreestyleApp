import { connect } from 'react-redux';
import { updatePaddlerScores } from "../../actions";
import React from 'react';
import { Button} from 'react-native-elements';
import { Col, Grid, Row } from "react-native-easy-grid";
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    noMove: {
        backgroundColor:  "#0066cc",
        marginLeft: 4,
        marginRight: 4, 
        marginTop: 10,
        
    },
    noBonus: {
        backgroundColor:  "#0066cc",
        marginLeft: 4,
        marginRight: 4, 
        marginTop: 4,
    },
    moveScored: {
        backgroundColor: "#000099",
        marginLeft: 4,
        marginRight: 4, 
        marginTop: 10,
        fontSize: 40
    },
    bonusScored: {
        backgroundColor: "#000099",
        marginLeft: 4,
        marginRight: 4, 
        marginTop:4,
    },
})
const DynamicButtonPresentation = (props) => {

    const _handleMove = (paddler, move, direction, type) => () => {
        var newScores = { ...props.paddlerScores }

        newScores[paddler][move][direction][type] = !newScores[paddler][move][direction][type]
        props.updateScore(newScores);
     
    }

    if (props.paddlerScores[props.paddler][props.move][props.direction].scored == false) {
 const buttonName = props.move === ("Loop" || "Back Loop") ? props.move : props.move + " " + props.direction       
        return (
        
            <Button
                onPress={_handleMove(props.paddler, props.move, props.direction, "scored")}
                title={buttonName}
                buttonStyle={styles.noMove}
            />
        )
    } else {
        const buttonName = props.move === ("Loop" || "Back Loop") ? props.move : props.move + " " + props.direction;
        return (
            <Grid>
                <Row>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move, props.direction, "scored")}
                            title={buttonName}
                            buttonStyle={styles.moveScored}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move, props.direction, "clean")}
                            title={"Clean"}
                            buttonStyle={props.paddlerScores[props.paddler][props.move][props.direction]["clean"] ? styles.bonusScored : styles.noBonus}
                        />
                    </Col>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move, props.direction, "superClean")}
                            title={"S Clean"}
                            buttonStyle={props.paddlerScores[props.paddler][props.move][props.direction]["superClean"] ? styles.bonusScored : styles.noBonus}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move, props.direction, "air")}
                            title={"Air"}
                            buttonStyle={props.paddlerScores[props.paddler][props.move][props.direction]["air"] ? styles.bonusScored : styles.noBonus}
                        />
                    </Col>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move, props.direction, "huge")}
                            title={"Huge"}
                            buttonStyle={props.paddlerScores[props.paddler][props.move][props.direction]["huge"] ? styles.bonusScored : styles.noBonus}
                        />  
                    </Col>
                </Row>
            </Grid>
        )
    }
}



const mapStateToProps = state => {
  return {
    paddlerScores: state.paddlers.paddlerScores
  }
}

// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = dispatch => {
  return {
      updateScore: (newScores) => {
        dispatch(updatePaddlerScores(newScores))
      }
  }
}


export const DynamicButton =  connect(mapStateToProps, mapDispatchToProps)(DynamicButtonPresentation)