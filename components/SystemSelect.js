import React from 'react';
import { Picker } from 'react-native';
import { connect } from 'react-redux';
import { selectSystem, updateSystems } from '../reducers/actions.js';
import * as firebase from 'firebase';

let systems = [];

class SystemSelect extends React.Component {
	static propTypes = {
		dispatch: React.PropTypes.func,
		systems: React.PropTypes.arrayOf(React.PropTypes.object),
	};

	state = {
		systems: [],
		system: '',
	};

	componentWillMount() {
		if (this.props.systems.length < 1) {
			const systemsRef = firebase.database().ref('systems');
			systemsRef.once('value').then(snap => {
				snap.forEach(system => {
					systems.push(system.val());
				});

				this.props.dispatch(updateSystems(systems));
			});
		}
	}

	handleUpdate = system => {
		// update redux store
		this.props.dispatch(selectSystem(system));
	};

	render() {
		return (
			<Picker
				selectedValue={this.props.selectedSystem}
				onValueChange={this.handleUpdate}
			>
				<Picker.Item key={0} label="Keine Auswahl" value="none" />
				{systems.map((system, i) => (
					<Picker.Item
						key={i + 1}
						label={system.title}
						value={system.url}
					/>
				))}
			</Picker>
		);
	}
}

let component = SystemSelect;

const mapStateToProps = state => {
	return {
		...state,
	};
};

component = connect(mapStateToProps)(component);

export default component;
