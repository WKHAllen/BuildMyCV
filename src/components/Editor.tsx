import React from 'react';
import '../css/Editor.css';
import EditHeader from './EditHeader';
import { CVProps } from './CV';

export interface EditorProps {
	cv: CVProps;
}

export default class Editor extends React.Component<EditorProps> {
	render() {
		return (
			<div className="Editor">
				<EditHeader {...this.props.cv.header} />
			</div>
		);
	}
}
