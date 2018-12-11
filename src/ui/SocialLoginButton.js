import React from 'react';
import {View,Text} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Icon  from 'react-native-vector-icons/FontAwesome5';
export default class SocialLoginButton extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
    return (<TouchableRipple
        borderless={false}
        onPress={() => {
        console.log("Pressed")
    }}
        style={{
        flexDirection: 'row',
        backgroundColor:this.props.bgcolor,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        height: 50,
        borderRadius: 30
    }}>
        <React.Fragment>
            <Icon
                name={this.props.icon}
                style={{
                color: 'white',
                marginLeft: 30,
                marginTop: 11,
                fontSize:24,
                height: 30,
                width: 30
            }}/>
            <Text
                allowFontScaling
                style={{
                color: 'white',
                fontSize: 20,
                marginTop: 12,
                marginLeft: 20
            }}>{this.props.title}</Text>
        </React.Fragment>

    </TouchableRipple>)

        }
}