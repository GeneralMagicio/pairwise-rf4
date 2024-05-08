'use client';

import React, { ReactNode } from 'react';
import Header from '../components/Header'; // Adjust the path as necessary
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthGuard } from '@/utils/AuthGuard';

const CategoriesLayout = ({ children }: { children: ReactNode }) => {
	const params = useParams();
	console.log('params', params);

	return (
		<AuthGuard>
			<div className='centered-mobile-max-width'>
				{!params.categoryId && <Header />}
				{children}
			</div>
		</AuthGuard>
	);
};

export default CategoriesLayout;
