'use client';

import IconMove from 'public/images/icons/IconMove';
import { IProject } from '../types';
import Image from 'next/image';
import { Reorder, useDragControls } from 'framer-motion';
import { truncate } from '@/app/helpers/text-helpers';

interface ICategoryRankingBasicListItemProps {
	project: IProject;
	order: number;
}

const CategoryRankingBasicListItem = ({
	project,
	order,
}: ICategoryRankingBasicListItemProps) => {
	return (
		<div className=' flex select-none items-center justify-between border-b border-b-gray-200 bg-white px-4 py-3'>
			<div className='flex items-center gap-6'>
				<div>#{order}</div>
				<div className='mx-4 flex items-center gap-4'>
					{project.image ? (
						<Image
							className='rounded-full'
							src={project.image}
							alt='Logo'
							width={40}
							height={40}
						/>
					) : (
						<div className='relative h-[40px] w-[40px] rounded-full bg-gray-700'>
							<p className='absolute inset-0 flex items-center justify-center overflow-hidden px-1 text-center text-[4px] text-white'>
								{project.name}
							</p>
						</div>
					)}
					<p className='font-bold text-gray-700'>
						{truncate(project.name, 25)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CategoryRankingBasicListItem;
