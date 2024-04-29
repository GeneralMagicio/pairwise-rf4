import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getIsUserLoggedIn = async (): Promise<AxiosResponse> => {
	return axios.get('auth/isLoggedIn');
};

export const useIsUserLoggedIn = () => {
	return useQuery({
		queryKey: ['isLoggedIn'],
		queryFn: getIsUserLoggedIn,
	});
};
