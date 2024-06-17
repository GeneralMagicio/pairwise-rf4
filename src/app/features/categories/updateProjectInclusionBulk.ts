import { InclusionState } from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ProjectInclusionBulkData = {
	data: {
		state: InclusionState;
		ids: number[]; //project id
	};
};

export const updateProjectInclusionBulk = ({
	data,
}: ProjectInclusionBulkData) => {
	return axios.post('/flow/projects/set-inclusion-bulk', data);
};

export const useUpdateProjectInclusionBulk = ({
	categoryId,
}: {
	categoryId: number;
}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProjectInclusionBulk,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['projects', categoryId],
			});
		},
	});
};
