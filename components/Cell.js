import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Cell extends React.Component {
	static propTypes = {};

	render() {
		return (
			<View style={style.cell}>
				<Text style={(style.text, style.titleText)}>
					{this.props.data.title}
				</Text>
				<Text style={(style.text, style.regionText)}>
					{this.props.data.region}
				</Text>
			</View>
		);
	}
}

var style = StyleSheet.create({
	cell: {
		padding: 10,
		backgroundColor: '#3C3C3C',
	},
	text: {
		paddingTop: 2,
		paddingBottom: 2,
	},
	titleText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#FEFEFF',
	},
	regionText: {
		backgroundColor: '#03DC8D',
		color: '#3C3C3C',
		width: 30,
		height: 20,
		textAlign: 'center',
	},
});
