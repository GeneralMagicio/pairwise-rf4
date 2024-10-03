import React from 'react';
import { Routes } from '@/app/constants/Routes';
import Link from 'next/link';
import IconArrowLeft from 'public/images/icons/IconArrowLeft';
import IconCancel from 'public/images/icons/IconCancel';
import { useParams } from 'next/navigation';

interface ITopRouteIndicatorProps {
	name?: string;
	icon: 'cross' | 'arrow';
}

const iconMap = {
	cross: <IconCancel />,
	arrow: <IconArrowLeft />,
};

const TopRouteIndicator = ({ name = '', icon }: ITopRouteIndicatorProps) => {
	const { categoryId } = useParams();
	return (
		<div className='border-b border-b-gray-300 pb-7 pt-9'>
			<div className='mx-4 flex  items-center justify-end gap-6'>
				{icon === 'arrow' ? (
					<Link
						className='flex-shrink-0'
						href={`${Routes.Categories}/${categoryId}/pairwise-ranking/ranking-list/edit`}
					>
						{iconMap[icon]}
					</Link>
				) : (
					''
				)}
				<p className='flex-[1_0_0]'>{name}</p>
				<Link className='flex-shrink-0' href={`${Routes.Categories}`}>
					{icon === 'cross' ? iconMap[icon] : ''}
				</Link>
			</div>
		</div>
	);
};

export default TopRouteIndicator;
