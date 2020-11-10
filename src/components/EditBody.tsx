import React from 'react';
import '../css/EditBody.css';
import EditSection from './EditSection';
import { UpdateOptions } from './App';

export interface EditBodyProps {
	sections: {
		name: string;
		subtext?: string;
		type: string;
		content: string | string[];
	}[];
	onUpdate: (options: UpdateOptions) => void;
}

export default class EditBody extends React.Component<EditBodyProps> {
	render() {
		return (
			<div className="EditBody">
				<h3>Body</h3>
				<div className="Section-Items">
					{this.props.sections.map((item, index) => 
						<EditSection
							index={index}
							{...item}
							onUpdate={this.props.onUpdate}
							key={index} />
					)}
				</div>
			</div>
		);
	}
}
