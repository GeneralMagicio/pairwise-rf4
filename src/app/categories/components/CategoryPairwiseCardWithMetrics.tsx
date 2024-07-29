import { IProject } from '../types';
import { truncate } from '@/app/helpers/text-helpers';

import { cn } from '@/app/helpers/cn';

interface ICategoryPairwiseCardWithMetricsProps {
	project: IProject;
}

const CategoryPairwiseCardWithMetrics = ({
	project,
}: ICategoryPairwiseCardWithMetricsProps) => {
	const getDescription = (project: IProject) => {
		if (project.impactDescription.length > 0)
			return project.impactDescription;
		if (
			project.contributionDescription &&
			project.contributionDescription.length > 0
		)
			return project.contributionDescription;

		return null;
	};
	return (
		<div>
			<div className='relative mx-4 overflow-hidden rounded-2xl'>
				<div
					className={cn(
						'relative mx-auto h-[140px] w-[140px] rounded-2xl sm:h-[170px] sm:w-[170px]',
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
						<p className='absolute inset-0 flex items-center justify-center overflow-hidden px-1 text-center text-sm font-bold text-white'>
							{project.name}
						</p>
					)}
				</div>
				<div className=' items-center pt-2 text-center '>
					<div className='flex  justify-center gap-2 '>
						<p className=' font-bold '>
							{truncate(project.name, 16)}
						</p>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='25'
							height='24'
							viewBox='0 0 25 24'
							fill='none'
						>
							<path
								d='M12.25 16V12M12.25 8H12.26M22.25 12C22.25 17.5228 17.7728 22 12.25 22C6.72715 22 2.25 17.5228 2.25 12C2.25 6.47715 6.72715 2 12.25 2C17.7728 2 22.25 6.47715 22.25 12Z'
								stroke='#636779'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
					</div>

					<p className='text-ph'>
						{project.shortDescription ||
							truncate(getDescription(project) || '', 80)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CategoryPairwiseCardWithMetrics;
