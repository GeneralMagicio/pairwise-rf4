'use client';

import React, { ReactNode } from 'react';
import Header from '../components/Header'; // Adjust the path as necessary
import { useParams } from 'next/navigation';
import CollectVotingPowerContent from '../components/CollectVotingPowerContent';
import ConnectWalletContent from '../components/ConnectWalletContent';
import Drawer from '../components/Drawer';
import { useConnect } from '../providers/ConnectProvider';

const CategoriesLayout = ({ children }: { children: ReactNode }) => {
	const params = useParams();
	

	console.log('params', params);

	return (
		<div className='centered-mobile-max-width'>
			{!params.categoryId && <Header />}
			{children}
		</div>
	);
};

export default CategoriesLayout;
