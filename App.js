/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState, useRef} from 'react';

import Orientation from 'react-native-orientation';

import * as Speech from 'expo-speech';

import {StyleSheet, ScrollView, View, StatusBar} from 'react-native';

import SettingsRoute from './Settings/Settings.js';
import ContextRoute from './Context/Context.js';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Voice from 'react-native-voice';

const apiHostname = '35.197.35.27:9090';

import {WebView} from 'react-native-webview';

import Model from './Model/Model.js';

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

import {RNCamera} from 'react-native-camera';

import {
  BottomNavigation,
  Text,
  DefaultTheme,
  Headline,
  Avatar,
} from 'react-native-paper';

const HomeRoute = props => {
  const [speechInput, updateSpeechInput] = useState('');
  // const [gestureInput, upateGestureInput] = useState(
  //   'Gesture input will show here',
  // );

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
              icon={props.listening ? 'microphone' : 'cellphone-sound'}
              mode="contained"
              onPress={() => {
                if (!props.listening) {
                  props.start();
                }
              }}>
              {props.listening ? 'Listening' : 'Listen'}
            </Button>
          </View>

          <Text style={styles.speechContent}>{props.speech}</Text>
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
              updateSpeechInput('');
            }}
            style={styles.speechInput}
            onChangeText={text => {
              updateSpeechInput(text);
            }}
            mode="outlined"
          />
        </View>
        <View style={styles.prevcontainer}>
          <Button onPress={props.takepic} style={{marginTop: 40}}>
            {!props.capturing ? 'Capture Gesture' : 'Stop Capturing'}
          </Button>
          <Title style={{textAlign: 'center'}}>{props.gestureInput ? props.gestureInput : "Gestures will show here in real time"}</Title>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Button
              mode="contained"
              style={{
                width: 90,
                marginBottom: 10,
              }}
              onPress={() => {
                Speech.speak(props.gestureInput);
              }}>
              Recite
            </Button>
            <Button
              mode="contained"
              style={{
                width: 90,
                marginBottom: 10,
              }}
              onPress={() => {
                props.upateGestureInput(props.gestureInput + '');
              }}>
              Space
            </Button>

            <Button
              mode="contained"
              style={{
                width: 90,
              }}
              onPress={() => {
                props.upateGestureInput(props.gestureInput.substr(0, props.gestureInput.length - 1));
              }}
              >
              Delete
            </Button>
          </View>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  speechInput: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: 200,
  },

  speechContent: {
    paddingRight: 70,
    fontSize: 18,
    textAlign: "center"
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
  prevcontainer: {
    flex: 3,
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
  let camera = useRef();
  let webview = useRef();

  const [SActorSpeech, updateSActorSpeech] = useState(
    'Sentences will appear here in realtime.',
  );

  const [gestureInput, updateGestureInput] = useState(
    '',
  );

  const [listening, updateListening] = useState(false);

  const onSpeechResults = ({value}) => {
    updateSActorSpeech(value[0]);
    webview.current.injectJavaScript(`gucci("${value[0]}");`);
  };

  const takePicture = async () => {
    const data = await camera.current.takePictureAsync({
      quality: 0.3,
      base64: true,
      width: 400,
      mirrorImage: true,
    });

    const result = await fetch(`http://${apiHostname}/resource`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: "dyuti",
        class: "test",
        image: data.base64,
      }),
    });
    const json = await result.json();
    updateGestureInput(gestureInput + json.result);


  };

  //#region Voice
  const onSpeechEnd = args => {
    updateListening(false);
  };

  const onSpeechErrror = args => {
    console.log('ERROR');
    console.log(args);
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
      updateListening(true);
    } catch (e) {
      console.log(e);
    }
  };

  // Voice.onSpeechPartialResults = onSpeechResults;
  Voice.onSpeechPartialResults = ({value}) => {
    updateSActorSpeech(value[0]);
  };
  Voice.onSpeechResults = onSpeechResults;
  Voice.onSpeechEnd = onSpeechEnd;
  Voice.onSpeechErrror = onSpeechErrror;

  //#endregion
  
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
    (async () => {})();
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

  const __updateGestureInput = (value) => {
    updateGestureInput(value);
  }

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'home':
        return (
          <HomeRoute
            speech={SActorSpeech}
            listening={listening}
            start={startListening}
            takepic={takePicture}
            gestureInput={gestureInput}
            upateGestureInput={__updateGestureInput}
          />
        );
      case 'albums':
        return <ContextRoute />;
      case 'settings':
        return <SettingsRoute />;
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
          ref={webview}
          source={{
            // uri: 'http://localhost:8080/webgl_loader_fbx.html?lolxx',
            html: Model,
            baseUrl: 'file:///android_asset/web/',
          }}
          mixedContentMode={'compatibility'}
          javaScriptEnabledAndroid={true}
          originWhitelist={['*']}
          style={{
            flex: 1,
          }}
        />

        <RNCamera
          ref={camera}
          style={style.preview}
          type={RNCamera.Constants.Type.back}
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
  preview: {
    position: 'absolute',
    right: 90,
    bottom: 0,
    height: 120,
    width: 120,
  },
});

export default App;
