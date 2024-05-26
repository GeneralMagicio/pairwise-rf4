import Image from 'next/image';
import { IProject } from '../types';

interface ICategoriesProjectItemProps {
	project: IProject;
}

const CategoryProjectItem = ({ project }: ICategoriesProjectItemProps) => {
	return (
		<div className='border-b border-b-gray-200 py-4'>
			<div className='mx-4 flex items-center gap-2'>
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
				<p className='font-bold text-gray-700'>{project.name}</p>
			</div>
		</div>
	);
};

export default CategoryProjectItem;
