const cvNamesKey = 'CVNames';
const cvOpenKey = 'CVOpen';
const cvKeyPrefix = 'CV-';

export interface CVStructure {
	cv: {
		header: {
			title: string;
			subtitle?: string;
			headingInfo: string[];
		};
		body: {
			sections: {
				name: string;
				subtext?: string;
				type: string;
				content: string | string[];
			}[];
		};
	}
}

export function getCVNames(): string[] {
	const cvNamesString = localStorage.getItem(cvNamesKey);
	if (cvNamesString === null) {
		return [];
	} else {
		return JSON.parse(cvNamesString);
	}
}

export function cvExists(cvName: string): boolean {
	return localStorage.getItem(cvKeyPrefix + cvName) !== null;
}

export function getCV(cvName: string): CVStructure | null {
	const cvString = localStorage.getItem(cvKeyPrefix + cvName);
	if (cvString === null) {
		return null;
	} else {
		return JSON.parse(cvString);
	}
}

export function setCV(cvName: string, cv: CVStructure): void {
	const cvString = JSON.stringify(cv);
	localStorage.setItem(cvKeyPrefix + cvName, cvString);
	let cvNames = getCVNames();
	if (!cvNames.includes(cvName)) {
		cvNames.push(cvName);
		localStorage.setItem(cvNamesKey, JSON.stringify(cvNames));
	}
}

export function renameCV(cvName: string, newCVName: string): void {
	const cvData = localStorage.getItem(cvName);
	if (cvData !== null) {
		localStorage.setItem(cvKeyPrefix + newCVName, cvData);
		localStorage.removeItem(cvKeyPrefix + cvName);
	}
}

export function deleteCV(cvName: string): void {
	localStorage.removeItem(cvKeyPrefix + cvName);
}

export function getOpen(): string | null {
	return localStorage.getItem(cvOpenKey);
}

export function setOpen(cvName: string): void {
	localStorage.setItem(cvOpenKey, cvName);
}
