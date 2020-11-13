import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../css/App.css';
import * as cvedit from '../cvedit';
import Editor from'./Editor';
import CV, { CVProps } from './CV';
import AppControl from './AppControl';
import Export from './Export';
import ControlPanel from './ControlPanel';

export interface AppProps {
	example: CVProps;
}

export interface AppState {
	cvOptions: string[];
	openCV: string;
	cvData: CVProps;
}

export interface UpdateOptions {
	title?: string;
	subtitle?: string;
	headingInfo?: string[];
	headingInfoItem?: {
		index: number;
		value: string;
	};
	sectionItem?: {
		index: number;
		name?: string;
		subtext?: string;
		type?: string;
		content?: string | string[];
	};
	sections?: {
		name: string;
		subtext?: string;
		type: string;
		content: string | string[];
	}[];
}

export default class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {
			cvOptions: [],
			openCV: 'example',
			cvData: this.duplicate(props.example)
		};

		this.onUpdate = this.onUpdate.bind(this);
		this.resetExample = this.resetExample.bind(this);
		this.selectCV = this.selectCV.bind(this);
		this.createCV = this.createCV.bind(this);
		this.renameCV = this.renameCV.bind(this);
		this.deleteCV = this.deleteCV.bind(this);
		this.importCV = this.importCV.bind(this);
	}

	componentDidMount() {
		if (cvedit.getCVNames().length === 0) {
			cvedit.setCV('example', { cv: this.props.example });
		}

		const cvOptions = cvedit.getCVNames();
		const openCV = cvedit.getOpen();
		this.setState({
			cvOptions: cvOptions,
			openCV: openCV || 'example',
			cvData: this.duplicate((cvedit.getCV(openCV || 'example') as cvedit.CVStructure).cv)
		});
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<div className="App">
							<div className="App-Left">
								<AppControl
									cvOptions={this.state.cvOptions}
									openCV={this.state.openCV}
									selectCV={this.selectCV}
									resetExample={this.resetExample} />
								<Editor
									openCV={this.state.openCV}
									cv={this.state.cvData}
									onUpdate={this.onUpdate} />
							</div>
							<div className="App-Right">
								<CV
									{...this.state.cvData} />
							</div>
						</div>
					</Route>
					<Route exact path="/control">
						<ControlPanel
							cvOptions={this.state.cvOptions}
							openCV={this.state.openCV}
							selectCV={this.selectCV}
							createCV={this.createCV}
							renameCV={this.renameCV}
							deleteCV={this.deleteCV}
							importCV={this.importCV}
							getCVData={cvedit.getCV} />
					</Route>
					<Route exact path="/export">
						<Export
							cvData={this.state.cvData} />
					</Route>
				</Switch>
			</Router>
		);
	}

	private onUpdate(options: UpdateOptions) {
		let newCVData = this.state.cvData;

		if (options.title !== undefined) {
			newCVData.header.title = options.title;
		}
		if (options.subtitle !== undefined) {
			newCVData.header.subtitle = options.subtitle;
		}
		if (options.headingInfo !== undefined) {
			newCVData.header.headingInfo = options.headingInfo;
		}
		if (options.headingInfoItem !== undefined) {
			newCVData.header.headingInfo[options.headingInfoItem.index] = options.headingInfoItem.value;
		}
		if (options.sectionItem !== undefined) {
			if (options.sectionItem.name !== undefined) {
				newCVData.body.sections[options.sectionItem.index].name = options.sectionItem.name;
			}
			if (options.sectionItem.subtext !== undefined) {
				newCVData.body.sections[options.sectionItem.index].subtext = options.sectionItem.subtext;
			}
			if (options.sectionItem.type !== undefined) {
				newCVData.body.sections[options.sectionItem.index].type = options.sectionItem.type;
			}
			if (options.sectionItem.content !== undefined) {
				newCVData.body.sections[options.sectionItem.index].content = options.sectionItem.content;
			}
		}
		if (options.sections !== undefined) {
			newCVData.body.sections = options.sections;
		}

		this.setState({
			cvData: newCVData
		});

		cvedit.setCV(this.state.openCV, { cv: newCVData });
	}

	private resetExample(): void {
		cvedit.setCV('example', { cv: this.props.example });
		cvedit.setOpen('example');
		this.setState({
			openCV: 'example',
			cvData: this.duplicate(this.props.example)
		});
	}

	private selectCV(cvName: string): void {
		cvedit.setOpen(cvName);
		this.setState({
			openCV: cvName,
			cvData: this.duplicate((cvedit.getCV(cvName) as cvedit.CVStructure).cv)
		});
	}

	private createCV(cvName: string): void {
		cvedit.setCV(cvName, { cv: this.props.example });
		cvedit.setOpen(cvName);
		const cvOptions = cvedit.getCVNames();
		this.setState({
			cvOptions: cvOptions,
			openCV: cvName,
			cvData: this.duplicate(this.props.example)
		});
	}

	private renameCV(cvName: string, newCVName: string): void {
		cvedit.renameCV(cvName, newCVName);
		const cvOptions = cvedit.getCVNames();
		this.setState({
			cvOptions: cvOptions,
		});
	}

	private deleteCV(cvName: string): void {
		if (cvName !== 'example') {
			cvedit.deleteCV(cvName);
			const cvOptions = cvedit.getCVNames();
			const openCV = cvOptions[0];
			cvedit.setOpen(openCV);
			this.setState({
				cvOptions: cvOptions,
				openCV: openCV
			});
		}
	}

	private importCV(cvName: string, cv: cvedit.CVStructure) {
		cvedit.setCV(cvName, cv);
		cvedit.setOpen(cvName);
		const cvOptions = cvedit.getCVNames();
		this.setState({
			cvOptions: cvOptions,
			openCV: cvName,
			cvData: this.duplicate(cv.cv)
		});
	}

	private duplicate(object: any): any {
		return JSON.parse(JSON.stringify(object));
	}
}
