import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Tag from './Tag.js';

export default class Cell extends React.Component {
	static propTypes = {};

	render() {
		return (
			<View style={style.cell}>
				<Text style={style.title}>
					{this.props.data.title}
				</Text>
				<View>
					<Tag text={this.props.data.region} />
				</View>
			</View>
		);
	}
}

var style = StyleSheet.create({
	cell: {
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 25,
		marginRight: 25,
		borderBottomColor: '#545454',
		borderBottomWidth: 0.5,
	},
	title: {
		paddingTop: 2,
		paddingBottom: 9,
		fontSize: 16,
		fontWeight: '500',
		color: '#0C0C0C',
	},
});
