import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Title, IconButton, Chip } from 'react-native-paper';
import Sugar from 'sugar';
Sugar.extend();

export default class PostListView extends React.Component{

    render(){
        const message="Hello "+this.props.name+", I am ready to help you. Please call me."
        return(
            <View style={styles.container}>
                {this.props.emergency&&
                <Image 
                style={styles.urgenticon}
                source={require('../../assets/urgentribbon.png')}
                />}
                <View style={styles.child}>
                    <Title >Patient Name: </Title>
                    <Title>{this.props.name||"n/a"}{" "}</Title>
                    {this.props.distance&&<Chip  mode='outlined'>{this.props.distance||"n/a"}</Chip>}
                </View>
                <View style={[styles.child,styles.child2]}>
                <View style={styles.child4}>
                    <Text style={styles.hideExtra}>
                        <Icon name='map-marker-alt'/>
                       {"  "} {Sugar.String.truncate(this.props.address||"n/a",20)}
                       
                    </Text>
                    </View>
                    <View style={styles.child4}>
                    <Text style={styles.hideExtra}>
                        <Icon name='calendar-alt'/>
                       {" "}Before{" "}{this.props.date||"n/a"}
                    </Text>
                    </View>
                </View>
                <View style={[styles.child,styles.child2]}>
                <View style={styles.child4}>
                    <Text>
                        <Icon name='burn' color="red"/>
                        {"  "}{this.props.bgroup||"n/a"}
                    </Text>
                    </View>
                    <View style={styles.child4}>
                    <Text>
                        <Icon name='briefcase'/>
                        {"  "}{this.props.bamount||"n/a"}
                    </Text>
                    </View>
                </View>
                <View>
                    <Text>
                        {Sugar.String.truncate(this.props.comment||"...",150)}
                        
                    </Text>
                </View>
                {
                    this.props.number&&
                    <View style={[styles.child,styles.child3]}>
                    <IconButton icon='phone' size={20} color="green" onPress={()=>this.props.onCall(this.props.number)}/>
                    <IconButton icon='message' size={20} onPress={()=>{
                        this.props.onMessage(this.props.number,message)}

                        }/>
                </View>
                }
                
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        margin:5,
        padding:5,
        backgroundColor:'white',
        borderRadius: 5,
        shadowColor: '#000',
        elevation: 4,
    },
    child:{
        flexDirection:'row',
        
    },
    child2:{
        justifyContent:'space-evenly',

    },
    child3:{
        justifyContent:'flex-end'
    },
    child4:{
        flex:1,
    },
    hideExtra:{
        // overflow:'hidden'
    },
    urgenticon:{
        position:'absolute',
        height:40,
        width:40,
        right: 0,
    }

})