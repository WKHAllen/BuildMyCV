import React from 'react';
import '../css/App.css';
import * as cvedit from '../cvedit';
import Editor from'./Editor';
import CV, { CVProps } from './CV';

export interface AppProps {
	example: CVProps;
}

export interface AppState {
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
}

export default class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {
			openCV: 'example',
			cvData: props.example
		};

		this.onUpdate = this.onUpdate.bind(this);
	}

	componentDidMount() {
		if (cvedit.getCVNames().length === 0) {
			cvedit.setCV('example', { cv: this.props.example });
		}

		const openCV = cvedit.getOpen();
		this.setState({
			openCV: openCV || 'example',
			cvData: (cvedit.getCV(openCV || 'example') as cvedit.CVStructure).cv
		});
	}

	render() {
		return (
			<div className="App Side-By-Side-Container">
				<div className="Side-By-Side">
					<Editor
						cv={this.state.cvData}
						onUpdate={this.onUpdate} />
				</div>
				<div className="Side-By-Side">
					<CV {...this.state.cvData} />
				</div>
			</div>
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

		this.setState({
			cvData: newCVData
		});

		cvedit.setCV(this.state.openCV, { cv: newCVData });
	}
}
