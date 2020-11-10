import React from 'react';

export interface ControlledInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	id: any;
	value: string;
}

export interface ControlledInputState {
	value: string;
}

export default class ControlledInput extends React.Component<ControlledInputProps, ControlledInputState> {
	constructor(props: ControlledInputProps) {
		super(props);

		this.state = {
			value: props.value
		};
	}

	static getDerivedStateFromProps(props: ControlledInputProps, current_state: ControlledInputState) {
		if (current_state.value !== props.value) {
			return {
				value: props.value
			}
		}
		return null;	  
	}

	render() {
		return (
			<input 
				{...this.props}
				onChange={(event) => this.onInputChange(event)} />
		);
	}

	onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			value: event.target.value
		});

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	}
}
