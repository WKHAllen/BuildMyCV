import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AppControl.css';

export interface AppControlProps {
	cvOptions: string[];
	openCV: string;
	resetExample: () => void;
	newCV: (cvName: string) => void;
}

export interface AppControlState {
	renameCVModalOpen: boolean;
	deleteCVModalOpen: boolean;
	newCVModalName: string;
	renameCVModalName: string;
}

export default class AppControl extends React.Component<AppControlProps, AppControlState> {
	constructor(props: AppControlProps) {
		super(props);

		this.state = {
			renameCVModalOpen: false,
			deleteCVModalOpen: false,
			newCVModalName: '',
			renameCVModalName: ''
		};
	}

	render() {
		return (
			<div className="AppControl">
				<div className="ExportButton">
					<Link
						to="/export"
						target="_blank"
						className="btn btn-primary btn-lg btn-block"
					>Export &rarr;</Link>
				</div>
				<Link
					to="/control"
					className="btn btn-success btn-block">
						Control Panel
				</Link>
				<button
					type="button"
					className="btn btn-secondary btn-block"
					onClick={() => this.props.resetExample()}>
						Reset example
				</button>
			</div>
		);
	}
}
