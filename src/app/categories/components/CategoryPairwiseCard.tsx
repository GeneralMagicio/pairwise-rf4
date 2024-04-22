import IconAlertCircle from 'public/images/icons/IconAlertCircle';
import { IProject } from '../types';
import { truncate } from '@/app/helpers/text-helpers';
import { useParams, useRouter } from 'next/navigation';
import { Routes } from '@/app/constants/Routes';

interface ICategoryPairwiseCardProps {
	project: IProject;
}

const CategoryPairwiseCard = ({ project }: ICategoryPairwiseCardProps) => {
	const router = useRouter();
	const { categoryId } = useParams();
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	return (
		<div
			onClick={() =>
				router.push(
					`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-list`,
				)
			}
			className=' cursor-pointer rounded-2xl border border-t-gray-300 p-2'
		>
			<div className='relative overflow-hidden rounded-2xl'>
				<div
					className='h-[300px] w-[300px] rounded-2xl'
					style={{
						backgroundImage: `url(${project.image})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				></div>
				<div className='absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent'>
					<div className='flex justify-between px-4 pt-1 text-white'>
						<p className=' font-bold '>
							{truncate(project.name, 24)}
						</p>
						<div>
							<IconAlertCircle color='#ffff' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryPairwiseCard;
