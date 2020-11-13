import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ControlPanel.css';
import ControlledInput from './ControlledInput';
import ControlledSelect from './ControlledSelect';
import { CVStructure, assertCVStructure } from '../cvedit';

export interface ControlPanelProps {
	cvOptions: string[];
	openCV: string;
	selectCV: (cvName: string) => void;
	createCV: (cvName: string) => void;
	renameCV: (cvName: string, newCVName: string) => void;
	deleteCV: (cvName: string) => void;
	importCV: (cvName: string, cv: CVStructure) => void;
	getCVData: (cvName: string) => CVStructure | null;
}

export interface ControlPanelState {
	newCVName: string;
	selectedRenameCV: string;
	renamedCVName: string;
	selectedDeleteCV: string;
	importJSONName: string;
	importJSONValue: string;
	importJSONValueGood: boolean;
	selectedJSONExportCV: string;
}

export default class ControlPanel extends React.Component<ControlPanelProps, ControlPanelState> {
	constructor(props: ControlPanelProps) {
		super(props);

		this.state = {
			newCVName: '',
			selectedRenameCV: props.openCV,
			renamedCVName: props.openCV,
			selectedDeleteCV: props.openCV,
			importJSONName: '',
			importJSONValue: '',
			importJSONValueGood: false,
			selectedJSONExportCV: props.openCV
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
				<div className="ControlPanel-Card card mb-3">
					<div className="card-body">
						<h3 className="card-title">Import JSON</h3>
						<form onSubmit={(event) => this.onImportJSON(event)}>
							<div className="row">
								<div className="col-4">
									<ControlledInput
										className="form-control"
										placeholder="CV name"
										id="import-json-name"
										value={this.state.importJSONName}
										onChange={(event) => this.setState({ importJSONName: event.target.value })} />
								</div>
								<div className="col-4">
									<ControlledInput
										className="form-control"
										placeholder="JSON"
										id="import-json-input"
										value={this.state.importJSONValue}
										onChange={(event) => this.onImportJSONInputChange(event)} />
								</div>
								<div className="col-4">
									<button
										type="submit"
										className="btn btn-success btn-block"
										disabled={!this.state.importJSONValueGood}>
											Import
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="ControlPanel-Card card">
					<div className="card-body">
						<h3 className="card-title">Export JSON</h3>
						<form onSubmit={(event) => this.onImportJSON(event)}>
							<div className="row mb-3">
								<div className="col-8">
									<ControlledSelect
										className="form-control"
										id="export-cv-select"
										options={this.arrayToMap(this.props.cvOptions)}
										value={this.state.selectedJSONExportCV}
										onChange={(event) => this.setState({ selectedJSONExportCV: event.target.value })} />
								</div>
								<div className="col-4">
									<button
										type="submit"
										className="btn btn-primary btn-block"
										onClick={() => this.copyToClipboard(JSON.stringify(this.props.getCVData(this.state.selectedJSONExportCV)))}>
											Copy JSON
									</button>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<code className="ControlPanel-ExportedJSON">{JSON.stringify(this.props.getCVData(this.state.selectedJSONExportCV))}</code>
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

		if (this.state.selectedDeleteCV === this.state.selectedRenameCV) {
			this.setState({
				selectedRenameCV: 'example'
			});
		}
		if (this.state.selectedDeleteCV === this.state.selectedJSONExportCV) {
			this.setState({
				selectedJSONExportCV: 'example'
			});
		}
	}

	private onImportJSONInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
		let cvData: CVStructure | null;
		try {
			cvData = (JSON.parse(event.target.value) as CVStructure);
			if (!assertCVStructure(cvData)) {
				cvData = null;
			}
		} catch (ex) {
			cvData = null;
		}

		this.setState({
			importJSONValue: event.target.value,
			importJSONValueGood: cvData !== null
		});
	}

	private onImportJSON(event: React.FormEvent<HTMLFormElement>): void {
		event.preventDefault();

		if (this.state.importJSONValueGood) {
			this.props.importCV(this.state.importJSONName, (JSON.parse(this.state.importJSONValue) as CVStructure));
		}
	}

	private arrayToMap(arr: any[]): any {
		let arrayMap: any = {};
		for (const value of arr) {
			arrayMap[value] = value;
		}
		return arrayMap;
	}

	private copyToClipboard(text: string) {
		const copyText = document.createElement('input');
		copyText.value = text;
		document.body.appendChild(copyText);
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand('copy');
		document.body.removeChild(copyText);
	}
}
