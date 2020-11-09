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
			infoItems: ['hello', 'world']
		};
	}

	render() {
		return (
			<div className="EditHeaderInfo">
				<h5>Header Info</h5>
				<div className="Header-Info-Items">
					{this.state.infoItems.map((item) => 
						<input type="text" className="form-control" defaultValue={item} />
					)}
				</div>
			</div>
		);
	}
}
