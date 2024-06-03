'use client';

import React, {  } from 'react';
import TopNavigation from '../components/TopNavigation';
import { Routes } from '../constants/Routes';
import BadgeCard, { BadgeData } from './components/BadgeCard';
import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import LoadingSpinner from '../components/LoadingSpinner';

const getBadges = async () => {
	const {data} = await axios.get<BadgeData>('/user/badges')
	return data;
}

const BadgesPage = () => {
	const {data: badges, isLoading} = useQuery({queryKey: ["badges"], queryFn: getBadges})


	if (isLoading) return <LoadingSpinner/>

	return (
		<div>
			<TopNavigation link={Routes.Categories} text='Badges' />
			<div className='mx-5 my-6'>
				<p className='font-bold'>Your Badges</p>
				<div className='mt-6 grid grid-cols-2 justify-between gap-4'>
					{badges ? (
						Object.entries(badges).map(([key, value]) =>
							 (
								<BadgeCard
									key={key}
									value={value}
									type={key as keyof BadgeData}
								/>
							),
						)
					) : (
						<p>No badges found for You</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default BadgesPage;
