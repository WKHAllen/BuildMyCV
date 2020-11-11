import React from 'react';
import '../css/Modal.css';

export interface ModalProps {
	id: string;
	title: string;
	buttonText?: string;
	open?: boolean;
	onClose?: () => void;
}

export interface ModalState {
	open: boolean;
}

export default class Modal extends React.Component<ModalProps, ModalState> {
	constructor(props: ModalProps) {
		super(props);

		this.state = {
			open: props.open || false
		};
	}

	render() {
		return (
			<div>
				<div className="modal fade" id={this.props.id} tabIndex={-1}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id={`${this.props.id}-label`}>{this.props.title}</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								{this.props.children}
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary"
									data-dismiss="modal"
									onClick={() => {
										if (this.props.onClose) {
											this.props.onClose();
										}
									}}
								>{this.props.buttonText || 'Close'}</button>
							</div>
						</div>
					</div>
				</div>
				<button type="button" className="btn btn-primary hidden" id={`${this.props.id}-trigger`} data-toggle="modal" data-target={`#${this.props.id}`}>
					...
				</button>
			</div>
		);
	}

	componentDidMount() {
		if (this.props.open) {
			(document.getElementById(`${this.props.id}-trigger`) as HTMLButtonElement).click();
		}
	}
}
