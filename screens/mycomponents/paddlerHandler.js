import React from 'react';
import { Button, Text, View } from 'react-native';




export const PaddlerHandler = (state) => {

    const _handlePressNext = () => {
        state.setState({
            paddlerIndex: state.paddlerIndex+1
          })
      };
    
  
        return (
            <View>
               
                <View><Text>{state.paddlerIndex}</Text></View>
                <Button
                    onPress={_handlePressNext()}
                    title="Next"
                    color="#649524"
                    accessibilityLabel="Learn more about the ICF"
                />

            </View>
        );
    
}

export default PaddlerHandler;