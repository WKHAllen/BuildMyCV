import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AppControl.css';
import ControlledSelect from './ControlledSelect';

export interface AppControlProps {
	cvOptions: string[];
	openCV: string;
	selectCV: (cvName: string) => void;
	resetExample: () => void;
}

export default class AppControl extends React.Component<AppControlProps> {
	render() {
		return (
			<div className="AppControl">
				<Link
					to="/export"
					target="_blank"
					className="btn btn-primary btn-lg btn-block mb-2"
				>Export &rarr;</Link>
				<Link
					to="/control"
					className="btn btn-success btn-block mb-2">
						Control Panel
				</Link>
				<button
					type="button"
					className="btn btn-secondary btn-block mb-4"
					onClick={() => this.props.resetExample()}>
						Reset example
				</button>
				<div className="AppControl-SelectCV card mb-3">
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
