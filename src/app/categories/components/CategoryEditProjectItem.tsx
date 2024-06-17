import Image from 'next/image';
import { IProject } from '../types';
import IconTrash from 'public/images/icons/IconTrash';

export enum SelectionState {
	SELECTED = 'selected',
	NOT_SELECTED = 'notSelected',
}

interface ICategoriesEditProjectItemProps {
	project: IProject;
	selectionState: SelectionState;
	handleEditProject: (projectId: number) => void;
}

const CategoryEditProjectItem = ({
	project,
	selectionState,
	handleEditProject,
}: ICategoriesEditProjectItemProps) => {
	return (
		<div className='border-b border-b-gray-200 py-4'>
			<div className='flex justify-between'>
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
				<div
					className='cursor-pointer'
					onClick={() => handleEditProject(project.id)}
				>
					{selectionState === SelectionState.SELECTED ? (
						<IconTrash color='#9195A6' />
					) : (
						<div className='text-2xl'>+</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CategoryEditProjectItem;
