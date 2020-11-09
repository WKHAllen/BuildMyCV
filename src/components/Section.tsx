import React from 'react';
import '../css/Section.css';

export type SectionType = "string" | "list" | "shortlist" | "unbulletedlist";
export type SectionContentType = string | string[];

export interface SectionProps {
	name: string;
	subtext?: string;
	type: string;
	content: SectionContentType;
}

export default class Section extends React.Component<SectionProps> {
	renderString(content: string) {
		return content;
	}

	renderList(content: string[]) {
		return (
			<ul className="SectionContentList">
				{content.map((item: string, index: number) =>
					<li key={index}>{item}</li>
				)}
			</ul>
		);
	}

	renderShortList(content: string[]) {
		return (
			<ul className="SectionContentShortList">
				{content.map((item: string, index: number) =>
					<li key={index}>{item}</li>
				)}
			</ul>
		);
	}

	renderUnbulletedList(content: string[]) {
		return (
			<ul className="SectionContentUnbulletedList">
				{content.map((item: string, index: number) =>
					<li key={index}>{item}</li>
				)}
			</ul>
		);
	}

	getContent() {
		switch (this.props.type as SectionType) {
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
