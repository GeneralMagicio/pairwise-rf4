'use client';

import React, { ReactNode } from 'react';
import Header from '../components/Header'; // Adjust the path as necessary
import { useParams } from 'next/navigation';
import { Countdown } from './components/Countdown';

const CategoriesLayout = ({ children }: { children: ReactNode }) => {
	const params = useParams();

	console.log('params', params);

	return (
		<div className='centered-mobile-max-width'>
			{!params.categoryId && <Header />}
			<Countdown/>
			{children}
		</div>
	);
};

export default CategoriesLayout;
