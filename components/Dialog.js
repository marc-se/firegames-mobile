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
			<View style={style.dialogWrapper}>
				<Modal
					animationType={'slide'}
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						alert('Modal has been closed.');
					}}
				>
					<View style={{ marginTop: 22 }}>
						<View style={style.modalView}>
							{React.Children.map(children, (child, i) => (
								<View key={i}>
									{child}
								</View>
							))}

							<TouchableHighlight
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}
								style={style.modalBtn}
							>
								<View style={style.modalCloseBtnWrapper}>
									<Text style={style.modalCloseBtnText}>OK</Text>
								</View>
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
						<Text style={style.modalEnterBtnText}>
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
	dialogWrapper: {
		marginTop: 22,
		marginBottom: 12,
	},
	modalBtnWrapper: {
		shadowColor: '#3A3A3A',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 1,
		shadowOpacity: 0.1,
		height: 70,
	},
	modalBtn: {
		height: 70,
	},
	modalEnterBtnText: {
		fontSize: 18,
		fontWeight: '300',
		fontFamily: 'System',
		position: 'relative',
		top: 30,
		left: 25,
	},
	modalCloseBtnWrapper: {
		backgroundColor: '#FAFAFA',
		height: 70,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalCloseBtnText: {
		fontSize: 18,
		fontWeight: '300',
		fontFamily: 'System',
		textAlign: 'center',
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
