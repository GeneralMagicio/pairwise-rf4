// /auth/otp

import { ICategory } from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const getOtp = async (): Promise<AxiosResponse> => {
	return axios.get('auth/otp');
};

export const useGetOtp = () => {
	return useQuery({
		queryKey: ['otp'],
		queryFn: getOtp,
	});
};
