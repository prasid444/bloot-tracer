import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostListView from '../../ui/PostListView';
import Communications from 'react-native-communications';

export default class PostsPage extends React.Component{

    render(){
        return (
            <View style={styles.container}>
               
                <PostListView
                onCall={this.onCall}
                onMessage={this.onMessage}
                name="Prasidha Karki"
                distance="2 km"
                address="Sanepa, Lalitpur"
                date="12-12-2018"
                bgroup="B-"
                bamount="2 pint"
                comment="Patient ofasdas;ldjkm a;lksmd alkdm as;ldk msl;m dlkajsd ;alksdjal;k d;alkdma ;lskdm as;ldka sdlkanmdlakm damnsdl;kam sdlak sd;alksdma;lskd aldkma; ldkms accicdent , Need blood real soon "
                number="9860167527"

                />
            </View>
        )
    }
    onCall(number){
        console.log("Calling "+number)
        Communications.phonecall(number,true)
    }
    onMessage(number,text){
        console.log("Messaging "+number)
        Communications.text(number,text)

    }

}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ddd',
        flex:1
    }
})