import React, { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { formatAddress } from '../helpers/text-helpers';
import Button from './Button';
import Image from 'next/image';
import IconCheck from 'public/images/icons/IconCheck';

import { identityLsKey, useCreateIdentity } from '../hooks/useCreateIdentity';
import { useMutation, useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { BadgeData } from '../badges/components/BadgeCard';
import { AdjacentBadges } from '../badges/components/AdjacentBadges';

enum CollectVotingPowerState {
	Not_Started,
	Collecting,
	Collected,
}

interface ICollectionsVotingPowerContentProps {
	setIsClaimDrawerOpen: (isOpen: boolean) => void;
}

const getBadges = async (address: string) => {
	const { data } = await axios.get<BadgeData>('/user/public/badges', {
		params: {
			address,
		},
	});

	return data;
};

const storeIdentity = async ({ identity }: { identity: string }) => {
	return axios.post('/user/store-identity', {
		identity,
	});
};

const storeBadges = async ({
	mainAddress,
	signature,
}: {
	mainAddress: string;
	signature: string;
}) => {
	const { data: badges } = await axios.post<BadgeData>('/user/store-badges', {
		mainAddress,
		signature,
	});

	return badges;
};

const CollectVotingPowerContent = ({
	setIsClaimDrawerOpen,
}: ICollectionsVotingPowerContentProps) => {
	const { address } = useAccount();
	// const [badges, setBadges] = useState()

	const { signMessageAsync } = useSignMessage();

	const { createIdentity } = useCreateIdentity();

	const { data: publicBadges } = useQuery({
		queryKey: ['publicBadges', address],
		queryFn: () => getBadges(address || ''),
	});

	const { mutateAsync: storeIdentityMutation } = useMutation({
		mutationFn: storeIdentity,
	});
	const { mutateAsync: storeBadgesMutation, data: badges } = useMutation({
		mutationFn: storeBadges,
	});

	const [collectState, setCollectState] = useState(
		CollectVotingPowerState.Not_Started,
	);

	const handleCollect = async () => {
		//Handle collect functionality here
		setCollectState(CollectVotingPowerState.Collecting);

		// create bandada anonymous identity if not already present
		await createIdentity();

		const message = `Pairwise`;
		const signature = await signMessageAsync({
			message: message,
		});

		const identity = localStorage.getItem(identityLsKey);

		if (!identity || !address) return;

		await Promise.all([
			storeIdentityMutation({ identity }),
			storeBadgesMutation({ mainAddress: address, signature }),
		]);

		setCollectState(CollectVotingPowerState.Collected);
	};

	switch (collectState) {
		case CollectVotingPowerState.Not_Started:
			return (
				<div className='px-4 py-6'>
					<div>
						<p className='pb-2 text-lg font-bold'>
							Collect Voting Power
						</p>
						<p className='text-ph'>
							Claim your badges to start voting on projects.
						</p>
					</div>
					<div className='my-4 flex flex-col items-center'>
						<p className='mb-6 text-lg font-semibold'>
							{formatAddress(address!)}
						</p>
						<AdjacentBadges {...publicBadges} />
						<p className='text-ph'>
							{Object.keys(publicBadges || {}).length} badges
							found
						</p>
					</div>
					<Button
						onClick={handleCollect}
						className='w-full bg-primary'
					>
						Collect Voting Power
					</Button>
				</div>
			);
		case CollectVotingPowerState.Collecting:
			return (
				<div className='flex flex-col items-center justify-center gap-6 px-4 py-6'>
					<Image
						src='/images/collect-loading.png'
						width={50}
						height={50}
						alt='loading'
					/>
					<p className='text-lg font-semibold'>
						{formatAddress(address)}
					</p>
					<AdjacentBadges {...publicBadges} />
					<p className='text-ph'>Collecting Voting Power</p>
				</div>
			);
		case CollectVotingPowerState.Collected:
			return (
				<div className='flex flex-col items-center justify-center gap-6 px-4 py-6'>
					<div className='inline-flex items-center justify-center rounded-full border-2 border-red-500 bg-red-200 p-2'>
						<IconCheck color='red' />
					</div>
					<p className='text-lg font-semibold'>
						{formatAddress(address)}
					</p>
					<AdjacentBadges {...publicBadges} />
					<p>Voting Power Collected</p>
					<Button
						onClick={() => {
							setIsClaimDrawerOpen(false);
						}}
						className='w-full bg-primary'
					>
						Done
					</Button>
				</div>
			);
		default:
			return <div>{collectState}</div>;
	}
};

export default CollectVotingPowerContent;
