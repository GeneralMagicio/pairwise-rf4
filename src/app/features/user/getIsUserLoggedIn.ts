import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const getIsUserLoggedIn = async () => {
	return axios.get('/auth/isLoggedIn');
};

export const useIsUserLoggedIn = () => {
	return useQuery({
		queryKey: ['isLoggedIn'],
		queryFn: getIsUserLoggedIn,
	});
};
