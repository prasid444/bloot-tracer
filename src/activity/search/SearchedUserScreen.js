import React from 'react';
import {View,Text} from 'react-native';
import { Chip, Portal, Dialog, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BGroup } from '../../util/Constants';
import BloodSelectionDialog from '../../ui/BloodSelectionDialog';


export default class SearchedUserScreen extends React.Component{

    
    constructor(props){
        super(props)
        this.state={
            bloodSelectionDialogVisibility:false,

        }
        this.toggleBloodSelectionDialog=this.toggleBloodSelectionDialog.bind(this);
    }

    toggleBloodSelectionDialog(){
        this.setState({
            bloodSelectionDialogVisibility:!this.state.bloodSelectionDialogVisibility
        })
        console.log(this.state.bloodSelectionDialogVisibility)
    }
    render(){
        var data=this.props.data;
        var filterGroup=this.props.filterGroup;
        console.log(this.props)
        return(
            <View>
                <View style={{
                    flexDirection:'column',
                    justifyContent:'center'
                }}>
                <View style={{
                    flexDirection:'row',
                    // justifyContent: 'center',
                    
                }}>
                <Text style={{textAlignVertical:'center'}}>Blood Group:</Text>
                <Chip
                icon={()=><Icon name="chevron-down"></Icon>}
                onPress={()=>{this.toggleBloodSelectionDialog()}}
                >{filterGroup}</Chip>
                </View>
               

                </View>
                <Chip 
                mode="flat"
                disabled
                style={{
                    width:100
                }}
                >
                    Result(s)
                </Chip>
                {/* <Button onPress={()=>{this.toggleBloodSelectionDialog()}}>asd</Button> */}
                <BloodSelectionDialog
                visibility={this.state.bloodSelectionDialogVisibility}
                onToggle={this.toggleBloodSelectionDialog}
                handleSubmission={this.props.onBloodGroupChange}
                initialValue={filterGroup}
                />
                {/* <Portal>
                    <Dialog
                    visible={this.state.bloodSelectionDialogVisibility}
                    onDismiss={this.toggleBloodSelectionDialog}
                    >
                        <Dialog.Title>Select Blood Group</Dialog.Title>
                        <Dialog.Content>
                            <Text>Hy this is content</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={this.toggleBloodSelectionDialog}>Done</Button>
                        </Dialog.Actions>

                    </Dialog>
                </Portal> */}
                
                <Text>{JSON.stringify(data)}</Text>
            </View>
        )
    }
}
