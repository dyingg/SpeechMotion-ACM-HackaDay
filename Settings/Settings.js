import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';

import SafAreaView from 'react-native-safe-area-view';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Surface, Switch, Title} from 'react-native-paper';
import {Text,Headline, DefaultTheme} from 'react-native-paper';

const SettingsRoute = () => {
	const [micEnabled, uMic] = useState(true);
	const [camEnabled, uCam] = useState(true);
	
	const micOnValueChange = () => {
	  uMic(!micEnabled);
	}
  
	const camOnValueChange = () => {
	  uCam(!camEnabled);
	}
  
	return (
	  
	  
	  <Surface style={{ flex: 1 }}>
		<View style={{ paddingTop: 40, paddingLeft: 40}}>
		  <View style={settingStyle.pageHeading}>
			<Icon size={20} name="settings"/>
		  <Headline style={settingStyle.header}>
			Settings</Headline>
		  </View>
		
		  <View style={{ flexDirection: "row",  }}>
			<Title>Microphone</Title>
		  <Switch
			  value={micEnabled}
			  onValueChange={micOnValueChange}
			  style={settingStyle.micHeading}
			/>
		  </View>
		  <Text style={settingStyle.info}>Disables the microphone input for speech to model gesture enactment.</Text>
		  <>
		  </>
  
		  <View style={{ flexDirection: "row",  }}>
			<Title>Front Camera</Title>
		  <Switch
			  value={camEnabled}
			  onValueChange={camOnValueChange}
			  style={settingStyle.swt}
			/>
		  </View>
		  <Text style={settingStyle.info}>Disables capturing camera information for gesture to speech synthesis.</Text>
  
  
		</View>
	  </Surface>)
  }


const settingStyle = StyleSheet.create({
	inputLabel: {
	  fontSize: 18
	},
  
  
	micHeading: {
	  display: "flex",
	  marginRight: 15,
	  marginLeft: 43,
	},
	pageHeading: {
	  flexDirection: "row",
	  alignItems: "center",
	  marginBottom: 10,
	  
	},
  
	swt: {
	  display: "flex",
	  marginRight: 10,
	  marginLeft: 30,
	},
	info: {
	 
	  marginTop: 5,
	  marginBottom: 15,
	  color: DefaultTheme.colors.backdrop
	},
	header: {
	  marginLeft: 6,
	  fontSize:15
	}
  })
  
export default SettingsRoute;
	
  