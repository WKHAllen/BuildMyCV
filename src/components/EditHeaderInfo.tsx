import React from 'react';
import '../css/EditHeaderInfo.css';
import ControlledInput from './ControlledInput';

export interface EditHeaderInfoProps {
	infoItems: string[];
	onUpdate: () => void;
}

export default class EditorHeaderInfo extends React.Component<EditHeaderInfoProps> {
	render() {
		return (
			<div className="EditHeaderInfo">
				<h5>Header Info</h5>
				<div className="Header-Info-Items">
					{this.props.infoItems.map((item, index) => 
						<ControlledInput
							type="text"
							className="form-control Header-Info-Item"
							id={`header-info-${index}`}
							value={item}
							onChange={this.props.onUpdate}
							key={`header-info-${index}`} />
					)}
				</div>
			</div>
		);
	}
}
