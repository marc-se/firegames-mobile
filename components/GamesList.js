import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';

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
		// TODO: update ListView
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
		console.log(this.props);
		return (
			// TODO: use pageSize prop to render more than one cell
			// default, only one cell will be rendered
			(
				<View>
					<ListView
						dataSource={this.state.games}
						renderRow={rowData => <Text>{rowData.title}</Text>}
					/>
				</View>
			)
		);
	}
}

let component = GamesList;

const mapStateToProps = state => {
	return {
		...state,
	};
};

component = connect(mapStateToProps)(component);

export default component;
