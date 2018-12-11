import React from 'react';
import LottieView from 'lottie-react-native';

export default class MainLoading extends React.Component{
    render(){
        return(
        <LottieView
        source={require('../../assets/world_locations.json')}
        autoPlay
        loop
        />
        )
    }
}