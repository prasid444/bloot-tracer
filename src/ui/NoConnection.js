import React from 'react';
import { Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
export default class NoConnection extends React.Component{

    render(){
        return(
            <View style={styles.container}>
                <Text>
                    No Internet Connection
                </Text>
                
                <Button
                mode='contained'
                onPress={()=>this.props.reload()}
                >
                    Retry
                </Button>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    }
})