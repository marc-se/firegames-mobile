import React from 'react';
import {
	Modal,
	Text,
	TouchableHighlight,
	View,
	StyleSheet,
} from 'react-native';

export default class Dialog extends React.Component {
	state = {
		modalVisible: false,
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
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
								<Text>Hide Modal</Text>
							</TouchableHighlight>

						</View>
					</View>
				</Modal>

				<TouchableHighlight
					onPress={() => {
						this.setModalVisible(true);
					}}
				>
					<Text>Show Modal</Text>
				</TouchableHighlight>
			</View>
		);
	}
}
