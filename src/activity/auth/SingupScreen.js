import React from 'react';
import {
    View,
    Text,
    StyleSheet,
   
    AsyncStorage,
    Image,
    Picker,
    PermissionsAndroid,
    Keyboard
} from 'react-native';
import Firebase from '../../util/firebase';
import {storeData, retrieveData} from '../../util/PreferenceManager';
import { TextInput, TouchableRipple, Button } from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dropdown} from 'react-native-material-dropdown';

import { nullUser, GenderData, BGroupData } from '../../util/Constants';

export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signupData:{
                user_name:"Prasidha Karki",
                user_email:"prasidkarki95@gmail.com",
                user_password:"password",
                confirm_password:"password",
                gender:"M",
                address:"Sanepa",
                location:{
                    latitude:27.54,
                    longitude:85.26
                },
                phone:9860167627,
                b_group:"B+",

            },
            cords: null,
            userimage: {
                data: null
            }
        }
        this.signInWithEmaiPassword = this
            .signInWithEmaiPassword
            .bind(this);
        this.pickUserImage = this
            .pickUserImage
            .bind(this);
        this.dismissUserImage = this
            .dismissUserImage
            .bind(this);
    }

    render() {

        return (
            <ScrollView style={styles.container}>
                <Text style={{
                    fontSize: 27,
                    alignSelf:'center'
                }}>
                    SignUp Form</Text>
                    
                <View style={styles.form_container}>
                    <TouchableRipple
                        style={styles.profile_pic}
                        onPress={() => {
                        this.pickUserImage();
                    }}>
                        <React.Fragment>
                        <Image
                            style={styles.profile_pic}
                            source={{
                            uri: "data:image/jpeg;base64," + (this.state.userimage.data||nullUser)
                        }}/>
                        {this.state.userimage.data?
                        <Icon name="trash" 
                        size={20}  
                        style={{position:'absolute',right:2,bottom:2,color:'#9f0000'}}
                        onPress={()=>this.dismissUserImage()}
                        />
                        :null
                        }
                        </React.Fragment>
                    </TouchableRipple>
                    <TextInput
                    mode='outlined'
                    label="Full Names"
                    placeholder="User Name"
                    />
                    <TextInput
                    mode='outlined'
                    label="Email"
                    placeholder="example@email.com"
                    />
                    
                    <TextInput
                    mode='outlined'
                    label="Password"
                    placeholder="password"
                    />
                    
                    <TextInput
                    mode='outlined'
                    label="Confirm Password"
                    placeholder="password"
                  
                    />
                    
                    <TextInput
                        mode='outlined'
                        
                        render={()=>{return <Dropdown
                            label="Gender"
                            data={GenderData}
                            value=""
                            containerStyle={{
                                marginLeft:10,
                                borderBottomWidth: 0,
                                
                            }}
                            />}
                        }
                        />
                         
                    <TextInput 
                    mode='outlined' 
                    label="D.O.B"
                    onFocus={()=>{
                        this.refs.dobpicker.onPressDate()
                    }}
                    clearTextOnFocus
                    value={this.state.date}
                    />
                    <TextInput
                    mode='outlined'
                    label="Address"
                    />
                    <View style={{flexDirection:'row',justifyContent:'space-between'}} >
                        <Text>Latitude:27.88211</Text>
                        <Text>Longitude:85.02222</Text>
                    </View>
                    <TextInput
                    mode='outlined'
                    label="Contact"
                    placeholder="+977"
                    />
                    <TextInput
                    mode='outlined'
                    render={()=>{
                        return <Dropdown
                        label="Blood Group"
                        data={BGroupData}
                        value=""
                        containerStyle={{
                            marginLeft:10,
                            borderBottomWidth: 0,
                            
                        }}
                        />
                    }}
                    />
                  {/* Datepicker modal for picking date */}
                    <DatePicker
                style={{
                    height:0,
                    width:0,
                }}
                
                mode="date"
                ref="dobpicker"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                    dateInput: {
                        width: 0,
                        height: 0,
                        borderWidth: 0
                      }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
                />
                    

                </View>

               
                <Button
                    style={styles.signupButton}
                    mode='contained'
                    onPress={() => {
                    this.signInWithEmaiPassword()
                }}>Signup</Button>
                <View style={styles.loginContainer}>

                <Text>Haven't registered yet?</Text>
                <Text
                    style={{
                    color: 'blue'
                }}
                    onPress={() => this.props.navigation.navigate('Login')}
                    > Login</Text>
                </View>
            </ScrollView>
        )
    }
    componentDidMount() {
        console.log("getting geolocation");
        // this.dismissUserImage();

        navigator.geolocation.getCurrentPosition(     
            (position)=>{
        console.log(position);       
        this.setState({
        latitude:position.coords.latitude,
        longitude:position.coords.longitude,           
        error:null       })
         },(error)=>{       
             console.log(error);       
            this.setState({
         error:error       })   
        },{       
             enableHighAccuracy: false,       
            timeout:20000,       
            maximumAge: 1000   })
    }

    pickUserImage() {
        var context = this;
        ImagePicker
            .openPicker({
            cropping: true, includeBase64: true,
            // includeExif:true
        })
            .then(image => {
                console.log(image);
                context.setState({userimage: image})
            })
            .catch(error => {
                console.log(error);

            })
    }
    dismissUserImage() {
        // var newuser = this.state.userimage;
        // newuser.data = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAAa0lEQVR42u3PMREAAAgEIL9/WwtoBHcP" +
        //         "GpCeeiEiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi" +
        //         "IiIiIiIiIiIiIiIiIiIiIiIiIiIiIpcFKjbCiZfrjTwAAAAASUVORK5CYII="
        this.setState({userimage: {}})
    }
    signInWithEmaiPassword() {
        this.setState({emailerror: null, passworderror: null})
        if (this.state.email === undefined || this.state.email.length === 0) {
            console.log("no email")
            this.setState({emailerror: "Email Field is required"})
            return
        }
        if (this.state.password === undefined || this.state.password.length === 0) {
            console.log("no password")

            this.setState({passworderror: "Password Field is required"})
            return
        }
        Firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                console.log(user)
                storeData("user", user).then(() => {
                    this
                        .props
                        .navigation
                        .navigate('LoggedIn', {"user": user})
                }).catch((error) => {
                    alert("There was some problem in device. Please try againg")
                })

            })
            .catch(error => {
                this.setState({errorMessage: error.message})
                alert(error.message)
            })
    }

    async getLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                'title': 'Cool Photo App Camera Permission',
                'message': 'Cool Photo App needs access to your camera so you can take awesome pictures.'
            })
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ada'
    },
    form_container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom:15,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    profile_pic: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 20,
        alignSelf: 'center'
    },
    loginContainer:{
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom:10
    },
    signupButton:{
        marginLeft:20,
        marginRight:20
    }
})