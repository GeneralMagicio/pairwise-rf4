import { axios } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

type ProjectVoteData = {
	data: {
		cid: number;
	};
};

export const updatePairwiseFinish = ({ data }: ProjectVoteData) => {
	return axios.post('flow/finish', data);
};

export const useUpdatePairwiseFinish = () => {
	// const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updatePairwiseFinish,
		// onSuccess:
	});
};
