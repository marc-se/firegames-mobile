import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as firebase from 'firebase';

import SystemSelect from './components/SystemSelect';
import Dialog from './components/Dialog';
import GamesList from './components/GamesList';
import config from './config/config.js';
import reducer from './reducers/reducers.js';

firebase.initializeApp(config);
let store = createStore(reducer);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View>
					<Dialog><SystemSelect /></Dialog>
					<GamesList url="gameboy" />
				</View>
			</Provider>
		);
	}
}
