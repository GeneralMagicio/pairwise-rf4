import { ICategory } from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface ICategoryResponse {
	collection: ICategory;
}

export const getCategoryById = async (
	id: number,
): Promise<AxiosResponse<ICategoryResponse>> => {
	return axios.get(`collection/${id}`);
};

export const useCategoryById = (id: number) => {
	return useQuery({
		queryKey: ['category', id],
		queryFn: () => getCategoryById(id),
	});
};
