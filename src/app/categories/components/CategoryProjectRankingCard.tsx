import Image from 'next/image';
import { IProject } from '../types';
import IconAlertCircle from 'public/images/icons/IconAlertCircle';
import { truncate } from '@/app/helpers/text-helpers';
import { useState } from 'react';
import Drawer from '@/app/components/Drawer';
import CategoriesProjectDrawerContent from './CategoriesProjectDrawerContent';

interface ICategoryProjectRankingCardProps {
	project: IProject;
}

const CategoryProjectRankingCard = ({
	project,
}: ICategoryProjectRankingCardProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<div className='w-[324px] rounded-2xl px-3 pb-5 shadow-lg'>
			<div className='mb-4'>
				<Image
					src={project.image ? project.image : ''}
					alt={project.name}
					width={300}
					height={300}
					className='rounded-2xl'
				/>
			</div>
			<div className='flex justify-between'>
				<p className='mb-4 font-bold'>{project.name}</p>
				<div
					className='cursor-pointer'
					onClick={() => setIsDrawerOpen(true)}
				>
					<IconAlertCircle />
				</div>
			</div>
			<p className='text-ph'>{truncate(project.impactDescription, 90)}</p>
			<Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
				<CategoriesProjectDrawerContent project={project} />
			</Drawer>
		</div>
	);
};

export default CategoryProjectRankingCard;
