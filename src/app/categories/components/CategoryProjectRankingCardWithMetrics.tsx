import Image from 'next/image';
import { IProject } from '../types';
import IconAlertCircle from 'public/images/icons/IconAlertCircle';
import { truncate } from '@/app/helpers/text-helpers';
import { useState } from 'react';
import Drawer from '@/app/components/Drawer';
import CategoriesProjectDrawerContent from './CategoriesProjectDrawerContent';
import { motion } from 'framer-motion';
import IconEye from 'public/images/icons/IconEye';
import Button from '@/app/components/Button';

interface ICategoryProjectRankingCardWithMetricsProps {
	project: IProject;
	hasSeenProjectDetails: boolean;
	setHasSeenProjectDetails: (value: boolean) => void;
}

const CategoryProjectRankingCardWithMetrics = ({
	project,
	hasSeenProjectDetails,
	setHasSeenProjectDetails,
}: ICategoryProjectRankingCardWithMetricsProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [learnMore, setLearnMore] = useState(false);

	const variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
		exit: {
			opacity: 0,
			transition: {
				duration: 0.5,
			},
		},
	};
	console.log('project', project);
	return (
		<motion.div
			initial='hidden'
			animate='show'
			exit='exit'
			variants={variants}
			className='m-4'
		>
			<div className='w-full select-none rounded-2xl pb-5'>
				<div className='relative mb-4'>
					{project.image ? (
						<Image
							src={project.image}
							alt={project.name}
							width={500}
							height={500}
							className='mx-auto rounded-2xl'
						/>
					) : (
						<div className='relative h-[300px] w-[300px] rounded-2xl bg-gray-700'>
							<p className='absolute inset-0 flex items-center justify-center overflow-hidden px-1 text-center text-lg font-bold text-white'>
								{project.name}
							</p>
						</div>
					)}
				</div>
				<div className='flex justify-between'>
					<p className='mb-4 font-bold'>{project.name}</p>
				</div>
				<p className='text-ph'>
					{!learnMore
						? truncate(project.impactDescription, 90)
						: project.impactDescription}
				</p>
				{!learnMore && (
					<Button
						onClick={() => setLearnMore(true)}
						className='mt-4 w-full border border-gray-300 text-black'
					>
						Learn more
					</Button>
				)}
			</div>
		</motion.div>
	);
};

export default CategoryProjectRankingCardWithMetrics;
