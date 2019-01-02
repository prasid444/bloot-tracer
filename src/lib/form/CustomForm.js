import React from 'react';
import {View, Text} from 'react-native';
import CustomInput from './CustomInput';
import {Button} from 'react-native-paper';
import { FormValidator } from './FormValidator';
import { postFormData } from '../../util/Constants';

export default class CustomForm extends React.Component {
    constructor(props) {
        super(props)

        this.inputData=this.props.data||{};

        var stateValue;
        for(let key of Object.keys(this.inputData)){
            
            stateValue=Object.assign({},stateValue,{
                [key]:{
                    value: '',
                    isValid:(!(this.inputData[key]['validations']['required']===true)),
                    errorMessage:''
                }
            })
            }
        this.state = {
            input:stateValue,
            data: {},
            isValid:false,


        }

 
        this.validate=this.validate.bind(this);
        this.formValidate=this.formValidate.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
  
    render() {
        console.log(this.state.input)
        return (
            <View>
                {
                    Object.keys(this.state.input).map((key)=>{
                        console.log(key)
                        var item=this.state.input[key];
                        return <CustomInput 
                        displayName={this.inputData[key].displayName}
                        value={item.value}
                        keyName={key}
                        noOfLines={this.inputData[key].multiline}
                        optionText={this.inputData[key].optionText}
                        type={this.inputData[key].type}
                        options={this.inputData[key].options}
                        isSecure={this.inputData[key].isSecure}
                        checkLabel={this.inputData[key].checkLabel}
                        errorMessage={item.errorMessage}
                        onChangeValue={this.handleChange}
                        onFinishEditing={this.validate}
                        
                        />
                    })
                }

                <Button mode="contained" disabled={!this.state.isValid} onPress={this.handleSubmit}>Submit
                </Button>
                <Text>{JSON.stringify(this.state.data)}</Text>
            </View>
        )
    }

    validate(name){
        var errors=FormValidator(this.inputData[name]['validations'],this.state.input[name].value);
        console.log(errors);
        var errorMessage='';
        var newState=Object.assign({},this.state.input);
        newState[name].errorMessage=errorMessage;
        if(errors.length){
            
            for(let error of errors){
                try{
                errorMessage+=error+' error: '+this.inputData[name]['errorMessages'][error]+'\n';
                }
                catch(e){
                    errorMessage+=error+' error: ';
                }
            }
            newState[name].errorMessage=errorMessage;
            newState[name].isValid=false;
        }
        else{
            
            newState[name].isValid=true;
        }
        console.log("NEW STATE IS: ",newState);
        
        this.setState({input:newState});

        this.setState({isValid:this.formValidate()});
    }

    formValidate(){
        // console.log(Object.keys(this.state.input));
        for(let key of Object.keys(this.state.input)){
            if(this.state.input[key].isValid===false)
                return false;
        }
        return true;
    }

  
    handleChange(name,value,checked=undefined){
        console.log('handle change: '+name+','+value+','+checked);
        
        var newState=Object.assign({},this.state.input);
        newState[name].value=(checked===undefined)?value:checked;

        this.setState({input:newState});

    }
    handleSubmit(){
        var newdata={};
        console.log(this.state.input)
        for(let key of Object.keys(this.state.input)){

        newdata[key]=this.state.input[key].value
                
            
        
        this.setState({data:newdata})
    }
}
}