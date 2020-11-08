import React from 'react';
import '../css/Body.css';
import Section, { SectionProps } from './Section';

export interface BodyProps {
	sections: SectionProps[];
}

export default class Body extends React.Component<BodyProps> {
	render() {
		return (
			<div className="Body">
				{this.props.sections.map((section: SectionProps, index: number) =>
					<Section
						name={section.name}
						subtext={section.subtext}
						type={section.type}
						content={section.content}
						key={index} />
				)}
			</div>
		);
	}
}
