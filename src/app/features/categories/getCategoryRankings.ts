import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { IProjectsRankingResponse } from './getProjectsRankingByCategoryId';
import { ICategory } from '@/app/categories/types';

interface ICategoryRankingResponse extends Omit<IProjectsRankingResponse, "ranking"> {
	ranking: ICategory[]
}

export const getCategoryRankings =
	async (): Promise<ICategoryRankingResponse> => {
		const res = await axios.get(`flow/ranking
	`);

		return res.data;
	};

export const useCategoryRankings = () => {
	return useQuery({
		queryKey: ['category-ranking'],
		queryFn: () => getCategoryRankings(),
	});
};
