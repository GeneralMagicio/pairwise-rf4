import IconAlertCircle from 'public/images/icons/IconAlertCircle';
import { IProject } from '../types';
import { truncate } from '@/app/helpers/text-helpers';

import Drawer from '@/app/components/Drawer';
import CategoriesProjectDrawerContent from './CategoriesProjectDrawerContent';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/app/helpers/cn';

interface ICategoryPairwiseCardProps {
	project: IProject;
}

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const CategoryPairwiseCard = ({ project }: ICategoryPairwiseCardProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				className=' cursor-pointer rounded-2xl border border-t-gray-300 p-2 shadow-lg'
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={variants}
			>
				<div className='relative overflow-hidden rounded-2xl'>
					<div
						className={cn(
							'h-[224px] w-[224px] rounded-2xl',
							!project.image && 'bg-gray-700',
						)}
						style={
							project.image
								? {
										backgroundImage: `url(${project.image})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
									}
								: {}
						}
					>
						{!project.image && (
							<p className='absolute inset-0 flex items-center justify-center overflow-hidden px-1 text-center text-lg font-bold text-white'>
								{project.name}
							</p>
						)}
					</div>
					<div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent'>
						<div className='flex justify-between px-4 pt-1 text-white'>
							<p className=' font-bold '>
								{truncate(project.name, 16)}
							</p>
							<div
								onClick={e => {
									e.stopPropagation();
									setIsDrawerOpen(true);
								}}
							>
								<IconAlertCircle color='#ffff' />
							</div>
						</div>
					</div>
				</div>
				<Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
					<CategoriesProjectDrawerContent project={project} />
				</Drawer>
			</motion.div>
		</AnimatePresence>
	);
};

export default CategoryPairwiseCard;
