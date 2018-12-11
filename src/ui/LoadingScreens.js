import React from 'react';
import {View } from 'react-native';
import ContentLoader from 'rn-content-loader';
import Svg,{Rect,Circle} from 'react-native-svg';
export const UserListViewLoader = props => (
	<View
	style={{
		height:80
	}}
	>
	<ContentLoader 
		height={90}
		width={400}
		speed={1}
		primaryColor="#c6d9f6"
		secondaryColor="#ecebeb"
		{...props}
	>
		<Rect x="91" y="22" rx="3" ry="3" width="220.15" height="16.58" /> 
		<Rect x="92" y="49.99" rx="3" ry="3" width="164.5" height="10.05" /> 
		<Circle cx="50" cy="45" r="30" />
	</ContentLoader>
	</View>
)