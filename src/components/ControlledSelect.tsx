import React from 'react';

interface Options {
	[optionName: string]: string;
}

export interface ControlledSelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
	id: any;
	value: string;
	options: Options;
}

export interface ControlledSelectState {
	value: string;
	options: Options;
}

function optionsEqual(a: Options, b: Options): boolean {
	if (Object.keys(a).length !== Object.keys(b).length) {
		return false;
	}
	for (let i = 0; i < Object.keys(a).length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

export default class ControlledSelect extends React.Component<ControlledSelectProps, ControlledSelectState> {
	constructor(props: ControlledSelectProps) {
		super(props);

		this.state = {
			value: props.value || '',
			options: props.options
		};
	}

	static getDerivedStateFromProps(props: ControlledSelectProps, currentState: ControlledSelectState) {
		if (currentState.value !== props.value || !optionsEqual(currentState.options, props.options)) {
			return {
				value: props.value,
				options: props.options
			}
		}
		return null;
	}

	render() {
		return (
			<select 
				{...this.props}
				value={this.state.value}
				onChange={(event) => this.onInputChange(event)}>
					{Object.keys(this.props.options).map((option, index) => 
						<option
							value={option}
							key={index}
						>{this.props.options[option]}</option>
					)}
			</select>
		);
	}

	onInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
		this.setState({
			value: event.target.value
		});

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	}
}
