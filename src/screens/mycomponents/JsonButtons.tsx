// Testing json import
import React from "react";
import { Dimensions, View } from "react-native";
import { connect } from "react-redux";
import { DynamicButton } from "./dynamicButton";
import { TrophyDynamicButton } from "./trophyDynamicButton";
import { EntryDynamicButton } from "./entryDynamicButton";
import { dataSourceMoveInterface } from "./makePaddlerScores";
const NormalMove = (props: {
    paddlerList: { [x: string]: { [x: string]: any; }; };
    currentHeat: number;
    paddlerIndex: number;
    run: number;
    item: any;
    direction: string;
}) => {
    return (

        <DynamicButton
            paddler={
                props.paddlerList[props.currentHeat][props.paddlerIndex]
            }
            run={props.run}
            move={props.item}
            direction={props.direction}
        />

    );
};


export const MoveButtons = (props: {
    paddlerList: { [x: string]: { [x: string]: any; }; };
    currentHeat: React.ReactText;
    paddlerIndex: React.ReactText;
    run: any;
    showMoves: { hole: any; wave: any; };
}) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const moveList: moveListInterface = require("../../data/moves_lists/move_list.json");
    const screenWidth = Math.round(Dimensions.get("window").width);
    const availableMoves = (moveList);
    const buttonPercentage = screenWidth > 600 ? "25%" : "50%";
    const entryButtonPercentage = screenWidth > 600 ? "33%" : "33%";
    const trophyButtonPercentage = screenWidth > 600 ? "33%" : "50%";
    {
        if (props.paddlerList[props.currentHeat].length != 0) {
            return (
                <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <>
                        {availableMoves.entry.map((item) => {
                            return (
                                <View style={{ width: entryButtonPercentage }} key={item.Move}>
                                    <EntryDynamicButton
                                        paddler={
                                            props.paddlerList[props.currentHeat][props.paddlerIndex]
                                        }
                                        run={props.run}
                                        move={item}
                                        direction={"left"}
                                    />
                                </View>
                            );
                        })}
                    </>
                    <>
                        {availableMoves.both.map((item) => {
                            if (!item.Reverse) {
                                return (
                                    <View style={{ width: buttonPercentage }} key={item.Move}>
                                        <NormalMove
                                            item={item}
                                            run={props.run}
                                            paddlerList={props.paddlerList}
                                            paddlerIndex={props.paddlerIndex}
                                            currentHeat={props.currentHeat}
                                            direction={"left"} />
                                    </View>
                                );
                            } else {
                                return (
                                    <>
                                        <View style={{ width: buttonPercentage }} key={item.Move}>
                                            <NormalMove
                                                item={item}
                                                run={props.run}
                                                paddlerList={props.paddlerList}
                                                paddlerIndex={props.paddlerIndex}
                                                currentHeat={props.currentHeat}
                                                direction={"left"}
                                            />
                                        </View>
                                        <View style={{ width: buttonPercentage }} >
                                            <NormalMove
                                                item={item}
                                                run={props.run}
                                                paddlerList={props.paddlerList}
                                                paddlerIndex={props.paddlerIndex}
                                                currentHeat={props.currentHeat}
                                                direction={"right"}
                                            />
                                        </View>
                                    </>
                                );
                            }
                        })
                        }
                    </>
                    <>

                        {props.showMoves.hole ? availableMoves.hole.map((item) => {
                            if (!item.Reverse) {
                                return (
                                    <View style={{ width: buttonPercentage }} key={item.Move}>
                                        <NormalMove
                                            item={item}
                                            run={props.run}
                                            paddlerList={props.paddlerList}
                                            paddlerIndex={props.paddlerIndex}
                                            currentHeat={props.currentHeat}
                                            direction={"left"}
                                        />
                                    </View>
                                );
                            } else {
                                return (
                                    <>
                                        <View style={{ width: buttonPercentage }} key={item.Move}>
                                            <NormalMove
                                                item={item}
                                                run={props.run}
                                                paddlerList={props.paddlerList}
                                                paddlerIndex={props.paddlerIndex}
                                                currentHeat={props.currentHeat}
                                                direction={"left"}
                                            />
                                        </View>
                                        <View style={{ width: buttonPercentage }}>
                                            <NormalMove
                                                item={item}
                                                run={props.run}
                                                paddlerList={props.paddlerList}
                                                paddlerIndex={props.paddlerIndex}
                                                currentHeat={props.currentHeat}
                                                direction={"right"}
                                            />
                                        </View>
                                    </>
                                );
                            }
                        }
                        )
                            : null
                        }
                    </>
                    <>

                        {props.showMoves.wave ? availableMoves.wave.map((item) => {
                            if (!item.Reverse) {
                                return (
                                    <View style={{ width: buttonPercentage }} key={item.Move}>
                                        <NormalMove
                                            item={item}
                                            run={props.run}
                                            paddlerList={props.paddlerList}
                                            paddlerIndex={props.paddlerIndex}
                                            currentHeat={props.currentHeat}
                                            direction={"left"}
                                        />
                                    </View>
                                );
                            } else {
                                return (
                                    <>
                                        <View style={{ width: buttonPercentage }} key={item.Move}>
                                            <NormalMove
                                                item={item}
                                                run={props.run}
                                                paddlerList={props.paddlerList}
                                                paddlerIndex={props.paddlerIndex}
                                                currentHeat={props.currentHeat}
                                                direction={"left"}
                                            />
                                        </View>
                                        <View style={{ width: buttonPercentage }}>
                                            <NormalMove
                                                item={item}
                                                run={props.run}
                                                paddlerList={props.paddlerList}
                                                paddlerIndex={props.paddlerIndex}
                                                currentHeat={props.currentHeat}
                                                direction={"right"}
                                            />
                                        </View>
                                    </>
                                );
                            }
                        }
                        )
                            : null
                        }
                    </>
                    <>
                        {availableMoves.trophy.map((item, key) => {
                            return (
                                <View style={{ width: trophyButtonPercentage }} key={item.Move + key}>
                                    <TrophyDynamicButton
                                        paddler={
                                            props.paddlerList[props.currentHeat][props.paddlerIndex]
                                        }
                                        run={props.run}
                                        move={item}
                                        direction={"left"}
                                    />
                                </View>
                            );
                        }
                        )}
                    </>
                </View>
            );
        } else {
            return (null);
        }
    }
};

const mapStateToProps = (state: {
    paddlers: { paddlerIndex: any; paddlerList: any; currentHeat: any; run: any; enabledMoves: any; };
}) => {
    return {
        paddlerIndex: state.paddlers.paddlerIndex,
        paddlerList: state.paddlers.paddlerList,
        currentHeat: state.paddlers.currentHeat,
        run: state.paddlers.run,
        showMoves: state.paddlers.enabledMoves
    };
};

export default connect(
    mapStateToProps,
    null
)(MoveButtons);
export interface moveListInterface {
    entry: dataSourceMoveInterface[],
    both: dataSourceMoveInterface[],
    hole: dataSourceMoveInterface[],
    wave: dataSourceMoveInterface[],
    trophy: dataSourceMoveInterface[],
}