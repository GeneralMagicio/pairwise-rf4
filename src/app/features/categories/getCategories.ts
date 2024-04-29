import { ICategory } from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getCategories = async (): Promise<AxiosResponse<ICategory[]>> => {
	return axios.get('flow/collections');
};

export const useCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
	});
};
