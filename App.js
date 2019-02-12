/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import AppNavigator from './src/navigation/AppNavigatior';
import {retrieveData} from './src/util/PreferenceManager';
import { createRootNavigator } from './src/navigation/AppNavigatior';
import Firebase from './src/util/firebase';
import MainLoading from './src/ui/MainLoading';
import NoConnection from './src/ui/NoConnection';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' +
            'u'
});

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            isLoading: true,
            isLoggingIn: false,
          
        }
    }
    render() {

        if(this.state.isLoading){
            return <View style={styles.container}>
                    {/* <ActivityIndicator/> */}
                    <MainLoading/>            
                </View>
        }
        else if(!this.state.isLoading){
            const Layout=createRootNavigator(this.state.isLoggedIn)
            console.log(this.state.isLoggedIn)
            return <Layout/>
        }
       
    }
    reload(){
        console.log("reload called")
        console.log(this);
        //return <App/>
        this.checkUserStatus();
    }

    checkUserStatus() {
        console.log("retriving data")
        var context=this;
        context.setState({
            isLoading:true,
            isLoggedIn:false
        })
        this.unsubscribeFirebase=Firebase.auth().onAuthStateChanged(function(user){

            if(user){
                console.log("USER ",user)
                context.setState({
                    isLoading:false,
                    isLoggedIn:true
                  })
            }else{
                console.log("User not Signed in")
                context.setState({
                    isLoading:false,
                   isLoggedIn:false
                 })
            }
        });
      
    }

    componentWillMount(){
      this.checkUserStatus()
    }
    componentWillUnmount(){
        this.unsubscribeFirebase();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#ada'
    }
});
