import {
	CollectionProgressStatus,
	ICategory,
	IProject,
} from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface IPairwisePairsResponse {
	pairs: IProject[][];
	totalPairs: number;
	votedPairs: number;
	name: string;
	threshold: number;
}

export const getPairwisePairs = async (
	cid: number,
): Promise<AxiosResponse<IPairwisePairsResponse>> => {
	return axios.get(`flow/pairs?cid=${cid}`);
};

export const useGetPairwisePairs = (cid: number) => {
	return useQuery({
		queryKey: ['pairwise-pairs', cid],
		queryFn: () => getPairwisePairs(cid),
	});
};
