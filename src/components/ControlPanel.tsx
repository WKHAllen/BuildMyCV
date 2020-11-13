import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ControlPanel.css';
import ControlledInput from './ControlledInput';
import ControlledSelect from './ControlledSelect';

export interface ControlPanelProps {
	cvOptions: string[];
	openCV: string;
	selectCV: (cvName: string) => void;
	createCV: (cvName: string) => void;
	renameCV: (cvName: string, newCVName: string) => void;
	deleteCV: (cvName: string) => void;
}

export interface ControlPanelState {
	newCVName: string;
	selectedRenameCV: string;
	renamedCVName: string;
	selectedDeleteCV: string;
}

export default class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {
	constructor(props: ControlPanelProps) {
		super(props);

		this.state = {
			newCVName: '',
			selectedRenameCV: props.openCV,
			renamedCVName: props.openCV,
			selectedDeleteCV: props.openCV
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
				<div className="ControlPanel-Card card mb-3">
					<div className="card-body">
						<h3 className="card-title">New CV</h3>
						<form onSubmit={(event) => this.onNewCVSubmit(event)}>
							<div className="row">
								<div className="col-8">
									<ControlledInput
										type="text"
										className="form-control"
										id="new-cv-input"
										value={this.state.newCVName}
										placeholder="CV name"
										onChange={(event) => this.setState({ newCVName: event.target.value })} />
								</div>
								<div className="col-4">
									<button
										type="submit"
										className="btn btn-success btn-block">
											Create
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="ControlPanel-Card card mb-3">
					<div className="card-body">
						<h3 className="card-title">Rename CV</h3>
						<form onSubmit={(event) => this.onRenameCVSubmit(event)}>
							<div className="row">
								<div className="col-4">
									<ControlledSelect
										className="form-control"
										id="rename-cv-select"
										options={this.arrayToMap(this.props.cvOptions)}
										value={this.state.selectedRenameCV}
										onChange={(event) => this.setState({
											selectedRenameCV: event.target.value,
											renamedCVName: event.target.value
										})} />
								</div>
								<div className="col-4">
									<ControlledInput
										type="text"
										className="form-control"
										id="rename-cv-input"
										value={this.state.renamedCVName}
										placeholder="New CV name"
										onChange={(event) => this.setState({ renamedCVName: event.target.value })} />
								</div>
								<div className="col-4">
									<button
										type="submit"
										className="btn btn-primary btn-block">
											Rename
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="ControlPanel-Card card mb-3">
					<div className="card-body">
						<h3 className="card-title">Delete CV</h3>
						<form onSubmit={(event) => this.onDeleteCVSubmit(event)}>
							<div className="row">
								<div className="col-8">
									<ControlledSelect
										className="form-control"
										id="delete-cv-select"
										options={this.arrayToMap(this.props.cvOptions)}
										value={this.state.selectedDeleteCV}
										onChange={(event) => this.setState({ selectedDeleteCV: event.target.value })} />
								</div>
								<div className="col-4">
									<button
										type="submit"
										className="btn btn-danger btn-block">
											Delete
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}

	private onNewCVSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		this.props.createCV(this.state.newCVName);
		this.props.selectCV(this.state.newCVName);
	}

	private onRenameCVSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		this.props.renameCV(this.state.selectedRenameCV, this.state.renamedCVName);
		this.setState({
			selectedRenameCV: this.state.renamedCVName
		});
		this.props.selectCV(this.state.renamedCVName);
	}

	private onDeleteCVSubmit(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		this.props.deleteCV(this.state.selectedDeleteCV);
	}

	private arrayToMap(arr: any[]): any {
		let arrayMap: any = {};
		for (const value of arr) {
			arrayMap[value] = value;
		}
		return arrayMap;
	}
}
