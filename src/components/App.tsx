import React from 'react';
import '../css/App.css';
import Editor from'./Editor';
import CV, { CVProps } from './CV';

export interface AppProps {
	cv: CVProps;
}

export default class App extends React.Component<AppProps> {
	render() {
		return (
			<div className="App Side-By-Side-Container">
				<div className="Side-By-Side">
					<Editor />
				</div>
				<div className="Side-By-Side">
					<CV {...this.props.cv} />
				</div>
			</div>
		);
	}
}
