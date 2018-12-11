import React from 'react';
import ReactNativeComponentTree, {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    Platform,
    SafeAreaView,
    Image
} from 'react-native';
import Firebase from '../../util/firebase';
import {storeData, retriveData} from '../../util/PreferenceManager';
import {Button, TouchableRipple, Divider, TextInput} from 'react-native-paper';
// import {TouchableRipple} from 'react-native-paper';
import logo from '../../../assets/logo.png';
import {ScrollView} from 'react-native-gesture-handler';
import SocialLoginButton  from '../../ui/SocialLoginButton';


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            signingIn: false
        }
        this.loginWithEmaiPassword = this
            .loginWithEmaiPassword
            .bind(this);
    }

    _renderErrorMessage(errormsg) {
        return (
            <Text style={{color:'red'}}>
                {errormsg}
            </Text>
        )
    }
    _renderDivider() {
        return (
            <View
                style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Divider
                    style={{
                    margin: 6,
                    width: 150,
                    backgroundColor: 'grey'
                }}/>
                <Text style={{
                    color: 'grey'
                }}>OR</Text>
                <Divider
                    style={{
                    margin: 6,
                    width: 150,
                    backgroundColor: 'grey'
                }}/>
            </View>
        )
    }
    render() {

        return (
            <SafeAreaView
                style={{
                flex: 1,
                backgroundColor: '#ada'
            }}>
                <ScrollView>

                    <View
                        style={{
                        flexDirection: 'column',
                        backgroundColor: '#ada'
                    }}>

                        <View
                            style={{
                            height: 200,
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <View
                                style={{
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <Image source={logo} style={styles.logoIcon}/>
                            </View>

                        </View>
                        <SocialLoginButton icon="facebook-f" bgcolor="#3b5999" title="Sign in with Facebook"/>
                        <SocialLoginButton icon="google" bgcolor="#dd4b39" title="Sign in with Google"/> 
                        {this._renderDivider()}
                        <View
                            style={{
                            marginLeft: 30,
                            marginRight: 30,
                            padding: 2,
                            shadowRadius: 10
                        }}>

                            <TextInput
                                mode='outlined'
                                placeholder="example@email.com"
                                onChangeText={(text) => this.setState({email: text, emailerror: ""})}
                                value={this.state.email}
                                label="Email Address"/> 
                                {this._renderErrorMessage(this.state.emailerror)}

                            <TextInput
                                mode='outlined'
                                onChangeText={(text) => this.setState({password: text, passworderror: ""})}
                                value={this.state.password}
                                secureTextEntry
                                placeholder="Password"
                                label="Password"/> 
                                {this._renderErrorMessage(this.state.passworderror)}
                            
                            <TouchableRipple
                            
                            rippleColor="#ff0000"
                            style={{
                                zIndex:1000
                            }}
                             onPress={() => {
                                this.setState({signingIn: true})
                                this.loginWithEmaiPassword()
                            }}
                            >
                            <Button
                                loading={this.state.signingIn}
                                mode="contained"
                               
                               >Sign in
                            </Button>
                            </TouchableRipple>
                            
                             

                            <View style={styles.signupContainer}>

                                <Text>Haven't registered yet?</Text>
                                <Text
                                    style={{
                                    color: 'blue'
                                }}
                                    onPress={() => this.props.navigation.navigate('Signup')}
                                    > Sign up</Text>
                            </View>
                        </View>

                        <Text>error: {JSON.stringify(this.state.errorMessage)}</Text>

                    </View>
                </ScrollView>
            </SafeAreaView>

        ) 
    }

         handleChange(event) {
             console.log(event.target)
            
        }
           
        loginWithEmaiPassword() {
            console.log(Firebase);
            var context = this;
            this.setState({emailerror: null, passworderror: null});
            if (this.state.email === undefined || this.state.email.length === 0) {
                console.log("no email");
                this.setState({emailerror: "Email Field is required", signingIn: false});
                return
            }
            if (this.state.password === undefined || this.state.password.length === 0) {
                console.log("no password");

                this.setState({passworderror: "Password Field is required", signingIn: false});
                return
            }
            Firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((user) => {
                    console.log(user)
                    storeData("user", user).then(() => {
                        this
                            .props
                            .navigation
                            .navigate('LoggedIn', {"user": user})
                    }).catch((error) => {
                        alert(error)
                    })

                })
                .catch(error => {
                    this.setState({errorMessage: error.message, signingIn: false})
                    alert(error.message)
                });
    }

}
        
            
            
const styles = StyleSheet.create({container : {
                flex: 1,
                backgroundColor: '#ada'
            },
            loginButton : {
                marginTop: 10
            },
            signupContainer : {
                marginTop: 10,
                flexDirection: 'row',
                alignSelf: 'center'
            },
            logoIcon : {
                height: 100,
                width: 100
            }
});