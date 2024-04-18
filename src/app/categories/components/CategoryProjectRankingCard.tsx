import Image from 'next/image';
import { IProject } from '../types';
import IconAlertCircle from 'public/images/icons/IconAlertCircle';
import { truncate } from '@/app/helpers/text-helpers';

interface ICategoryProjectRankingCardProps {
	project: IProject;
}

const CategoryProjectRankingCard = ({
	project,
}: ICategoryProjectRankingCardProps) => {
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
				<div className='cursor-pointer'>
					<IconAlertCircle />
				</div>
			</div>
			<p className='text-ph'>{truncate(project.impactDescription, 90)}</p>
		</div>
	);
};

export default CategoryProjectRankingCard;
