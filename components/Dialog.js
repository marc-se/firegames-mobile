import React from 'react';
import { connect } from 'react-redux';
import {
	Modal,
	Text,
	TouchableHighlight,
	View,
	StyleSheet,
} from 'react-native';

class Dialog extends React.Component {
	state = {
		modalVisible: false,
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	componentWillMount() {
		const children = this.props.children;
		let systemNames = React.Children.toArray(children);
		console.log(systemNames);
	}

	getSystemName() {
		let systemName;
		systemName = this.props.systems.filter(
			system => system.url === this.props.selectedSystem
		);

		return systemName[0].title;
	}

	render() {
		const children = this.props.children;
		return (
			<View style={{ marginTop: 22 }}>
				<Modal
					animationType={'slide'}
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						alert('Modal has been closed.');
					}}
				>
					<View style={{ marginTop: 22 }}>
						<View>
							{React.Children.map(children, (child, i) => (
								<View key={i}>
									{child}
								</View>
							))}

							<TouchableHighlight
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}
							>
								<Text>close</Text>
							</TouchableHighlight>

						</View>
					</View>
				</Modal>
				<View style={style.modalBtnWrapper}>
					<TouchableHighlight
						onPress={() => {
							this.setModalVisible(true);
						}}
						style={style.modalBtn}
					>
						<Text style={style.modalBtnText}>
							{this.props.selectedSystem === 'none'
								? 'Select a system'
								: this.getSystemName()}
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

var style = StyleSheet.create({
	modalBtnWrapper: {
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 5,
		shadowOpacity: 1.0,
		height: 70,
		backgroundColor: '#eee',
	},
	modalBtn: {
		height: 70,
	},
	modalBtnText: {
		fontSize: 18,
		fontWeight: '300',
		fontFamily: 'System',
		position: 'relative',
		top: 30,
		left: 25,
	},
});

let component = Dialog;

const mapStateToProps = state => {
	return {
		...state,
	};
};

component = connect(mapStateToProps)(component);

export default component;
