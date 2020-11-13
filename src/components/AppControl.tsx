import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AppControl.css';

export interface AppControlProps {
	resetExample: () => void;
}

export default class AppControl extends React.Component<AppControlProps> {
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
