import React from 'react';
import '../css/Editor.css';
import EditHeader from './EditHeader';

export interface EditorProps {

}

export default class Editor extends React.Component<EditorProps> {
	render() {
		return (
			<div className="Editor">
				<EditHeader />
			</div>
		);
	}
}
