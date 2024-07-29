import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ProjectVoteData = {
	data: {
		project1Id: number;
		project2Id: number;
		pickedId: number | null;
	};
};

export const updateProjectVote = ({ data }: ProjectVoteData) => {
	return axios.post('flow/projects/vote', data);
};

export const useUpdateProjectVote = ({
	categoryId,
}: {
	categoryId: number;
}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProjectVote,
		onSuccess: ({ data }) => {
			console.log('OnSuccess', data);
			queryClient.refetchQueries({
				queryKey: ['pairwise-pairs', categoryId],
			});
		},
	});
};
