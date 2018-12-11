import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    AsyncStorage,
    Image,
    Picker,
    PermissionsAndroid,
    Keyboard
} from 'react-native';
import Firebase from '../../util/firebase';
import {storeData, retrieveData} from '../../util/PreferenceManager';
import {TextInput, TouchableRipple} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-datepicker';
export default class SignupScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
                    fontSize: 27
                }}>
                    SignUp</Text>
                <View style={styles.form_container}>
                    <TouchableRipple
                        style={styles.profile_pic}
                        onPress={() => {
                        this.pickUserImage();
                    }}>
                        <Image
                            style={styles.profile_pic}
                            source={{
                            uri: "data:image/jpeg;base64," + this.state.userimage.data
                        }}/>
                    </TouchableRipple>
                    <TextInput
                    mode='outlined'
                    label="Full Name"
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
                        render={() =>< Picker selectedValue = {this.state.language}
                    onValueChange = {
                        (itemValue, itemIndex) => this.setState({language: itemValue})
                    } > 
                    <Picker.Item label="Javaa" value="java"/> 
                    < Picker.Item label = "JavaScript" value = "js" /> 
                    </Picker>}/>
                    <TextInput
                        mode='outlined'
                        placeholder="FullName1"
                        onChangeText={(text) => this.setState({email1: text, emailerror: ""})}
                        value={this.state.email1}
                        label="Namekma"
                        onFocus={() => console.log("Hello i am focused")}/>
                    <TextInput 
                    mode='outlined' 
                    label="D.O.B"
                    onFocus={()=>{
                        this.refs.dobpicker.onPressDate()
                    }}
                    clearTextOnFocus
                    value={this.state.date}
                    />
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
                    <TextInput
                        mode='outlined'
                        placeholder="FullName3"
                        onChangeText={(text) => {
                        this.setState({email3: text, emailerror: ""})
                    }}
                        value={this.state.email3}
                        label="Namekm3"/>
                    <TextInput
                        mode='outlined'
                        placeholder="FullName4"
                        onChangeText={(text) => this.setState({email4: text, emailerror: ""})}
                        value={this.state.email4}
                        label="Namekm4"/>
                    <View>
                        <Text>Latitude:{JSON.stringify(this.state.latitude)}</Text>
                        <Text>Longitude:{this.state.longitude}</Text>
                        <Text
                            style={{
                            color: 'red'
                        }}>{JSON.stringify(this.state.error)}</Text>

                    </View>

                </View>

                <TextInput
                    value={this.state.email}
                    placeholder="Email"
                    onChangeText={(v) => {
                    console.log(v);
                    this.setState({email: v})
                }}/>
                <Text style={{
                    color: 'red'
                }}>{this.state.emailerror}</Text>
                <TextInput
                    value={this.state.password}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(v) => {
                    console.log(v);
                    this.setState({password: v})
                }}/>
                <Text style={{
                    color: 'red'
                }}>{this.state.passworderror}</Text>
                <Button
                    title="Signup"
                    onPress={() => {
                    this.signInWithEmaiPassword()
                }}/>
                <Button
                    title="Login"
                    onPress={() => {
                    console.log("Login pressed");
                    this
                        .props
                        .navigation
                        .navigate('Login')
                }}/>
                <Text>{this.state.errorMessage}</Text>
            </ScrollView>
        )
    }
    componentDidMount() {
        console.log("getting geolocation");
        this.dismissUserImage();

        // navigator.geolocation.getCurrentPosition(     (position)=>{
        // console.log(position);       this.setState({
        // latitude:position.coords.latitude,
        // longitude:position.coords.longitude,           error:null       })
        // },(error)=>{       console.log(error);       this.setState({
        // error:error       })   },{       enableHighAccuracy: false,       timeout:
        // 20000,       // maximumAge: 1000   })
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
        var newuser = this.state.userimage;
        newuser.data = "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAQAAADa613fAAAAa0lEQVR42u3PMREAAAgEIL9/WwtoBHcP" +
                "GpCeeiEiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi" +
                "IiIiIiIiIiIiIiIiIiIiIiIiIiIiIpcFKjbCiZfrjTwAAAAASUVORK5CYII="
        this.setState({userimage: newuser})
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
        marginLeft: 40,
        marginRight: 40,
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    profile_pic: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 20,
        alignSelf: 'center'
    }
})