import React from 'react';
import '../css/Editor.css';
import EditHeader from './EditHeader';
import EditBody from './EditBody';
import { CVProps } from './CV';
import { UpdateOptions } from './App';

export interface EditorProps {
	cv: CVProps;
	onUpdate: (options: UpdateOptions) => void;
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
				<EditBody
					sections={this.props.cv.body.sections}
					onUpdate={this.props.onUpdate} />
			</div>
		);
	}
}
