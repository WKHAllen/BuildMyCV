import React from 'react';
import '../css/EditHeader.css';
import EditorHeaderInfo from './EditHeaderInfo';

export interface EditHeaderProps {
	
}

export default class EditorHeader extends React.Component<EditHeaderProps> {
	render() {
		return (
			<div className="EditHeader">
				<h3>Header</h3>
				<div className="form-group">
					<label htmlFor="name-input">Name</label>
					<input type="text" className="form-control" id="name-input" />
				</div>
				<div className="form-group">
					<label htmlFor="subtitle-input">Subtitle</label>
					<input type="text" className="form-control" id="subtitle-input" />
				</div>
				<EditorHeaderInfo />
			</div>
		);
	}
}
