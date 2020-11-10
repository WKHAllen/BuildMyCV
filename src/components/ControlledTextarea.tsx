import React from 'react';

export interface ControlledTextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	id: any;
	value: string;
}

export interface ControlledTextareaState {
	value: string;
}

export default class ControlledTextarea extends React.Component<ControlledTextareaProps, ControlledTextareaState> {
	constructor(props: ControlledTextareaProps) {
		super(props);

		this.state = {
			value: props.value || ''
		};
	}

	static getDerivedStateFromProps(props: ControlledTextareaProps, currentState: ControlledTextareaState) {
		if (currentState.value !== props.value) {
			return {
				value: props.value
			}
		}
		return null;
	}

	render() {
		return (
			<textarea 
				{...this.props}
				value={this.state.value}
				onChange={(event) => this.onInputChange(event)} />
		);
	}

	onInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({
			value: event.target.value
		});

		if (this.props.onChange) {
			this.props.onChange(event);
		}
	}
}
