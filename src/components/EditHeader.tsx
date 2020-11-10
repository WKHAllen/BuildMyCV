import React from 'react';
import '../css/EditHeader.css';
import EditHeaderInfo from './EditHeaderInfo';
import ControlledInput from './ControlledInput';
import { UpdateOptions } from './App';

export interface EditHeaderProps {
	title: string;
	subtitle?: string;
	headingInfo: string[];
	onUpdate: (options: UpdateOptions) => void;
}

export default class EditHeader extends React.Component<EditHeaderProps> {
	render() {
		return (
			<div className="EditHeader">
				<h3>Header</h3>
				<div className="form-group">
					<label htmlFor="name-input">Name</label>
					<ControlledInput
						type="text"
						className="form-control"
						id="name-input"
						value={this.props.title}
						onChange={(event) => this.props.onUpdate({ title: event.target.value })} />
				</div>
				<div className="form-group">
					<label htmlFor="subtitle-input">Subtitle</label>
					<ControlledInput
						type="text"
						className="form-control"
						id="subtitle-input"
						value={this.props.subtitle || ''}
						onChange={(event) => this.props.onUpdate({ subtitle: event.target.value })} />
				</div>
				<EditHeaderInfo
					infoItems={this.props.headingInfo}
					onUpdate={this.props.onUpdate} />
			</div>
		);
	}
}
