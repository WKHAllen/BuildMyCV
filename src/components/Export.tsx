import React from 'react';
import '../css/Export.css';
import CV, { CVProps } from './CV';
import Modal from './Modal';

export interface ExportProps {
	cvData: CVProps;
}

export default class Export extends React.Component<ExportProps> {
	render() {
		return (
			<div className="AppExport">
				<CV
					{...this.props.cvData} />
				<Modal
					id="export-info-modal"
					title="Export your CV"
					buttonText="Export"
					open={true}
					onClose={() => setTimeout(window.print, 500)}>
						Click the button below to export your CV.
						A popup will appear prompting you to print the document.
						In the destination field, select to save it as a PDF.
						Deselect the "header and footer" and "background graphics" checkboxes.
						Once these options have been configured, click to save the PDF.
				</Modal>
			</div>
		);
	}
}
