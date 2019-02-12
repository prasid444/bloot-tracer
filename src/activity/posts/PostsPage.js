import React from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import PostListView from '../../ui/PostListView';
import Communications from 'react-native-communications';
import { ScrollView } from 'react-native-gesture-handler';

import { FAB, Searchbar } from 'react-native-paper';
import { postItemHeight, postData } from '../../util/Constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class PostsPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            refreshing:false,
            loadingNewData:true,
            failedNewData:false,
            data:[]
        }

        this._onRefresh=this._onRefresh.bind(this);
        this._scrollToTop=this._scrollToTop.bind(this);
        this._renderFlatListFooter=this._renderFlatListFooter.bind(this);
        this.loadMoreData=this.loadMoreData.bind(this);
        this.componentBlurred=this.componentBlurred.bind(this);
        this.componentFocused=this.componentFocused.bind(this);
        this.counter=0;
        this.isAlreadyFocused=false;
       
    }
    
    static navigationOptions = {
        header:null,
       
    }
   
   
    _onRefresh(){
        var context=this;
        this.setState({refreshing:true})
        //do some work
        //then set refreshing false
        setTimeout(function(){
            context.setState({refreshing:false})
        },1000)
    }
    render(){
        return (
            
            <SafeAreaView style={{flex:1}}>
            {/* <Searchbar></Searchbar> */}
            <FlatList
            data={this.state.data}
            alwaysBounceVertical
            ref={(ref)=>{this.flatlist1=ref;}}
            renderItem={this._renderItem}
            style={styles.container}
            contentContainerStyle={{
                paddingBottom:80
            }}
            refreshControl={
                <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
            }
            onEndReachedThreshold={0.5}
            onEndReached={(...all)=>{
                console.log(all)
                this.loadMoreData();
                
                // console.log(this.state.data)
            }}
            ListFooterComponent={this._renderFlatListFooter()}
            />
            
            <FAB
    style={styles.fab}
    ref={"somevaf"}
    large
    icon="add"
    onPress={() => {
        this.props.navigation.navigate("AddPostScreen")

    }}
  />
            </SafeAreaView>
        )
    }
    _renderFlatListFooter(){

        if(this.state.loadingNewData){
            return <ActivityIndicator/>
        }
        if(this.state.failedNewData){
            return <Text style={{textAlign:'center'}}><Icon name="exclamation-circle" />{"  "}Data loading failed</Text>
        }
        return null
    }
   loadMoreData(){
       var context =this;
       this.counter++;
       context.setState({loadingNewData:true});
       if(this.counter>4){
        this.setState({
            loadingNewData:false,
            failedNewData:true
            
        })
        return
    }
        console.log(this.state.data)
       setTimeout(function(){
        context.setState({
            data:[...context.state.data, ...postData]
        })
       },3000);
       
    
    }
    _scrollToTop(){
        // // console.log(this.props.navigation)
        // console.log(this)
        // // console.log(this.refs.ss._children[0]._children[0].viewConfig.Commands.scrollTo(0))
        // // this.refs.someref.scrollToOffset({x: 0, y: 0, animated: true})

        if(this.isAlreadyFocused){
            // console.log("Already focused")
            this.flatlist1.scrollToIndex({animated: true, index: 0});

        }else{
            // console.log("Not already focused")
            this.isAlreadyFocused=true;

        }
       
    }


    onCall(number){
        console.log("Calling "+number)
        Communications.phonecall(number,true)
    }
    onMessage(number,text){
        console.log("Messaging "+number)
        Communications.textWithoutEncoding(number,text)

    }
    handleScrollOfPost=()=>{
        console.log("Scrolled")
    }
    _renderItem=({item})=>(
        <PostListView
        onCall={this.onCall}
        onMessage={this.onMessage}
        name={item.name}
        distance={item.distance}
        address={item.address}
        date={item.date}
        bgroup={item.bgroup}
        bamount={item.bamount}
        comment={item.comment}
        number={item.number}
        emergency={item.emergency}

        />
    );

    

    componentDidMount(){
      
        this.props.navigation.setParams({scrollToTop: this._scrollToTop});
        // this.componentFocused();
        this._sub=this.props.navigation.addListener(
            'didFocus',this.componentFocused);
        this._sub1=this.props.navigation.addListener(
            'didBlur',this.componentBlurred);
           
        this.setState({
            data:postData
        })
    }
    _onFocus=()=>{
        console.log("click")
    }
    componentWillUnmount(){
        try{
            this._sub.remove();
            this._sub1.remove();

          
        }catch(e){
            console.log(e);
        }
    }
    componentBlurred(){
        // console.log("post page blurred",this.isAlreadyFocused)

        this.isAlreadyFocused=false;
    }

    componentFocused(){
        // console.log("post page focused",this.isAlreadyFocused)
    }
   

}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'#ddd',
        flex:1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})