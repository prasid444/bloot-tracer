import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { deleteData,retrieveData } from '../../util/PreferenceManager';
import { withNavigation } from 'react-navigation';
import Firebase from '../../util/firebase';
import UserListView from '../../ui/UserListView';
import { Button } from 'react-native-paper';
import { writeNewFirebaseData } from '../../util/FirebaseHandler';
import UserDetailView from '../../ui/UserDetailView';
import { UserListViewLoader } from '../../ui/LoadingScreens';


class HomePage extends React.Component{
        constructor(props){
            super(props)
            this.state={
                user:{},
                newdata:{
                },
            }
        }

        render(){
           
          

            return(
                <View style={styles.container}>
                  <Text>Home Pagadsae</Text>
                  <UserListView
                  title="Prasidha Karki"
                  description="Sanepa,Lalitpur"
                  imageUrl="www.facevooks.ads"
                  />
                  <UserDetailView/>
                  <UserListViewLoader/>
                <Text>asd</Text>
                  <Text>adsaa</Text>
              
                </View>
            )
        }
        sendVerification(){
            var currentuser=Firebase.auth().currentUser;
            if(currentuser!=null){
            currentuser.sendEmailVerification().then(function() {
                // Email sent.
                alert("Email send Successfully")
              }).catch(function(error) {
                // An error happened.
                alert(error)
              });
            }
            else{
                alert("No user to send verification")
            }
        }
        updateuser(){
            var currentuser=Firebase.auth().currentUser;
            var context=this;
            if(currentuser!=null){
                console.log(this.state.newdata)
            currentuser.updateProfile({
                ...this.state.newdata,
            }).then(function(){
                alert("Profile updated")
                context.getUser()
            })
            .catch(function(error){
                alert(error)
            });
        }
        else{
            alert("No any user to update")
        }
        }
        handleCustomChange(event){
            console.log(event)
           
        }

        getUserData(){
            console.log("here i am");
            var context=this;
            
        }
        // componentDidMount(){
        //     var context=this;
        //     this.getUser();
         
        // }
        componentWillMount(){
            //this.getUser()
            this.getUserData();
        }
        
        getUser() {

            var context=this;
            // this.unsubscribe1=Firebase.auth().onAuthStateChanged(function(user) {
            //     if (user) {
            //       // User is signed in.
            //       console.log(user)
            //         context.setState({
            //             user:user
            //         })
            //     } else {
            //       // No user is signed in.
            //       console.log("No siggend is")
            //       this.props.navigation.navigate("LoggedOut")
                  
            //     }
            //   });

          
    }
        componentWillUnmount(){
                // this.unsubscribe1();
        }
}

export default (HomePage);
const styles=StyleSheet.create({
    container:{
        flex:1,
    }
})