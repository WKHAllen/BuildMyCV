import React from 'react';
import '../css/EditSection.css';
import ControlledInput from './ControlledInput';
import ControlledTextarea from './ControlledTextarea';
import ControlledSelect from './ControlledSelect';
import { UpdateOptions } from './App';

const sectionTypes = {
	'string':         'Text',
	'list':           'List',
	'unbulletedlist': 'Unbulleted List',
	'shortlist':      'Short List'
};

export interface EditSectionProps {
	index: number;
	numSections: number;
	name: string;
	subtext?: string;
	type: string;
	content: string | string[];
	onUpdate: (options: UpdateOptions) => void;
	onMoveSectionUp: (index: number) => void;
	onMoveSectionDown: (index: number) => void;
	onRemoveSection: (index: number) => void;
}

export default class EditSection extends React.Component<EditSectionProps> {
	render() {
		return (
			<div className="EditSection card">
				<div className="card-body">
					<h5 className="card-title">Section {this.props.index + 1}</h5>
					<div className="form-group">
						<label htmlFor={`section-label-${this.props.index}`}>Label</label>
						<ControlledInput
							type="text"
							className="form-control"
							id={`section-label-${this.props.index}`}
							value={this.props.name}
							onChange={(event) => this.props.onUpdate({ sectionItem: { index: this.props.index, name: event.target.value } })} />
					</div>
					<div className="form-group">
						<label htmlFor={`section-subtext-${this.props.index}`}>Subtext</label>
						<ControlledInput
							type="text"
							className="form-control"
							id={`section-subtext-${this.props.index}`}
							value={this.props.subtext || ''}
							onChange={(event) => this.props.onUpdate({ sectionItem: { index: this.props.index, subtext: event.target.value } })} />
					</div>
					<div className="form-group">
						<label htmlFor={`section-type-${this.props.index}`}>Type</label>
						<ControlledSelect
							className="form-control"
							id={`section-type-${this.props.index}`}
							value={this.props.type}
							options={sectionTypes}
							onChange={(event) => this.onTypeUpdate(event)} />
					</div>
					<div className="form-group">
						<label htmlFor={`section-content-${this.props.index}`}>Content</label>
						<ControlledTextarea
							className="form-control"
							rows={typeof this.props.content === 'string' ? 1 : this.props.content.length}
							id={`section-content-${this.props.index}`}
							value={typeof this.props.content === 'string' ? this.props.content : this.props.content.join('\n')}
							onChange={(event) => this.props.onUpdate({
								sectionItem: {
									index: this.props.index,
									content: typeof this.props.content === 'string' ? event.target.value : event.target.value.split('\n')
								}
							})} />
					</div>
					{this.props.index > 0 ?
						<button
							type="button"
							className="btn btn-success btn-block"
							onClick={() => this.props.onMoveSectionUp(this.props.index)}
						>&uarr; Move up &uarr;</button>
					: null}
					{this.props.index < this.props.numSections - 1 ?
						<button
							type="button"
							className="btn btn-success btn-block"
							onClick={() => this.props.onMoveSectionDown(this.props.index)}
						>&darr; Move down &darr;</button>
					: null}
					<button
						type="button"
						className="btn btn-danger btn-block"
						onClick={() => this.props.onRemoveSection(this.props.index)}
					>&times; Remove section &times;</button>
				</div>
			</div>
		);
	}

	private onTypeUpdate(event: React.ChangeEvent<HTMLSelectElement>): void {
		let newContent = this.props.content;
		if (event.target.value === 'string' && typeof this.props.content !== 'string') {
			newContent = this.props.content.join('\n');
		} else if (event.target.value !== 'string' && typeof this.props.content === 'string') {
			newContent = this.props.content.split('\n');
		}

		this.props.onUpdate({
			sectionItem: {
				index: this.props.index,
				type: event.target.value,
				content: newContent
			}
		});
	}
}
