import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { formatAddress } from '../helpers/text-helpers';
import Button from './Button';
import Image from 'next/image';
import IconCheck from 'public/images/icons/IconCheck';

enum CollectVotingPowerState {
	Not_Started,
	Collecting,
	Collected,
}

interface ICollectionsVotingPowerContentProps {
	setIsClaimDrawerOpen: (isOpen: boolean) => void;
}

const CollectVotingPowerContent = ({
	setIsClaimDrawerOpen,
}: ICollectionsVotingPowerContentProps) => {
	const { address } = useAccount();
	const [collectState, setCollectState] = useState(
		CollectVotingPowerState.Not_Started,
	);

	const handleCollect = () => {
		//Handle collect functionality here
		setCollectState(CollectVotingPowerState.Collecting);
		// Simulate collecting voting power
		setTimeout(() => {
			setCollectState(CollectVotingPowerState.Collected);
		}, 3000);
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
					<div className='py-6 text-center'>
						<p className='mb-6 text-lg font-semibold'>
							{formatAddress(address!)}
						</p>
						{/* add badges here */}
						<div className='mb-4'>Badges</div>
						<p className='text-ph'>4 badges found</p>
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
					{/* add badges here */}
					<p>badges</p>
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
					{/* add badges here */}
					<p>badges</p>
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
