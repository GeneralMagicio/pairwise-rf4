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
						'relative mx-auto h-[170px] w-[170px] rounded-2xl',
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
				<div className='pt-2 text-center'>
					<p className=' font-bold '>{truncate(project.name, 16)}</p>
					<p className='text-ph'>
						{project.shortDescription || truncate(getDescription(project) || '', 80)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CategoryPairwiseCardWithMetrics;
