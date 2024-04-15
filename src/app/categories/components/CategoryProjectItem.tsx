import Image from 'next/image';
import { IProject } from '../types';

interface ICategoriesProjectItemProps {
	project: IProject;
}

const CategoryProjectItem = ({ project }: ICategoriesProjectItemProps) => {
	return (
		<div className='border-b border-b-gray-200 py-4'>
			<div className='mx-4 flex items-center gap-2'>
				<Image
					className='rounded-full'
					src={
						project.image
							? project.image
							: '/images/characters/welcome-character.png'
					}
					alt='Logo'
					width={40}
					height={40}
				/>
				<p className='font-bold text-gray-700'>{project.name}</p>
			</div>
		</div>
	);
};

export default CategoryProjectItem;
