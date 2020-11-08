import React from 'react';
import '../css/Section.css';

type sectionType = "string" | "list" | "shortlist" | "unbulletedlist";
type sectionContentType = string | string[];

export interface SectionProps {
	name: string;
	subtext?: string;
	type: sectionType;
	content: sectionContentType;
}

export default class Section extends React.Component<SectionProps> {
	renderString(content: string) {
		return content;
	}

	renderList(content: string[]) {
		return (
			<ul className="SectionContentList">
				{content.map((item: string) =>
					<li key={item}>{item}</li>
				)}
			</ul>
		);
	}

	renderShortList(content: string[]) {
		return (
			<ul className="SectionContentShortList">
				{content.map((item: string) =>
					<li key={item}>{item}</li>
				)}
			</ul>
		);
	}

	renderUnbulletedList(content: string[]) {
		return (
			<ul className="SectionContentUnbulletedList">
				{content.map((item: string) =>
					<li key={item}>{item}</li>
				)}
			</ul>
		);
	}

	getContent() {
		switch (this.props.type) {
			case "string":
				return this.renderString(this.props.content as string);
			case "list":
				return this.renderList(this.props.content as string[]);
			case "shortlist":
				return this.renderShortList(this.props.content as string[]);
			case "unbulletedlist":
				return this.renderUnbulletedList(this.props.content as string[]);
		}
	}

	render() {
		return (
			<div className="Section">
				<div className="SectionName">
					<h5>{this.props.name}</h5>
					{this.props.subtext ? <small>{this.props.subtext}</small> : null}
				</div>
				<div className="SectionContent">{this.getContent()}</div>
			</div>
		);
	}
}
