import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CategoryVoteData = {
	data: {
		collection1Id: number;
		collection2Id: number;
		pickedId: number;
	};
};

export const updateCategoryVote = ({ data }: CategoryVoteData) => {
	return axios.post('flow/collections/vote', data);
};

export const useUpdateCategoryVote = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCategoryVote,
		onSuccess: ({ data }) => {
			queryClient.refetchQueries({
				queryKey: ['category-pairs'],
			});
		},
	});
};
