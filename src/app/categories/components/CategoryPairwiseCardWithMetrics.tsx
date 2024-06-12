import { IProject } from '../types';
import { truncate } from '@/app/helpers/text-helpers';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/app/helpers/cn';

interface ICategoryPairwiseCardWithMetricsProps {
	project: IProject;
}

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const CategoryPairwiseCardWithMetrics = ({
	project,
}: ICategoryPairwiseCardWithMetricsProps) => {
	return (
		<AnimatePresence mode='wait'>
			<motion.div
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={variants}
			>
				<div className='relative mx-4 overflow-hidden rounded-2xl'>
					<div
						className={cn(
							'h-[170px] w-[170px] rounded-2xl',
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
					<div className='pt-2 text-center'>
						<p className=' font-bold '>
							{truncate(project.name, 16)}
						</p>
						<p className='text-ph'>
							{truncate(project.impactDescription, 50)}
						</p>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default CategoryPairwiseCardWithMetrics;
