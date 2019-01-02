import React from 'react';
import { View, Text, StyleSheet ,ScrollView} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import CustomForm from '../../lib/form/CustomForm';
import { postFormData } from '../../util/Constants';



export default class AddPostScreen extends React.Component{


    render(){

        return(
            <View style={styles.container}>
                <ScrollView style={styles.formcontainer}>
                    
                <CustomForm data={postFormData}/>
                </ScrollView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ddd'
    },
    formcontainer:{
        marginRight:16,
        marginLeft: 16,
        marginTop: 8,
        marginBottom: 4,
        flex:1,
        flexDirection: 'column',
        padding: 8,
        backgroundColor:'white'
    },
    btnSubmit:{
        margin:8
    }
})