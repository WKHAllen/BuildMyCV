import React from 'react';
import '../css/EditHeaderInfo.css';

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
						<input type="text" className="form-control Header-Info-Item" id={`header-info-${index}`} defaultValue={item} onChange={this.props.onUpdate} />
					)}
				</div>
			</div>
		);
	}
}
