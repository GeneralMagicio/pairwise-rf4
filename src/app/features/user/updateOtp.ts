import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ProjectVoteData = {
	data: {
		otp: string;
	};
};

export const updateOtp = ({ data }: ProjectVoteData) => {
	return axios.post('auth/otp/validate', data);
};

export const useUpdateOtp = () => {
	return useMutation({
		mutationFn: updateOtp,
	});
};
