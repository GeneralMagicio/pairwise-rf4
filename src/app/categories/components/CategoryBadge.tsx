import React from 'react';
import { CollectionProgressStatus } from '../types';
import IconCheck from 'public/images/icons/IconCheck';

const CategoryBadge = ({
	progress = 'Pending',
}: {
	progress?: CollectionProgressStatus;
}) => {
	switch (progress) {
		case 'Pending':
			return (
				<div className='whitespace-nowrap rounded-full border border-gray-300 bg-gray-100 px-2 py-1 text-ph'>
					Not ranked
				</div>
			);
		case 'Filtering':
			return (
				<div className='whitespace-nowrap rounded-full border border-gray-300 bg-gray-100 px-2 py-1 text-ph'>
					Filtering
				</div>
			);
		case 'Filtered':
			return (
				<div className='whitespace-nowrap rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-blue-700'>
					Filtered
				</div>
			);
		case 'WIP - Threshold':
		case 'WIP':
			return (
				<div className='whitespace-nowrap rounded-full border border-gray-300 bg-gray-100 px-2 py-1 text-ph'>
					Ranking
				</div>
			);
		case 'Finished':
		case 'Attested':
			return (
				<div className='flex items-center gap-1 whitespace-nowrap rounded-full border border-green-300 bg-green-50 px-2 py-1 text-green-600'>
					<div>Ranked</div>
					<IconCheck color='#16a34a' size='16' />
				</div>
			);

		default:
			return (
				<div className='whitespace-nowrap rounded-full border border-green-300 bg-green-100 px-2 py-1 text-ph'>
					Not ranked
				</div>
			);
	}
};

export default CategoryBadge;
