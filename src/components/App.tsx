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
			cvData: (cvedit.getCV(openCV || 'example') as cvedit.cvStructure).cv
		});
	}

	render() {
		return (
			<div className="App Side-By-Side-Container">
				<div className="Side-By-Side">
					<Editor cv={this.props.example} />
				</div>
				<div className="Side-By-Side">
					<CV {...this.props.example} />
				</div>
			</div>
		);
	}
}
