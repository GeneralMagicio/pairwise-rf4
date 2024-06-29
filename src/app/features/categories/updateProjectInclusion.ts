import { InclusionState } from '@/app/categories/types';
import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ProjectInclusionData = {
	data: {
		state: InclusionState;
		id: number; //project id
	};
};

export const updateProjectInclusion = ({ data }: ProjectInclusionData) => {
	return axios.post('/flow/projects/set-inclusion', data);
};

export const useUpdateProjectInclusion = ({
	categoryId,
}: {
	categoryId: number;
}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProjectInclusion,
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: ['projects', categoryId],
			});
		},
	});
};
