import React from 'react';
import '../css/CV.css';
import Header, { HeaderProps } from './Header';
import Body from './Body';

export interface CVProps {
	header: HeaderProps;
	body: any[];
}

export default class CV extends React.Component<CVProps> {
	render() {
		return (
			<div className="CV">
				<Header {...this.props.header} />
				<Body sections={this.props.body} />
			</div>
		);
	}
}
