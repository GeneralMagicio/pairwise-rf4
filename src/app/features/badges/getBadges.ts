import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {axios} from '@/lib/axios';
import { BadgeData } from '@/app/badges/components/BadgeCard';
import { Identity } from '@semaphore-protocol/identity';

const continueGuest = async () => {
	await axios.post('/user/continue-guest');
};

/**
 * 
 * @returns badges stored in the Pairwise database for a given smart wallet addresss
 */
export const useContinueGuest = () => {
	const queryClient = useQueryClient();
	
	return useMutation({
		mutationFn: continueGuest,
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: ['badges'],
			});
			queryClient.refetchQueries({
				queryKey: ['identity'],
			});
		},
	});
};

const getBadges = async () => {
	const { data } = await axios.get<BadgeData | null>('/user/badges');
	return data;
};

/**
 * 
 * @returns badges stored in the Pairwise database for a given smart wallet addresss
 */
export const useGetBadges = () => {
	return useQuery({
		queryKey: ['badges'],
		queryFn: getBadges,
		refetchOnWindowFocus: "always",
	});
};

const getIdentity = async () => {
	const { data } = await axios.get<Identity | null>('/user/identity');
	return data;
};

export const useGetIdentity = () => {
	return useQuery({
		queryKey: ['identity'],
		queryFn: getIdentity,
		refetchOnWindowFocus: "always",
	});
};

const getPublicBadges = async (address: string) => {
	const { data } = await axios.get<BadgeData>('/user/public/badges', {
		params: {
			address,
		},
	});

	return data;
};

/**
 * 
 * @param address wallet address
 * @returns badges associated with an address (not read from Pairwise backend servers)
 */
export const useGetPublicBadges = (address: string) => {
  return useQuery({
		queryKey: ['publicBadges', address],
		queryFn: () => getPublicBadges(address),
	});
}