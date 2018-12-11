
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator ,createAppContainer,createSwitchNavigator} from 'react-navigation';
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

const colors={
  HOME:"#e91e63",
  SEARCH:"#8bc34a",
  POSTS:"#9c27b0",
  PROFILE:"#00bcd4"
}

const Home=createStackNavigator({
  HomePage
})
Home.navigationOptions={
  tabBarIcon:({tintColor,horizontal})=>{return <Ionicons name='ios-home' size={ horizontal?20:25 } color={tintColor} />},
  tabBarColor:colors.HOME
};
const Profile=createStackNavigator({
  ProfilePage,EditProfileScreen
})
Profile.navigationOptions={
  tabBarIcon:({tintColor,horizontal})=>{return <Ionicons name='ios-person' size={ horizontal?20:25 } color={tintColor} />},
  tabBarColor:colors.PROFILE,

};
const Search=createStackNavigator({
  SearchPage
})
Search.navigationOptions={
  tabBarIcon:({tintColor,horizontal})=>{return <Ionicons name='ios-search' size={ horizontal?20:25 } color={tintColor} />},
  tabBarColor:colors.SEARCH,
  
};
const Posts=createStackNavigator({
  PostsPage
})
Posts.navigationOptions={
tabBarIcon:({tintColor,horizontal})=>{return <Ionicons name='ios-copy' size={ horizontal?20:25 } color={tintColor} />},
  tabBarColor:colors.POSTS
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
  inactiveTintColor:'rgba(255,255,255,0.5)',
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