import React from 'react';
import {View,Text} from 'react-native';
import {Icon} from 'react-native-vector-icons/FontAwesome5';

export default class SomeButton extends React.Component{
    render(){
        return(
            <View>
                <Text>
                    {this.props.title}
                </Text>
                <Icon name="google"/>
            </View>
        )
    }
}