import React from 'react';
import { useAccount } from 'wagmi';
import { formatAddress } from '../helpers/text-helpers';
import Button from './Button';

const CollectVotingPowerContent = () => {
	const { address } = useAccount();
	return (
		<div className='px-4 py-6'>
			<div>
				<p className='pb-2 text-lg font-bold'>Collect Voting Power</p>
				<p className='text-ph'>
					Claim your badges to start voting on projects.
				</p>
			</div>
			<div className='py-6 text-center'>
				<p className='mb-6 text-lg font-bold'>
					{formatAddress(address!)}
				</p>
				<div className='mb-4'>Badges</div>
				<p className='text-ph'>4 badges found</p>
			</div>
			<Button className='w-full bg-primary'>Collect Voting Power</Button>
		</div>
	);
};

export default CollectVotingPowerContent;
