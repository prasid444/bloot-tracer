import React from 'react';
import { View, Text, Picker, Image } from 'react-native';
import {TextInput, Checkbox, TouchableRipple,DefaultTheme, Button} from 'react-native-paper';
import ImagePicker  from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default class CustomInput extends React.Component {

    render() {
        var extraPropsOnType = null;
        switch (this.props.type) {
            case 'CheckBox':
                extraPropsOnType = {
                    render: (props) => {
                        return <View
                            style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}><Checkbox status={this.props.value?'checked':'unchecked'}  
                        onPress={() => {
                            this.props.onChangeValue(this.props.keyName,!this.props.value,!this.props.value);
                            this.props.onFinishEditing(this.props.keyName);
                        }}

                        />
                            <Text>{this.props.checkLabel}</Text>
                        </View>
                    },
                    theme:{ colors: { placeholder: 'transparent'}}

                }
                break;
            case 'Options':
                extraPropsOnType={
                    render:(props)=>{
                        return <View>
                        <Picker 
                        prompt={this.props.displayName}
                        
                        selectedValue={this.props.value}
                        onValueChange={(itemValue, itemIndex) => {
                            this.props.onChangeValue(this.props.keyName,itemValue);
                            this.props.onFinishEditing(this.props.keyName);
                            }}>
                            <Picker.Item label={this.props.optionText||"--Select--"} value=""/>
                        {this.props.options&&this.props.options.map((item)=>{
                            return <Picker.Item label={item.value} value={item.key} />

                        })}
                      </Picker>
                      </View>
                    },
                    theme:{ colors: { placeholder: 'transparent'}}


                }

            break;
            case 'Image':
                extraPropsOnType={
                    render:(props)=>{
                        return <View style={{
                            width:'100%',
                            flexDirection:'row',
                            justifyContent:'center'
                        }}>
                            <View style={{
                                flexDirection:'column',
                                
                            }}>
                           
                            <TouchableRipple
                            borderless
                                style={{
                                    height:100,
                                    width:100,
                                    borderRadius:50,
                                    backgroundColor:'#ddd'
                                }}
                                onPress={()=>{
                                    ImagePicker.openPicker({
                                        width: 300,
                                        height: 400,
                                        cropping: true,
                                        includeBase64:true
                                      }).then(image => {
                                        // image.path=image.path.replace("file://", "");
                                        console.log(image);
                                        var formatedimage={};
                                        formatedimage.uri=image.path;
                                        formatedimage.type=image.mime;
                                        formatedimage.name="image.jpg";
                                        this.props.onChangeValue(this.props.keyName,formatedimage);
                                        this.props.onFinishEditing(this.props.keyName);
                                      }).catch((e)=>{
                                          console.log("IMAGE PICKER ERROR",e)
                                      });
                                }}
                            >
                            <React.Fragment>

                           
                            <Image 
                                style={{
                                    height:100,
                                    width:100,
                                    borderRadius:50,
                                }}
                                source={{uri:this.props.value.uri||".."}}
                            />
                            {!this.props.value.uri&&
                            <Icon name="cloud-upload-alt" size={30} style={{
                                position:'absolute',
                                left:35,
                                top:35,
                                opacity:0.1

                            }}/>
                            }
                             {this.props.value.uri&&
                            <Icon name="edit" size={30} style={{
                                position:'absolute',
                                left:35,
                                color:'grey',
                                top:35,
                                opacity:1

                            }}/>
                            }
                             </React.Fragment>
                            </TouchableRipple>
                            {this.props.value.uri&&
                            <Button mode="text" onPress={()=>{
                                 this.props.onChangeValue(this.props.keyName,{});
                                 this.props.onFinishEditing(this.props.keyName);
                            }}>Remove</Button>
                        }
                             </View>
                        </View>
                    },
                    theme:{ colors: { placeholder: 'transparent'}}

                }
            break;
            default:

                break;
        }

        return (
            <View>
                <TextInput
                    mode="outlined"
                    underlineColor="red"
                    underlineColorAndroid={'rgba(0,0,0,0)'}
                    numberOfLines={this.props.noOfLines||1}
                    secureTextEntry={this.props.isSecure}
                    
                    placeholder={this.props.displayName || ""}
                    onBlur={() => {
                    console.log("blurred")
                    this
                        .props
                        .onFinishEditing(this.props.keyName)
                }}
                    { ...extraPropsOnType }
                    onChangeText={(text) => {
                    this
                        .props
                        .onChangeValue(this.props.keyName, text)
                }}/>
                <Text style={{
                    color: 'red'
                }}>{this.props.errorMessage || ""}</Text>
            </View>
        )
    }
}