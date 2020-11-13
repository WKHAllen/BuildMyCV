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

function assertArrayOf(arr: any[], type: string): boolean {
	if (!Array.isArray(arr)) return false;
	for (const element of arr)
		if (typeof element !== type)
			return false;
	return true;
}

export function assertCVStructure(cvData: CVStructure): boolean {
	if (cvData.cv === undefined) return false;
	if (cvData.cv.header === undefined) return false;
	if (cvData.cv.header.title === undefined || typeof cvData.cv.header.title !== 'string') return false;
	if (cvData.cv.header.subtitle !== undefined && typeof cvData.cv.header.subtitle !== 'string') return false;
	if (cvData.cv.header.headingInfo === undefined || !assertArrayOf(cvData.cv.header.headingInfo, 'string')) return false;
	if (cvData.cv.body === undefined) return false;
	if (cvData.cv.body.sections === undefined || !Array.isArray(cvData.cv.body.sections)) return false;
	for (const section of cvData.cv.body.sections) {
		if (section.name === undefined || typeof section.name !== 'string') return false;
		if (section.subtext !== undefined && typeof section.subtext !== 'string') return false;
		if (section.type === undefined || typeof section.type !== 'string') return false;
		if (section.content === undefined || (typeof section.content !== 'string' && !assertArrayOf(section.content, 'string'))) return false;
	}
	return true;
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
	if (cvName !== newCVName) {
		const cvData = localStorage.getItem(cvKeyPrefix + cvName);
		if (cvData !== null) {
			localStorage.setItem(cvKeyPrefix + newCVName, cvData);
			localStorage.removeItem(cvKeyPrefix + cvName);
			let cvNames = getCVNames();
			const nameIndex = cvNames.indexOf(cvName);
			if (nameIndex !== -1) {
				cvNames[nameIndex] = newCVName;
				localStorage.setItem(cvNamesKey, JSON.stringify(cvNames));
			}
		}
	}
}

export function deleteCV(cvName: string): void {
	localStorage.removeItem(cvKeyPrefix + cvName);
	let cvNames = getCVNames();
	const nameIndex = cvNames.indexOf(cvName);
	if (nameIndex !== -1) {
		cvNames.splice(nameIndex, 1);
		localStorage.setItem(cvNamesKey, JSON.stringify(cvNames));
	}
}

export function getOpen(): string | null {
	return localStorage.getItem(cvOpenKey);
}

export function setOpen(cvName: string): void {
	localStorage.setItem(cvOpenKey, cvName);
}
