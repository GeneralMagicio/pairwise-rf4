import { InclusionState } from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CategoryMarkFilteredData = {
	data: {
		cid: number; //Category ID
	};
};

export const updateCategoryMarkFiltered = ({
	data,
}: CategoryMarkFilteredData) => {
	return axios.post('/flow/mark-filtered', data);
};

export const useUpdateCategoryMarkFiltered = ({
	categoryId,
}: {
	categoryId: number;
}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCategoryMarkFiltered,
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: ['category', categoryId],
			});
		},
	});
};
