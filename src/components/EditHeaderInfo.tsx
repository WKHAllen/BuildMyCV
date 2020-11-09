import React from 'react';
import '../css/EditHeaderInfo.css';

export interface EditHeaderInfoProps {
	
}

export interface EditHeaderInfoState {
	infoItems: string[];
}

export default class EditorHeaderInfo extends React.Component<EditHeaderInfoProps, EditHeaderInfoState> {
	constructor(props: EditHeaderInfoProps) {
		super(props);

		this.state = {
			infoItems: ['']
		};
	}

	render() {
		return (
			<div className="EditHeaderInfo">
				<h5>Header Info</h5>
				<div className="Header-Info-Items">
					{this.state.infoItems.map((item, index) => 
						<input type="text" className="form-control" id={`header-info-${index}`} defaultValue={item} onChange={() => this.updateHeader(index)} />
					)}
				</div>
			</div>
		);
	}

	updateHeader(index: number) {
		const itemContent = (document.getElementById(`header-info-${index}`) as HTMLInputElement).value;
		const infoItems = this.state.infoItems;
		infoItems[index] = itemContent;
		this.setState({
			infoItems: infoItems
		});
	}
}
