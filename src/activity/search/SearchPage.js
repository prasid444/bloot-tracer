import React from 'react';
import { View, Text, StatusBar, StyleSheet,SafeAreaView ,Keyboard} from 'react-native';
import { Searchbar, List } from 'react-native-paper';
import UserListView from '../../ui/UserListView';
import SearchedUserScreen from './SearchedUserScreen';
import RecentUserScreen from './RecentUserScreen';
import { BGroup } from '../../util/Constants';


export default class SearchPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            recentUser:null,
            searchedUser:null,
            isRecentLoaded:false,
            isQuerying:false,
            queryText:"",
            bloodFilter:BGroup.ALL,


        }
        this.handleBloodGroupChange=this.handleBloodGroupChange.bind(this);
    }
    static navigationOptions = {
        header:null
    
    }
      
    handleQueryChange(query){
        if(query===""){
            this.setState({isQuerying:false,queryText:""})

        }
        else{
            this.getQueriedUser(query)
            this.setState({isQuerying:true,queryText:query})
        }
    }
    handleBloodGroupChange(group){
        console.log(group);
        var context=this;
        if(group===""){
            context.setState({
                bloodFilter:BGroup.ALL
            })
        }
        else{
            context.setState({
                bloodFilter:group
            })
        }
    }
    render(){
        const{isQuerying,recentUser,searchedUser,bloodFilter}=this.state;
        console.log(typeof this.state.bloodFilter)
        var extdata=this.state.isSearchFocused?{
            icon:"arrow-back",
            onIconPress:()=>{
                this.setState({isSearchFocused:false,isQuerying:false,queryText:""});
                Keyboard.dismiss();
                
            }
        }:{
            
        }
        return (
            
            <SafeAreaView style={styles.container}>
                <Searchbar
                autoFocus={false}
                
                onChangeText={(e)=>this.handleQueryChange(e)}
               
                onFocus={()=>{
                   this.setState({isSearchFocused:true})

                }}
                {...extdata}
                value={this.state.queryText}
                />
                {isQuerying?
                <SearchedUserScreen
                data={searchedUser}
                filterGroup={this.state.bloodFilter}
                onBloodGroupChange={this.handleBloodGroupChange}
                />
                :
                <RecentUserScreen
                data={recentUser}
                />
                }
             
            </SafeAreaView>
        )
    }

    getRecentUser(){
        var context=this;
        fetch("http://workonclick.com/api/alllabors")
            .then(function(response){
                return response.json()
            }).then(function(data){
                console.log(data);
                context.setState({
                    recentUser:data,
                    isRecentLoaded:true,
                })
            })
            .catch(function(error){
                console.log(error)
            })

    }
    getQueriedUser(query){
        var context=this;
        console.log("getting for",query)
    }
    componentDidMount(){
        this.getRecentUser()
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
    }
})