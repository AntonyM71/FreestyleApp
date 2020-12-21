import React from "react";
import { Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { Button } from "react-native-elements";
import { batch, connect } from "react-redux";
import { changeHeat, changePaddler } from "../../actions";
import { styles } from "../../styles";

export const PaddlerHandler = (props:
    {
        paddlerList: any;
        currentHeat: number;
        updatePaddler: (arg0: number) => void;
        updateHeat: (arg0: number) => void;
    }) => {
    const numberOfHeats = props.paddlerList.length;

    const _handlePressNextHeat = () => {
        // -1 to account for zero indexing
        const newHeat =
            props.currentHeat < numberOfHeats - 1 ? props.currentHeat + 1 : 0;
        batch(() => {
            props.updatePaddler(0);
            props.updateHeat(newHeat);
        });
    };

    const _handlePressPreviousHeat = () => {
        // -1 to account for zero indexing
        const newHeat =
            props.currentHeat == 0 ? numberOfHeats - 1 : props.currentHeat - 1;
        batch(() => {
            props.updatePaddler(0);
            props.updateHeat(newHeat);
        });
    };

    // only show the component if we have multiple heats (preverve vertical space for phones)
    if (props.paddlerList.length != 1 && props.paddlerList.flat().length != 0) {
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
                                <Text
                                    style={{
                                        ...styles.standardText,
                                        marginTop: 15,
                                        textAlign: "center",
                                        fontSize: 23
                                    }}
                                >{`Heat ${props.currentHeat + 1}`}</Text>
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
    } else {
        return null;
    }
};

const mapStateToProps = (state: { paddlers: { paddlerList: any; currentHeat: any; }; }) => {
    return {
        paddlerList: state.paddlers.paddlerList,
        currentHeat: state.paddlers.currentHeat
    };
};

// not used currently, need to add an addmove function and redux pathway
const mapDispatchToProps = (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    return {
        updatePaddler: (index: any) => {
            dispatch(changePaddler(index));
        },
        updateHeat: (index: any) => {
            dispatch(changeHeat(index));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaddlerHandler);
