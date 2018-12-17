
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator ,createAppContainer,createSwitchNavigator,createMaterialTopTabNavigator} from 'react-navigation';
import LoginScreen from '../activity/auth/LoginScreen';
import SignupScreen from '../activity/auth/SingupScreen';
import ForgetPasswordScreen from '../activity/auth/ForgetPasswordScreen';
import HomePage from '../activity/home/HomePage';
import ProfilePage from '../activity/profile/ProfilePage';
import SearchPage from '../activity/search/SearchPage';
import PostsPage from "../activity/posts/PostsPage";
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import React from 'react';
import EditProfileScreen from '../activity/profile/EditProfileScreen';
import  LottieView  from 'lottie-react-native';
import {colors} from '../util/Constants';
export const LoggedOut=createStackNavigator(
  {
    Login:{
      screen:LoginScreen
    },
    Signup:{
      screen:SignupScreen
    },
    ForgetPassword:{
      screen:ForgetPasswordScreen
    }
  },
  {
    initialRouteName:'Login',
    headerMode:'none', 
}
)


const Home=createStackNavigator({
  HomePage
})
Home.navigationOptions={
  tabBarIcon:({tintColor,horizontal,focused})=>{
    if(focused){
      return <LottieView
      source={require('../../assets/home.json')}
      style={{height:30,width:30}}
      loop={false}
      speed={6}
      ref={animation=>{
        this.animationhome=animation;
      }}
      // duration={4000}
      autoPlay={true}
      />
    }
    else{
    return <Ionicons name='home' size={ horizontal?20:25 } color={tintColor} />
    }
  },
  tabBarColor:colors.HOME,
  tabBarOnPress:({navigation,defaultHandler})=>{
    this.animationhome.play();
    defaultHandler()

  // console.warn("Home Pressed")
 
}
};



const Profile=createStackNavigator({
  ProfilePage,EditProfileScreen
})
Profile.navigationOptions={
  tabBarIcon:({tintColor,horizontal})=>{return <Ionicons name='account' size={ horizontal?20:25 } color={tintColor} />},
  tabBarColor:colors.PROFILE,
  tabBarOnPress:({navigation,defaultHandler})=>{
    defaultHandler();
    //  this.animation.play();
    console.log("Profile Pressed")
   
  }
  

};
const Search=createStackNavigator({
  SearchPage
})
Search.navigationOptions={
  
  tabBarIcon:({tintColor,horizontal,focused})=>{
    console.log(focused);
    if(focused){
      return <LottieView
      source={require('../../assets/checkanimate.json')}
      style={{height:30,width:30,}}
      loop={false}
      speed={2}
      ref={animation=>{
        this.animation=animation;
      }}
      // duration={4000}
      autoPlay={true}
      />

    }
    else{
     
      return <Ionicons name='magnify' size={ horizontal?20:25 } color={tintColor} />
    }
   },
    
  tabBarColor:colors.SEARCH,
  tabBarOnPress:({navigation,defaultHandler})=>{
      this.animation.play();
      defaultHandler()
 
    console.log("Search Pressed")
   
  }
  
};
const Posts=createStackNavigator({
  PostsPage
})
Posts.navigationOptions={
tabBarIcon:({tintColor,horizontal})=>{return <Ionicons name='content-copy' size={ horizontal?20:25 } color={tintColor} />},
  tabBarColor:colors.POSTS,
  tabBarOnPress:({navigation,defaultHandler})=>{
    defaultHandler();
    console.log("Pressed")}
};


export const LoggedIn=createMaterialBottomTabNavigator({
  // Posts:{
  //   screen:PostsPage
  // },
  // Home:{
  //   screen:HomePage,
  
  // },
 
  // Search:{
  //   screen:SearchPage
  // },
  // Profile:{
  //   screen:ProfilePage,
   
  // },
  Posts,Home,Search,Profile
 
},{
  initialRouteName:'Home',
  
  activeColor: '#ffffff',
  inactiveTintColor:'rgba(255,255,255,0.1)',
  barStyle: { backgroundColor: '#694fad' },
  // headerMode:'none'
  // defaultNavigationOptions:({navigation})=>({
  //   tabBarIcon:({focused,horizontal,tintColor})=>{
  //     const { routeName } = navigation.state;
  //       let iconName;
  //       switch(routeName){
  //         case 'Home':
  //         iconName = "ios-home";
  //         break;

  //         case 'Profile':
  //         iconName = `ios-person`;

  //         break;
  //         case 'Posts':
  //         iconName = `ios-copy`;

  //         break;

  //         case 'Search':
  //         iconName = `ios-search`;

  //         break;
  //         default:
  //         iconName = `ios-information-circle${focused ? '' : '-outline'}`;

  //         break;

  //       }
  //       return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
  //   }
  // })
  
})
  
export const createRootNavigator=(loggedin=false)=>{
  return createAppContainer( createSwitchNavigator(
    {
      LoggedIn:{
        screen:LoggedIn,
      },
      LoggedOut:{
        screen:LoggedOut
      }
    },
    {
      initialRouteName:loggedin?"LoggedIn":"LoggedOut",
      
    }
  )
  )
};