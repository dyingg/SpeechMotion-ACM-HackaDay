/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState, useRef} from 'react';

import SafeAreaView from 'react-native-safe-area-view';


import Orientation from 'react-native-orientation';

import * as Speech from 'expo-speech';

import {StyleSheet, ScrollView, View, StatusBar} from 'react-native';

import SettingsRoute from './Settings/Settings.js';
import ContextRoute from './Context/Context.js';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Voice from 'react-native-voice';

import {WebView} from 'react-native-webview';

import {
  Appbar,
  DarkTheme,
  Surface,
  Switch,
  Title,
  TextInput,
  Card,
  Paragraph,
  Button,
  TouchableRipple,
} from 'react-native-paper';


import { RNCamera } from 'react-native-camera';

import {
  BottomNavigation,
  Text,
  DefaultTheme,
  Headline,
  Avatar,
} from 'react-native-paper';

const HomeRoute = props => {
  let camera = useRef(undefined);

  const [speechInput, updateSpeechInput] = useState("");


  return (
    <Surface style={{flex: 1}}>
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={styles.rightView}>
          <Title>Sinous</Title>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              marginTop: 20,
            }}>
            <Icon
              name="voice"
              size={50}
              style={{
                marginRight: 15,
              }}></Icon>
            <Button
              icon={props.listening? "microphone" : "cellphone-sound"}
              mode="contained"
              onPress={() => {
              if (!props.listening) {
                props.start();
              }
            }}>{props.listening ? "Listening" :
              "Listen"
            }</Button>
          </View>

          <Text style={styles.speechContent}>
            {props.speech}
          </Text>
          <TextInput
            label="Text to Speech"
            value={speechInput}
            
            onBlur={() => {
              Speech.speak(speechInput);
              // if (speechInput[speechInput.length - 1] != " ") {
              //   const word = speechInput.split(' ');
              //   Speech.speak(word.pop());
              // }
              
            }}

            onFocus={() => {
              updateSpeechInput("");
            }}
            style={styles.speechInput}
            onChangeText={text => {
              updateSpeechInput(text);
            }}
            mode="outlined"
          />
        </View>
        <View style={styles.prevcontainer}>
          {props.index == 0?
            <RNCamera
              ref={ref => {
                camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.front}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              captureAudio={false}
            /> : <></>}
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  speechInput: {
    position: "absolute",
    bottom: 10,
    left:0,
    width: 200,
  },

  speechContent: {
    paddingRight: 70,
    fontSize: 18,
  },
  rightView: {
    flex: 2,
    marginLeft: 55,
    marginTop: 25,
    marginRight: 100,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
  
  },
  prevcontainer: {
    flex: 1,
    
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const App = () => {

  const [SActorSpeech, updateSActorSpeech] = useState("Sentences will appear here in realtime.");
  const [listening, updateListening] = useState(false);

  const onSpeechResults = ({ value }) => {
    updateSActorSpeech(value[0])
  }
  
  const onSpeechEnd = (args) => {
    updateListening(false);
  }

  const onSpeechErrror = (args) => {
    console.log("ERROR")
    console.log(args);
  }

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      updateListening(true);
    } catch (e) {
      console.log(e);
    } 
  }

  // Voice.onSpeechPartialResults = onSpeechResults;
  Voice.onSpeechPartialResults = ({value}) => {
    updateSActorSpeech(value[0]);
  }
  Voice.onSpeechResults = onSpeechResults;
  Voice.onSpeechEnd = onSpeechEnd;
  Voice.onSpeechErrror = onSpeechErrror;

    useEffect(() => {
      Orientation.lockToLandscapeLeft();
      (async () => {
      })();
  }, []);

  const [bottomNav, uBottomNav] = useState({
    index: 0,
    routes: [
      {
        key: 'home',
        title: 'Home',
        icon: 'home',
        color: DefaultTheme.colors.primary,
      },
      {
        key: 'albums',
        title: 'Context',
        icon: 'google-keep',
        color: '#1e88e5',
      },
      {
        key: 'settings',
        title: 'Settings',
        icon: 'settings',
        color: DarkTheme.colors.surface,
      },
    ],
  });

  const _handleIndexChange = index => {
    uBottomNav(Object.assign({}, bottomNav, {index}));
  };

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'home':
        return <HomeRoute jumpTo={jumpTo} index={bottomNav.index} speech={SActorSpeech} listening={listening} start={startListening}/>;
      case 'albums':
        return <ContextRoute jumpTo={jumpTo} />;
      case 'settings':
        return <SettingsRoute jumpTo={jumpTo} />;
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <BottomNavigation
            shifting={true}
            navigationState={bottomNav}
            onIndexChange={_handleIndexChange}
            renderScene={renderScene}
          />
        </View>
        <WebView
          source={{
            uri:
              'http://192.168.0.100:8080/examples/webgl_loader_fbx.html?lolxx',
          }}
          style={{
            flex: 1,
          }}
        />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
