import { ICategory, IProject } from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getProjectsByCategoryId = async (
	id: number,
): Promise<AxiosResponse<IProject[]>> => {
	return axios.get(`flow/projects?cid=${id}`);
};

export const useProjectsByCategoryId = (id: number) => {
	return useQuery({
		queryKey: ['projects', id],
		queryFn: () => getProjectsByCategoryId(id),
	});
};
