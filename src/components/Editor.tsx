import React from 'react';
import '../css/Editor.css';
import EditHeader from './EditHeader';
import { CVProps } from './CV';

export interface EditorProps {
	cv: CVProps;
	onUpdate: () => void;
}

export default class Editor extends React.Component<EditorProps> {
	render() {
		return (
			<div className="Editor">
				<EditHeader
					title={this.props.cv.header.title}
					subtitle={this.props.cv.header.subtitle}
					headingInfo={this.props.cv.header.headingInfo}
					onUpdate={this.props.onUpdate} />
			</div>
		);
	}
}
