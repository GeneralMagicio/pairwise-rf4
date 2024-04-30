import { ICategory } from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getCategoryById = async (
	id: number,
): Promise<AxiosResponse<ICategory>> => {
	return axios.get(`flow/collections?cid=${id}`);
};

export const useCategoryById = (id: number) => {
	return useQuery({
		queryKey: ['category', id],
		queryFn: () => getCategoryById(id),
	});
};
