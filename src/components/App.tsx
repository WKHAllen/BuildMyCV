import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../css/App.css';
import * as cvedit from '../cvedit';
import Editor from'./Editor';
import CV, { CVProps } from './CV';
import AppControl from './AppControl';
import Export from './Export';
import ControlPanel from './ControlPanel';
import Modal from './Modal';

export interface AppProps {
	example: CVProps;
}

export interface AppState {
	cvOptions: string[];
	openCV: string;
	cvData: CVProps;
}

export interface UpdateOptions {
	title?: string;
	subtitle?: string;
	headingInfo?: string[];
	headingInfoItem?: {
		index: number;
		value: string;
	};
	sectionItem?: {
		index: number;
		name?: string;
		subtext?: string;
		type?: string;
		content?: string | string[];
	};
	sections?: {
		name: string;
		subtext?: string;
		type: string;
		content: string | string[];
	}[];
}

export default class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);

		this.state = {
			cvOptions: [],
			openCV: 'example',
			cvData: this.duplicate(props.example)
		};

		this.onUpdate = this.onUpdate.bind(this);
		this.resetExample = this.resetExample.bind(this);
		this.selectCV = this.selectCV.bind(this);
		this.createCV = this.createCV.bind(this);
		this.renameCV = this.renameCV.bind(this);
		this.deleteCV = this.deleteCV.bind(this);
		this.importCV = this.importCV.bind(this);
	}

	componentDidMount() {
		if (cvedit.getCVNames().length === 0) {
			cvedit.setCV('example', { cv: this.props.example });
		}

		const cvOptions = cvedit.getCVNames();
		const openCV = cvedit.getOpen();
		this.setState({
			cvOptions: cvOptions,
			openCV: openCV || 'example',
			cvData: this.duplicate((cvedit.getCV(openCV || 'example') as cvedit.CVStructure).cv)
		});
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<div className="App">
							<div className="App-Left">
								<AppControl
									cvOptions={this.state.cvOptions}
									openCV={this.state.openCV}
									selectCV={this.selectCV}
									resetExample={this.resetExample} />
								<Editor
									openCV={this.state.openCV}
									cv={this.state.cvData}
									onUpdate={this.onUpdate} />
							</div>
							<div className="App-Right">
								<CV
									{...this.state.cvData} />
							</div>
						</div>
					</Route>
					<Route exact path="/control">
						<ControlPanel
							cvOptions={this.state.cvOptions}
							openCV={this.state.openCV}
							selectCV={this.selectCV}
							createCV={this.createCV}
							renameCV={this.renameCV}
							deleteCV={this.deleteCV}
							importCV={this.importCV}
							getCVData={cvedit.getCV} />
					</Route>
					<Route exact path="/export">
						<Export
							cvData={this.state.cvData} />
					</Route>
				</Switch>
				<Modal
					id="platform-warning-modal"
					title="Platform not supported"
					open={this.onMobile()}>
						This application is not designed to work on mobile devices.
						Please switch to a desktop device.
				</Modal>
				<Modal
					id="browser-warning-modal"
					title="Browser not supported"
					open={!this.onChromeLike()}>
						This application is designed to work on Chrome or a Chrome-like browser, such as Edge or Brave.
						You may find that some features do not work as intended.
						It is strongly advised that you switch to Chrome.
				</Modal>
			</Router>
		);
	}

	private onUpdate(options: UpdateOptions) {
		let newCVData = this.state.cvData;

		if (options.title !== undefined) {
			newCVData.header.title = options.title;
		}
		if (options.subtitle !== undefined) {
			newCVData.header.subtitle = options.subtitle;
		}
		if (options.headingInfo !== undefined) {
			newCVData.header.headingInfo = options.headingInfo;
		}
		if (options.headingInfoItem !== undefined) {
			newCVData.header.headingInfo[options.headingInfoItem.index] = options.headingInfoItem.value;
		}
		if (options.sectionItem !== undefined) {
			if (options.sectionItem.name !== undefined) {
				newCVData.body.sections[options.sectionItem.index].name = options.sectionItem.name;
			}
			if (options.sectionItem.subtext !== undefined) {
				newCVData.body.sections[options.sectionItem.index].subtext = options.sectionItem.subtext;
			}
			if (options.sectionItem.type !== undefined) {
				newCVData.body.sections[options.sectionItem.index].type = options.sectionItem.type;
			}
			if (options.sectionItem.content !== undefined) {
				newCVData.body.sections[options.sectionItem.index].content = options.sectionItem.content;
			}
		}
		if (options.sections !== undefined) {
			newCVData.body.sections = options.sections;
		}

		this.setState({
			cvData: newCVData
		});

		cvedit.setCV(this.state.openCV, { cv: newCVData });
	}

	private resetExample(): void {
		cvedit.setCV('example', { cv: this.props.example });
		cvedit.setOpen('example');
		this.setState({
			openCV: 'example',
			cvData: this.duplicate(this.props.example)
		});
	}

	private selectCV(cvName: string): void {
		cvedit.setOpen(cvName);
		this.setState({
			openCV: cvName,
			cvData: this.duplicate((cvedit.getCV(cvName) as cvedit.CVStructure).cv)
		});
	}

	private createCV(cvName: string): void {
		cvedit.setCV(cvName, { cv: this.props.example });
		cvedit.setOpen(cvName);
		const cvOptions = cvedit.getCVNames();
		this.setState({
			cvOptions: cvOptions,
			openCV: cvName,
			cvData: this.duplicate(this.props.example)
		});
	}

	private renameCV(cvName: string, newCVName: string): void {
		cvedit.renameCV(cvName, newCVName);
		const cvOptions = cvedit.getCVNames();
		this.setState({
			cvOptions: cvOptions,
		});
	}

	private deleteCV(cvName: string): void {
		if (cvName !== 'example') {
			cvedit.deleteCV(cvName);
			const cvOptions = cvedit.getCVNames();
			const openCV = cvOptions[0];
			cvedit.setOpen(openCV);
			this.setState({
				cvOptions: cvOptions,
				openCV: openCV
			});
		}
	}

	private importCV(cvName: string, cv: cvedit.CVStructure) {
		cvedit.setCV(cvName, cv);
		cvedit.setOpen(cvName);
		const cvOptions = cvedit.getCVNames();
		this.setState({
			cvOptions: cvOptions,
			openCV: cvName,
			cvData: this.duplicate(cv.cv)
		});
	}

	private duplicate(object: any): any {
		return JSON.parse(JSON.stringify(object));
	}

	private onMobile(): boolean {
		let check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
		return check;
	}

	private onChromeLike(): boolean {
		return 'chrome' in window;
	}
}
