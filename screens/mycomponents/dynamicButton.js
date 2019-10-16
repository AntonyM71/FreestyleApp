import { connect } from 'react-redux';
import { updatePaddlerScores } from "../../actions";
import React from 'react';
import { Button} from 'react-native-elements';
import { Col, Grid, Row } from "react-native-easy-grid";
import { styles } from "../../styles";
const DynamicButtonPresentation = (props) => {

    const _handleMove = (paddler, move, direction, type) => () => {
        var newScores = { ...props.paddlerScores }

        newScores[paddler][move][direction][type] = !newScores[paddler][move][direction][type]
        props.updateScore(newScores);
     
    }

    if (props.paddlerScores[props.paddler][props.move.Move][props.direction].scored == false) {
 const buttonName = (props.move.Move ==("Loop") || props.move.Move == ( "Back Loop")) ? props.move.Move : props.move.Move + " " + props.direction       
        return (
        
            <Button
                onPress={_handleMove(props.paddler, props.move.Move, props.direction, "scored")}
                title={buttonName}
                buttonStyle={styles.noMove}
            />
        )
    } else {
        const buttonName = (props.move.Move ==("Loop") || props.move.Move == ( "Back Loop")) ? props.move.Move : props.move.Move + " " + props.direction;
        return (
            <Grid>
                <Row>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move.Move, props.direction, "scored")}
                            title={buttonName}
                            buttonStyle={styles.moveScored}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move.Move, props.direction, "clean")}
                            title={"Clean"}
                            disabled={props.move.Clean ? false : true}
                            buttonStyle={props.paddlerScores[props.paddler][props.move.Move][props.direction]["clean"] ? styles.bonusScored : styles.noBonus}
                        />
                    </Col>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move.Move, props.direction, "superClean")}
                            title={"S Clean"}
                            disabled={props.move.SuperClean ? false : true}
                            buttonStyle={props.paddlerScores[props.paddler][props.move.Move][props.direction]["superClean"] ? styles.bonusScored : styles.noBonus}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move.Move, props.direction, "air")}
                            title={"Air"}
                            disabled={props.move.Air ? false : true}
                            buttonStyle={props.paddlerScores[props.paddler][props.move.Move][props.direction]["air"] ? styles.bonusScored : styles.noBonus}
                        />
                    </Col>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move.Move, props.direction, "huge")}
                            title={"Huge"}
                            disabled={props.move.Huge ? false : true}
                            buttonStyle={props.paddlerScores[props.paddler][props.move.Move][props.direction]["huge"] ? styles.bonusScored : styles.noBonus}
                        />  
                    </Col>
                    <Col>
                        <Button
                            onPress={_handleMove(props.paddler, props.move.Move, props.direction, "link")}
                            title={"Link"}
                            disabled={props.move.Link ? false : true}
                            buttonStyle={props.paddlerScores[props.paddler][props.move.Move][props.direction]["link"] ? styles.bonusScored : styles.noBonus}
                        
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