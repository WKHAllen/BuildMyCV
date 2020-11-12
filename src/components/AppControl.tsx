import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AppControl.css';
import ControlledSelect from './ControlledSelect';

export interface AppControlProps {
	cvOptions: string[];
	openCV: string;
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
				<div className="AppControl-Row row">
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
							className="btn btn-success btn-block">
								New CV
						</button>
					</div>
				</div>
				<div className="AppControl-Row row">
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
				</div>
				<div className="row">
					<div className="col-12">
						<button
							type="button"
							className="btn btn-secondary btn-block"
							onClick={() => this.props.resetExample()}>
								Reset example
						</button>
					</div>
				</div>
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
