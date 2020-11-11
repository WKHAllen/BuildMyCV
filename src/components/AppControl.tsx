import React from 'react';
import { Link } from 'react-router-dom';
import '../css/AppControl.css';

export interface AppControlProps {

}

export default class AppControl extends React.Component<AppControlProps> {
	render() {
		return (
			<div className="AppControl">
				<Link
					to="/export"
					target="_blank"
					className="btn btn-success btn-lg"
				>Export &rarr;</Link>
			</div>
		);
	}
}
