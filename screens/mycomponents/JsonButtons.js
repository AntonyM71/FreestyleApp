// Testing json import
import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import  HoleMoveButtons  from './holeButtons';

class BasicButton extends React.Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
              <HoleMoveButtons title={this.props}/>
            <Text>{this.props.move}</Text>
            </View>
        );
    }
}

export default class MoveButtons extends React.Component {
    render() {
      const moveList = require('../../data/moves_lists/move_list.json');
      return (
        <View style={{alignItems: 'center', top: 50}}>
          {moveList.hole.map((item, key) =>
           <BasicButton move={item.Move} key={key} />
          )}
        </View>
      );
    }
  }