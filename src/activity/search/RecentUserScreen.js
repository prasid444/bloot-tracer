import React from 'react';
import {View,Text} from 'react-native';
import UserListView from '../../ui/UserListView';
import { ScrollView } from 'react-native-gesture-handler';
import { UserListViewLoader } from '../../ui/LoadingScreens';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import Sugar from 'sugar';
// Sugar.extend();

var moment = require('moment');
moment().format();

export default class RecentUserScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        var data=this.props.data;
        return(
            <ScrollView>
                <Text>Recent User</Text>
                {this.props.data===null?
                <React.Fragment>
                <UserListViewLoader/>
                <UserListViewLoader/>
                <UserListViewLoader/>
                <UserListViewLoader/>
                <UserListViewLoader/>
                <UserListViewLoader/>
                </React.Fragment>
                :
                this.props.data.map((user)=>{
                    return <UserListView
                        title={user.labor_name}
                        description={moment(user.created_at).fromNow()}
                        imageUrl={"http://workonclick.com/images/"+user.image_url}
                        onClick={()=>alert(user.labor_name)}
                        icon={<Icon name="clock"/>}
                    />
                })
                }
            </ScrollView>
        )
    }
}