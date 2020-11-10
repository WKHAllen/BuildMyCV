import React from 'react';
import '../css/EditSection.css';
// import ControlledInput from './ControlledInput';
import { UpdateOptions } from './App';

export interface EditSectionProps {
	section: {
		index: number;
		name: string;
		subtext?: string;
		type: string;
		content: string | string[];
	};
	onUpdate: (options: UpdateOptions) => void;
}

export default class EditSection extends React.Component<EditSectionProps> {
	render() {
		return (
			<div className="EditSection">
				
			</div>
		);
	}
}
