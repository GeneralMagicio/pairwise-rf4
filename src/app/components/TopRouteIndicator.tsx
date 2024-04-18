import React from 'react';

interface ITopRouteIndicatorProps {
	name?: string;
}

const TopRouteIndicator = ({ name = '' }: ITopRouteIndicatorProps) => {
	return (
		<div className='border-b border-b-gray-300 pb-7 pt-9'>
			<div className='mx-4 flex items-center gap-6'>
				<p>{name}</p>
			</div>
		</div>
	);
};

export default TopRouteIndicator;
