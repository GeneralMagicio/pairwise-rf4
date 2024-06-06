import { useQuery } from '@tanstack/react-query';
import {axios} from '@/lib/axios';
import { BadgeData } from '../components/BadgeCard';

const getBadges = async () => {
	const { data } = await axios.get<BadgeData>('/user/badges');
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