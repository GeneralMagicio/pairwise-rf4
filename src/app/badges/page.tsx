'use client';

import React from 'react';
import TopNavigation from '../components/TopNavigation';
import { Routes } from '../constants/Routes';
import BadgeCard, { BadgeData, badgeTypeMapping } from './components/BadgeCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGetBadges } from '../features/badges/getBadges';
import { getBadgeAmount, getBadgeMedal } from '@/utils/badgeUtils';

export type BadgeCardEntryType = [
	key: keyof typeof badgeTypeMapping,
	value: number,
];

const BadgesPage = () => {
	const { data: badges, isLoading } = useGetBadges();

	if (isLoading) return <LoadingSpinner />;

	const badgeCards = ({
		delegateAmount,
		holderAmount,
		holderType,
		delegateType,
		...rest
	}: BadgeData) => {
		return { ...rest };
	};

	return (
		<div>
			<TopNavigation link={Routes.Categories} text='Badges' />
			<div className='mx-5 my-6'>
				<p className='font-bold'>Your Badges</p>
				<div className='mt-6 grid grid-cols-2 justify-between gap-4'>
					{badges ? (
						Object.entries(badgeCards(badges)).map(([el1, el2]) => {
							const [key, value] = [
								el1,
								el2,
							] as BadgeCardEntryType;
							return (
								<BadgeCard
									key={key}
									points={value}
									type={key}
									medal={getBadgeMedal(key, badges)}
									amount={getBadgeAmount(key, badges)}
								/>
							);
						})
					) : (
						<p>No badges found for You</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default BadgesPage;
