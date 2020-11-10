import React from 'react';
import '../css/EditHeaderInfo.css';
import { UpdateOptions } from './App';
import ControlledInput from './ControlledInput';

export interface EditHeaderInfoProps {
	infoItems: string[];
	onUpdate: (options: UpdateOptions) => void;
}

export default class EditHeaderInfo extends React.Component<EditHeaderInfoProps> {
	render() {
		return (
			<div className="EditHeaderInfo">
				<h5>Header Info</h5>
				<div className="Header-Info-Items">
					{this.props.infoItems.map((item, index) => 
						<div className="row Header-Info-Item" key={`header-info-${index}`}>
							<div className="col">
								<ControlledInput
									type="text"
									className="form-control Header-Info-Item-Input"
									id={`header-info-${index}`}
									value={item}
									onChange={(event) => this.props.onUpdate({ headingInfoItem: { index, value: event.target.value } })} />
							</div>
							<div className="col-auto">
								<button
									type="button"
									className="btn btn-light btn-block"
									onClick={() => this.removeItem(index)}
								>&times;</button>
							</div>
						</div>
					)}
				</div>
				<button
					type="button"
					className="btn btn-light btn-block"
					id="Add-Header-Info-Item"
					onClick={() => this.newItem()}
				>+</button>
			</div>
		);
	}

	private newItem(): void {
		let newInfoItems = this.props.infoItems;
		newInfoItems.push('');

		this.props.onUpdate({
			headingInfo: newInfoItems
		});
	}

	private removeItem(index: number): void {
		let newInfoItems = this.props.infoItems;
		newInfoItems.splice(index, 1);

		this.props.onUpdate({
			headingInfo: newInfoItems
		});
	}
}
