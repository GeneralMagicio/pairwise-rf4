'use client';

import React from 'react';
import TopNavigation from '../components/TopNavigation';
import { Routes } from '../constants/Routes';
import BadgeCard, { BadgeData } from './components/BadgeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGetBadges } from '../features/badges/getBadges';

const BadgesPage = () => {
	const {data: badges, isLoading} = useGetBadges()


	if (isLoading) return <LoadingSpinner/>

	const badgeCards = ({delegateAmount, holderAmount, holderType, delegateType, ...rest} : BadgeData) => {
		return {...rest}
	}

	return (
		<div>
			<TopNavigation link={Routes.Categories} text='Badges' />
			<div className='mx-5 my-6'>
				<p className='font-bold'>Your Badges</p>
				<div className='mt-6 grid grid-cols-2 justify-between gap-4'>
					{badges ? (
						Object.entries(badgeCards(badges)).map(([key, value]) =>
							 (
								<BadgeCard
									key={key}
									points={value || 1}
									type={key as keyof typeof badgeCards}
									medal={key === "holderPoints" ? badges.holderType : key === "delegatePoints" ? badges.delegateType : undefined}
									amount={key === "holderPoints" ? badges.holderAmount : key === "delegatePoints" ? badges.delegateAmount : undefined}
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
