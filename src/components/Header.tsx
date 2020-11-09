import React from 'react';
import '../css/Header.css';

export interface HeaderProps {
	title: string;
	subtitle?: string;
	headingInfo: string[];
}

export default class Header extends React.Component<HeaderProps> {
	render() {
		return (
			<div className="Header">
				<h1 className="Title">{this.props.title}</h1>
				{this.props.subtitle ? <small className="Subtitle">{this.props.subtitle}</small> : null}
				<ul className="HeadingInfo">
					{this.props.headingInfo.map((info: string, index: number) =>
						<li key={index}>{info}</li>
					)}
				</ul>
				<hr />
			</div>
		);
	}
}
