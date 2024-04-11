export interface Category {
	id: number;
	name: string;
	poll_id: number;
	url: string;
	impactDescription: string;
	contributionDescription: null | string;
	RPGF3Id: null | number;
	parentId: null | number;
	image: string;
	metadataUrl: null | string;
	created_at: string;
	type: string;
}

export interface Project {
	id: number;
	name: string;
	poll_id: number;
	url: string;
	impactDescription: string;
	contributionDescription: string | null;
	RPGF3Id: string | null;
	parentId: number | null;
	image: string | null;
	metadataUrl: string | null;
	created_at: string;
	type: 'collection' | 'project';
}
