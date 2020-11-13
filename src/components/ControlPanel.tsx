import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ControlPanel.css';
import ControlledSelect from './ControlledSelect';

export interface ControlPanelProps {
	cvOptions: string[];
	openCV: string;
	selectCV: (cvName: string) => void;
}

export interface ControlPanelState {
	cvOptions: string[];
	openCV: string;
}

export default class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {
	constructor(props: ControlPanelProps) {
		super(props);

		this.state = {
			cvOptions: props.cvOptions,
			openCV: props.openCV
		};
	}

	render() {
		return (
			<div className="ControlPanel">
				<h1 className="ControlPanel-Header">Control Panel</h1>
				<Link
					to="/"
					className="btn btn-primary btn-block mb-3">
						&larr; Return to home page
				</Link>
				<div className="card mb-3">
					<div className="card-body">
						<h3 className="card-title">Select CV</h3>
						<ControlledSelect
							className="form-control"
							id="cv-select"
							options={this.arrayToMap(this.props.cvOptions)}
							value={this.props.openCV}
							onChange={(event) => this.props.selectCV(event.target.value)} />
					</div>
				</div>
				{/* <div className="ControlPanel-Row row">
					<div className="col-6">
						<ControlledSelect
							className="form-control"
							id="cv-select"
							options={this.arrayToMap(this.props.cvOptions)}
							value={this.props.openCV} />
					</div>
					<div className="col-6">
						<button
							type="button"
							className="btn btn-success btn-block"
							data-toggle="modal"
							data-target="#exampleModal">
								New CV
						</button>
					</div>
				</div>
				<div className="ControlPanel-Row row">
					<div className="col-6">
						<button
							type="button"
							className="btn btn-warning btn-block">
								Rename CV
						</button>
					</div>
					<div className="col-6">
						<button
							type="button"
							className="btn btn-danger btn-block">
								Delete CV
						</button>
					</div>
				</div> */}
			</div>
		);
	}

	private arrayToMap(arr: any[]): any {
		let arrayMap: any = {};
		for (const value of arr) {
			arrayMap[value] = value;
		}
		return arrayMap;
	}
}
