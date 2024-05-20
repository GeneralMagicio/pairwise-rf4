'use client';

import React, { useState, useEffect } from 'react';
import TopNavigation from '../components/TopNavigation';
import { Routes } from '../constants/Routes';
import BadgeCard from './components/BadgeCard';
import { BadgeData, processCSV } from './utility/getBadges';

const BadgesPage = () => {
	const [badgesMap, setBadgesMap] = useState<Map<string, BadgeData>>(
		new Map(),
	);
	const [address, setAddress] = useState<string | null>(null);

	useEffect(() => {
		setAddress('olimpio.eth');
		fetch('/csv/points_snapshot.csv')
			.then(response => response.text())
			.then(data => {
				const processedMap = processCSV(data);
				setBadgesMap(processedMap);
			})
			.catch(error =>
				console.error('Failed to load or process CSV', error),
			);
	}, []);

	const badges = address ? badgesMap.get(address) : undefined;

	return (
		<div>
			<TopNavigation link={Routes.Categories} text='Badges' />
			<div className='mx-5 my-6'>
				<p className='font-bold'>Your Badges</p>
				<div className='mt-6 grid grid-cols-2 justify-between gap-4'>
					{badges ? (
						Object.entries(badges).map(([key, value]) => (
							<BadgeCard
								key={key}
								value={value}
								type={key as keyof BadgeData}
							/>
						))
					) : (
						<p>No badges found for {address}</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default BadgesPage;
