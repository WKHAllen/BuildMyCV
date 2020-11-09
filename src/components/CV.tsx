import React from 'react';
import '../css/CV.css';
import Header, { HeaderProps } from './Header';
import Body, { BodyProps } from './Body';

export interface CVProps {
	header: HeaderProps;
	body: BodyProps;
}

export default class CV extends React.Component<CVProps> {
	render() {
		return (
			<div className="CV">
				<Header {...this.props.header} />
				<Body {...this.props.body} />
			</div>
		);
	}
}
