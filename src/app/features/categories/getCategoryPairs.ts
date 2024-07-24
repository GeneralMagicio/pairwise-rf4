import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { IPairwisePairsResponse } from './getPairwisePairs';

export const getCategoryPairs = async (): Promise<
	IPairwisePairsResponse['pairs'][0]
> => {
	const res = await axios.get(`flow/pairs`);
	return res.data;
};

export const useGetCategoryPairs = () => {
	return useQuery({
		queryKey: ['category-pairs'],
		queryFn: () => getCategoryPairs(),
	});
};
