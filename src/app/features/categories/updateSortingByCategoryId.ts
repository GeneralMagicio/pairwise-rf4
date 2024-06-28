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
			// Flatten the array of query keys
			const queryKeys = [
				['category', categoryId],
				['projects-ranking', categoryId],
				['projects', categoryId],
			];

			queryKeys.forEach(queryKey => {
				queryClient.refetchQueries({ queryKey });
			});
		},
	});
};
