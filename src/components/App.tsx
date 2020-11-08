import React from 'react';
import '../css/App.css';
import CV, { CVProps } from './CV';

export interface AppProps {
	cv: CVProps;
}

export default class App extends React.Component<AppProps> {
	render() {
		return (
			<div className="App">
				<CV {...this.props.cv} />
			</div>
		);
	}
}
