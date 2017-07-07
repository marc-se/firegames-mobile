import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

let regionColor;

export default class Tag extends React.Component {
	static propTypes = {
		text: React.PropTypes.string,
	};

	componentWillMount() {
		regionColor = this.props.text === 'PAL'
			? '#0A00FA'
			: this.props.text === 'JAP' ? '#FA0030' : '#FA6000';

		console.log(regionColor);
	}

	render() {
		return (
			<View
				style={{
					backgroundColor: regionColor,
					borderColor: regionColor,
					borderRadius: 8,
					borderWidth: 1,
					width: 32,
					height: 17,
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text style={style.text}>
					{this.props.text}
				</Text>
			</View>
		);
	}
}

var style = StyleSheet.create({
	text: {
		color: '#FFFFFF',
		textAlign: 'center',
		fontSize: 12,
	},
});
