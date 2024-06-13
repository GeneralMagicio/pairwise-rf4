import { axios } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

type ProjectVoteData = {
	data: {
		otp: string;
	};
};

export const updateOtp = ({ data }: ProjectVoteData) => {
	return axios.post<string>('auth/otp/validate', data);
};

export const useUpdateOtp = () => {
	return useMutation({
		mutationFn: updateOtp,
	});
};
