import React from 'react';
import * as Progress from 'react-native-progress';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {View, Text} from 'react-native';
import Image from 'react-native-image-progress';
export default class UserListView extends React.Component{

    render(){
      
        // const UserImage=createImageProgress(Thumbnail)
       
        return <List.Item
        title={this._renderTitle()}
        left={()=>this._renderListImage()}
        description={this._renderIconWithDescription()}
        onPress={this.props.onClick }

        />
    }
    _renderTitle(){
        return <React.Fragment>
            <Text></Text>
            <Text style={{
                paddingTop:10,
                fontSize:20
            }}>{this.props.title||"..."}</Text>
        </React.Fragment>
    }
    _renderListImage(){

        return <React.Fragment>
            <Image 
            style={{
                width: 50, 
                height: 50,
                borderRadius: 25,
                overflow:'hidden',
                marginTop:10
            }}
            indicator={Progress.Circle}
            indicatorProps={{
                size:48,
                borderWidth: 0,
                color: 'rgba(150, 150, 150, 1)',
                unfilledColor: 'rgba(200, 200, 200, 0.2)'
            }}
            source={{uri:this.props.imageUrl}}
            />
        </React.Fragment>
    }
    _renderIconWithDescription(){
        return <React.Fragment>
            
            {/* <Icon name='map-marker-alt' /> */}
            {this.props.icon}
            <Text> {(this.props.description||"...")+"\n"}</Text>
           
            
            </React.Fragment>
        // <Text>TTTTTT@TTT.com</Text>
     
     
    }
}