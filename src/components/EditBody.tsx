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
	constructor(props: EditBodyProps) {
		super(props);

		this.removeSection = this.removeSection.bind(this);
	}

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
							onRemoveSection={this.removeSection}
							key={index} />
					)}
				</div>
				<button
					type="button"
					className="btn btn-primary btn-block"
					id="Add-Section"
					onClick={() => this.newSection()}
				>New section</button>
			</div>
		);
	}

	private newSection(): void {
		let newSections = this.props.sections;
		newSections.push({
			name: '',
			type: 'string',
			content: ''
		});

		this.props.onUpdate({
			sections: newSections
		});
	}

	private removeSection(index: number): void {
		let newSections = this.props.sections;
		newSections.splice(index, 1);

		this.props.onUpdate({
			sections: newSections
		});
	}
}
