import React from 'react';
import {View,Text,RefreshControl} from 'react-native';
import { Button,Snackbar, Appbar } from 'react-native-paper';
import Firebase from '../../util/firebase';
import { writeNewFirebaseData, readFirebaseData } from '../../util/FirebaseHandler';
import { ScrollView } from 'react-native-gesture-handler';
import UserListView from '../../ui/UserListView';
import { colors } from '../../util/Constants';


export default class ProfilePage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:{},
            refreshing:false,
            data:{

            },
            snackVisible:false
        }
        this._onRefresh=this._onRefresh.bind(this);
        console.ignoredYellowBox = [
            'Setting a timer'
            ];
    }
    static navigationOptions = {
        header:null
    
    }
    context=this;

    _onRefresh(){
        var context=this;
        this.setState({refreshing:true})
        console.log("Got here")
       readFirebaseData("users").then((val)=>{
        // console.log(val)
        context.setState({
            data:val,
            refreshing:false
        })
        console.log("Got the data")

       }).catch((e)=>{
           console.log(e)
           context.setState({
                refreshing:false,
                snackVisible:true,
           })


       })
    }
    
    render(){
        return (<View style={{flex:1}}>
            <Appbar.Header dark style={{backgroundColor:colors.PROFILE}}>
                    <Appbar.Content
                        title="Profile"
                    //   subtitle="Subtitle"
                    />
                    {/* <Appbar.Action icon="search"  /> */}
                    {/* <Appbar.Action icon="more-vert"  /> */}
                    </Appbar.Header>
            <ScrollView
            refreshControl={
                <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
            }
            >
                <Text>
                    Profile Page 
                </Text>
                <Text>Hello: {this.state.user.displayName||""}</Text>
                <Button
                mode="contained"
                onPress={()=>{
                    this.logOutUser(this)
                }}
                 >
                Log Out
                </Button>
                <Button mode="outlined"
                onPress={()=>{
                    this.props.navigation.navigate("EditProfileScreen")
                }}
                >
                    Edit Profile
                </Button>
                <Button
                  mode="contained"
                  onPress={()=>{
                      var i=Math.random();
                      var j=Math.random();
                      writeNewFirebaseData("users",{name:"Prasid"+i,address:"Sanepa"+j})
                  }}
                  >Post Data</Button>

                  {this.state.data && Object.keys(this.state.data).map((key)=>{
                      var data=this.state.data[key];
                      return <UserListView 
                            title={data.name}
                            description={data.address}
                      />
                  })}
                 
            </ScrollView>
            <Snackbar
                    visible={this.state.snackVisible}
                    onDismiss={() => this.setState({ snackVisible: false })}
                    action={{
                            label: 'Refresh',
                            onPress: () => {
                             // Do something
                             this._onRefresh()
                             },
                        }}
        >Could not load new data
        </Snackbar>
            </View>
        )
    }

    componentWillMount(){
        this.getUserData();
        this.unsubscribeLoadingData=this._onRefresh();
    }
    componentWillUnmount(){
        try{
        this.unsubscribeFirebase();
        this.unsubscribeLoadingData();
        }catch(e){
            console.log(e);
        }
    }
    getUserData(){
        console.log("Got here")
        var context=this;
        this.unsubscribeFirebase=Firebase.auth().onAuthStateChanged(function(user){
            if(user){
                console.log(user);
                context.setState({
                    user:user
                })
            }else{
                console.log("User not found")
            }
        });
    }
    logOutUser(context){
        console.log("Got to logout")
        //context.props.navigation.navigate("LoggedOut");
        Firebase.auth().signOut().then(function() {
            context.props.navigation.navigate("LoggedOut")
          }, function(error) {
            // An error happened.
          });
    }
}