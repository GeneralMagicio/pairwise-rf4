import React, { useEffect, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { formatAddress } from '../helpers/text-helpers';
import Button from './Button';
import Image from 'next/image';
import IconCheck from 'public/images/icons/IconCheck';
import { identityLsKey, useCreateIdentity } from '../hooks/useCreateIdentity';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import BadgeCard, {
	BadgeData,
	badgeTypeMapping,
} from '../badges/components/BadgeCard';
import { AdjacentBadges } from '../badges/components/AdjacentBadges';
import { useGetPublicBadges } from '../features/badges/getBadges';
import { DotsLoader } from '../login/components/bouncing-dots/DotsLoader';
import { useDisconnect } from 'wagmi';
import { useConnect } from '../providers/ConnectProvider';
import { BadgeCardEntryType } from '../badges/page';
import { getBadgeAmount, getBadgeMedal } from '@/utils/badgeUtils';

enum CollectVotingPowerState {
	Not_Started,
	No_Badges,
	Collecting,
	Collected,
	Error,
}

interface ICollectionsVotingPowerContentProps {
	setIsClaimDrawerOpen: (isOpen: boolean) => void;
}

export const storeIdentityAndBadges = async ({
	identity,
	mainAddress,
	signature,
}: {
	identity: string;
	mainAddress: string;
	signature: string;
}) => {
	return axios.post('/user/store-badges-identity', {
		identity,
		mainAddress,
		signature,
	});
};

const CollectVotingPowerContent = ({
	setIsClaimDrawerOpen,
}: ICollectionsVotingPowerContentProps) => {
	const { address } = useAccount();
	const { handleDisconnect } = useConnect();
	const { signMessageAsync } = useSignMessage();

	const { createIdentity } = useCreateIdentity();

	const queryClient = useQueryClient();

	const { data: publicBadges } = useGetPublicBadges(address || '');

	const badgeCards = ({
		delegateAmount,
		holderAmount,
		holderType,
		delegateType,
		...rest
	}: BadgeData) => {
		return { ...rest };
	};

	const [noBadgeConnecting, setNoBadgeConnecting] = useState(false);

	const { mutateAsync: storeBadgesAndIdentityMutation } = useMutation({
		mutationFn: storeIdentityAndBadges,
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: ['badges'],
			});
			queryClient.refetchQueries({
				queryKey: ['identity'],
			});
		},
	});

	const [collectState, setCollectState] = useState(
		CollectVotingPowerState.Not_Started,
	);

	useEffect(() => {
		if (
			publicBadges &&
			Object.keys(publicBadges).length === 0 &&
			collectState === CollectVotingPowerState.Not_Started
		)
			setCollectState(CollectVotingPowerState.No_Badges);
	}, [collectState, publicBadges]);

	const handleCollectNoBadge = async () => {
		try {
			setNoBadgeConnecting(true);
			const message = `Sign this message to generate your Semaphore identity.`;
			const signature = await signMessageAsync({
				message: message,
			});

			// create bandada anonymous identity if not already present
			await createIdentity(signature);

			const identity = localStorage.getItem(identityLsKey);

			if (!identity || !address) return;

			await storeBadgesAndIdentityMutation({
				identity,
				mainAddress: address,
				signature,
			});
			setNoBadgeConnecting(false);
			setIsClaimDrawerOpen(false);
		} catch (e) {
			console.error(
				'error on creating bandada identity without badge:',
				e,
			);
			setCollectState(CollectVotingPowerState.Error);
		}
	};

	const { disconnectAsync } = useDisconnect();

	const handleDifferentWallet = async () => {
		await disconnectAsync();
		handleDisconnect();
	};

	const handleCollect = async () => {
		try {
			//Handle collect functionality here
			setCollectState(CollectVotingPowerState.Collecting);

			const message = `Sign this message to generate your Semaphore identity.`;
			const signature = await signMessageAsync({
				message: message,
			});

			// create bandada anonymous identity if not already present
			await createIdentity(signature);

			const identity = localStorage.getItem(identityLsKey);

			if (!identity || !address) return;

			await storeBadgesAndIdentityMutation({
				identity,
				mainAddress: address,
				signature,
			});

			setCollectState(CollectVotingPowerState.Collected);
		} catch (e) {
			console.error(
				'error on creating bandada identity with badge(s):',
				e,
			);
			setCollectState(CollectVotingPowerState.Error);
		}
	};

	const numOfBadgesFunc = (publicBadges: BadgeData) =>
		Object.keys(publicBadges).filter(el =>
			Object.keys(badgeTypeMapping).includes(el),
		).length;

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
					<div className='my-4 flex flex-col items-center gap-4'>
						<p className='text-lg font-semibold'>
							{formatAddress(address!)}
						</p>

						<p className='text-ph'>
							{publicBadges ? (
								`${numOfBadgesFunc(publicBadges)} badges found`
							) : (
								<DotsLoader />
							)}
						</p>
						<div className='flex w-full overflow-x-scroll'>
							{publicBadges ? (
								Object.entries(badgeCards(publicBadges)).map(
									([el1, el2]) => {
										const [key, value] = [
											el1,
											el2,
										] as BadgeCardEntryType;
										return (
											<BadgeCard
												key={key}
												points={value}
												type={key}
												medal={getBadgeMedal(
													key,
													publicBadges,
												)}
												amount={getBadgeAmount(
													key,
													publicBadges,
												)}
											/>
										);
									},
								)
							) : (
								<p>No badges found for You</p>
							)}
						</div>
					</div>
					<Button
						onClick={handleCollect}
						className='w-full bg-primary'
					>
						Collect Voting Power
					</Button>

					<Button
						onClick={handleDifferentWallet}
						className='mt-5 w-full border border-[#E0E2EB] bg-[#FBFCFE] text-[#404454] shadow-md'
					>
						Try a different wallet
					</Button>
				</div>
			);
		case CollectVotingPowerState.Error:
			return (
				<div className='px-4 py-6'>
					<div>
						<p className='pb-2 text-3xl font-bold'>:(</p>
						<p className='text-ph'>
							An error occurred. Please try again later.
						</p>
					</div>
					<div className='my-2 flex flex-col items-center gap-4'>
						<Image
							src={'/images/characters/11.png'}
							alt='No badges character'
							height={200}
							width={200}
						/>
					</div>
					<Button
						onClick={() => setIsClaimDrawerOpen(false)}
						className='w-full bg-primary'
					>
						Done
					</Button>
				</div>
			);
		case CollectVotingPowerState.No_Badges:
			return (
				<div className='px-4 py-6'>
					<div>
						<p className='pb-2 text-3xl font-bold'>Claim badges</p>
						<p className='text-ph'>
							Oh no, this address does not have any badge to
							claim. But no worries, you can still play and vote.
						</p>
					</div>
					<div className='my-2 flex flex-col items-center gap-4'>
						<Image
							src={'/images/characters/12.png'}
							alt='No badges character'
							height={160}
							width={160}
						/>
						<p className='mb-4 text-primary'>No Badges found</p>
					</div>
					<Button
						onClick={handleCollectNoBadge}
						isLoading={noBadgeConnecting}
						className='w-full bg-primary'
					>
						Connect Anyway
					</Button>
					<Button
						onClick={handleDifferentWallet}
						className='mt-5 w-full border border-[##E0E2EB] bg-[#FBFCFE] text-[#404454] shadow-md'
					>
						Try a different wallet
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
					<AdjacentBadges {...publicBadges} size={40} />
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
					<AdjacentBadges {...publicBadges} size={40} />
					<p>{`You're connected`}</p>
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
