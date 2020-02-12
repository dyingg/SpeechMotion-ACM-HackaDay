/**
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';


function Main() {
	return (
		<SafeAreaProvider>
			<PaperProvider>
				<App />
			</PaperProvider>
		</SafeAreaProvider>
	)
}

AppRegistry.registerComponent(appName, () => Main);
