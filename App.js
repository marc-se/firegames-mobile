import React from 'react';
import { View, StyleSheet } from 'react-native';
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
				<View style={style.appBackground}>
					<Dialog><SystemSelect /></Dialog>
					<GamesList />
				</View>
			</Provider>
		);
	}
}

var style = StyleSheet.create({
	appBackground: {
		flex: 1,
	},
});
