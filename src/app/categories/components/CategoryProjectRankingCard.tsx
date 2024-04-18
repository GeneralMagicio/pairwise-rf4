import Image from 'next/image';
import { IProject } from '../types';
import IconAlertCircle from 'public/images/icons/IconAlertCircle';

interface ICategoryProjectRankingCardProps {
	project: IProject;
}

const CategoryProjectRankingCard = ({
	project,
}: ICategoryProjectRankingCardProps) => {
	const truncate = (input: string) =>
		input.length > 90 ? `${input.substring(0, 90)}...` : input;

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
			<p className='text-ph'>{truncate(project.impactDescription)}</p>
		</div>
	);
};

export default CategoryProjectRankingCard;
