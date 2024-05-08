import {
	CollectionProgressStatus,
	ICategory,
	IProject,
} from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface IProjectsRankingResponse {
	ranking: IProject[];
	hasRanking: boolean;
	isFinished: boolean;
	progress: string;
	name: string;
	share: number;
	id: number;
}

export const getProjectsRankingByCategoryId = async (
	cid: number,
): Promise<AxiosResponse<IProjectsRankingResponse>> => {
	return axios.get(`flow/ranking?cid=${cid}
	`);
};

export const useProjectsRankingByCategoryId = (cid: number) => {
	return useQuery({
		queryKey: ['projects-ranking', cid],
		queryFn: () => getProjectsRankingByCategoryId(cid),
	});
};
