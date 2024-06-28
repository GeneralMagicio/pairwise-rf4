export interface ICategory {
	id: number;
	name: string;
	poll_id: number;
	url: string;
	impactDescription: string;
	contributionDescription: null | string;
	RPGF4Id: null | number;
	parentId: null | number;
	image: string | null;
	metadataUrl: null | string;
	created_at: string;
	type: string;
	progress: CollectionProgressStatus;
}

export enum InclusionState {
	Included = 'included',
	Excluded = 'excluded',
	Pending = 'pending',
}

export interface IProject {
	id: number;
	name: string;
	poll_id: number;
	url: string;
	impactDescription: string;
	shortDescription: string | null;
	contributionDescription: string | null;
	RPGF4Id: string;
	parentId: number | null;
	image: string | null;
	metadataUrl: string | null;
	created_at: string;
	type: 'collection' | 'project';
	inclusionState: InclusionState;
}

export type CollectionProgressStatus =
	| 'Attested'
	| 'Finished'
	| 'WIP - Threshold'
	| 'WIP'
	| 'Filtered'
	| 'Filtering'
	| 'Pending';
