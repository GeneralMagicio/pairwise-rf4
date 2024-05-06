'use client';

import { axios } from '@/lib/axios';
import React from 'react';
import Button from '../components/Button';

const ResetPage = () => {
	const onReset = async () => {
		await axios.get('/flow/temp-reset-inclusions');
	};
	return (
		<div className='flex h-20 items-center justify-center'>
			<Button className='bg-red-500' onClick={onReset}>
				Reset User Data
			</Button>
		</div>
	);
};

export default ResetPage;
