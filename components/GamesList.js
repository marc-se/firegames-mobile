import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView, StyleSheet } from 'react-native';

import Cell from './Cell.js';

import * as firebase from 'firebase';

let games = [];
const ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1 !== r2,
});

class GamesList extends React.Component {
	static propTypes = {
		dispatch: React.PropTypes.func,
		selectedSystem: React.PropTypes.string,
		games: React.PropTypes.arrayOf(React.PropTypes.object),
	};

	state = {
		games: ds,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedSystem === 'none') {
			this.setState({
				games: ds,
			});
		} else {
			const gamesRef = firebase
				.database()
				.ref(`games/${nextProps.selectedSystem}`);

			gamesRef.on('value', snap => {
				let data = snap.val();
				let games = [];

				Object.keys(data).forEach(game => {
					// add key to object
					data[game].key = game;
					// push object to games list
					games.push(data[game]);
				});

				this.setState({
					games: ds.cloneWithRows(games),
				});
			});
		}
	}

	render() {
		return (
			<View style={style.list}>
				<ListView
					dataSource={this.state.games}
					renderRow={rowData => <Cell data={rowData} />}
				/>
			</View>
		);
	}
}

var style = StyleSheet.create({
	list: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
});

let component = GamesList;

const mapStateToProps = state => {
	return {
		...state,
	};
};

component = connect(mapStateToProps)(component);

export default component;
