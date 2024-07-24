export interface User {
	id: number;
	address: string;
	isBadgeholder: boolean;
}

export enum MinimumModalState {
	Shown,
	False,
	True,
}
