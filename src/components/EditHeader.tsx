import React from 'react';
import '../css/EditHeader.css';
import EditorHeaderInfo from './EditHeaderInfo';

export interface EditHeaderProps {
	title: string;
	subtitle?: string;
	headingInfo: string[];
	onUpdate: () => void;
}

export default class EditorHeader extends React.Component<EditHeaderProps> {
	render() {
		return (
			<div className="EditHeader">
				<h3>Header</h3>
				<div className="form-group">
					<label htmlFor="name-input">Name</label>
					<input type="text" className="form-control" id="name-input" defaultValue={this.props.title} onChange={this.props.onUpdate} />
				</div>
				<div className="form-group">
					<label htmlFor="subtitle-input">Subtitle</label>
					<input type="text" className="form-control" id="subtitle-input" defaultValue={this.props.subtitle} onChange={this.props.onUpdate} />
				</div>
				<EditorHeaderInfo
					infoItems={this.props.headingInfo}
					onUpdate={this.props.onUpdate} />
			</div>
		);
	}
}
