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

export default class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {
			openCV: 'example',
			cvData: props.example
		};
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
						onUpdate={() => this.onUpdate()} />
				</div>
				<div className="Side-By-Side">
					<CV {...this.state.cvData} />
				</div>
			</div>
		);
	}

	private onUpdate() {
		const title = (document.getElementById('name-input') as HTMLInputElement).value;
		const subtitle = (document.getElementById('subtitle-input') as HTMLInputElement).value;
		const headingInfo = this.getElementsByClassName('Header-Info-Item').map((element) => (element as HTMLInputElement).value);

		const newCVData: CVProps = {
			header: {
				title,
				subtitle,
				headingInfo
			},
			body: this.state.cvData.body
		};

		this.setState({
			cvData: newCVData
		});

		cvedit.setCV(this.state.openCV, { cv: newCVData });
	}

	private getElementsByClassName(className: string): Element[] {
		let elements = [];
		const returnedElements = document.getElementsByClassName(className);
		for (let i = 0; i < returnedElements.length; i++) {
			elements.push(returnedElements.item(i) as Element);
		}
		return elements;
	}
}
