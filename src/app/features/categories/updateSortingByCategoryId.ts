import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ProjectVoteData = {
	data: {
		collectionId: number;
		projectIds: number[];
	};
};

export const updateSortingByCategoryId = ({ data }: ProjectVoteData) => {
	return axios.post('flow/dnd', data);
};

export const useUpdateSortingByCategoryId = ({
	categoryId,
}: {
	categoryId: number;
}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateSortingByCategoryId,
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: ['category', categoryId],
			});
		},
	});
};
