import React from 'react';
import { Portal, Button ,Dialog, RadioButton} from 'react-native-paper';
import { View ,Text} from 'react-native';
import { BGroup } from '../util/Constants';

export default class BloodSelectionDialog extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:this.props.initialValue
        }
    }
    render(){
        // console.log(this.state)
        return(
            <Portal>
                <Dialog
                visible={this.props.visibility} 
                onDismiss={this.props.onToggle}               
                >
                    <Dialog.Title>
                        Select Blood Group
                    </Dialog.Title>
                    <Dialog.Content>
                        <RadioButton.Group
                        onValueChange={(value)=>{
                            this.setState({value})
                        }}
                        value={this.state.value}
                        >
                        {this._renderBloodGroupOptions()}

                        </RadioButton.Group>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={()=>this.props.onToggle()}>Cancel</Button>
                        <Button onPress={()=>{
                            this.props.handleSubmission(this.state.value)
                            this.props.onToggle();

                        }
                        }>Submit</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            
        )
    }

    _renderBloodGroupOptions(){
        return(
            Object.keys(BGroup).map((key)=>{
                return (
                    <View style={{
                        flexDirection:'column',
                        justifyContent:'center'
                    }}>
                    <View style={{flexDirection:'row'}}>
                        <RadioButton value={BGroup[key]}/>
                        <Text style={{textAlignVertical:'center'}}>
                            {key}
                        </Text>
                    </View>
                       
                    </View>
                )
            })
        )
    }
}