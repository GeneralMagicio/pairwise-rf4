import React from 'react';
import { IProject } from '../types';

interface DrawerContentProps {
	project: IProject;
}
export const DrawerContent: React.FC<DrawerContentProps> = ({ project }) => {
	return (
		<div className='flex flex-col gap-3'>
			<div
				className='relative h-[160px] w-full'
				style={
					project?.image
						? {
								backgroundImage: `url(${project.image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}
						: {}
				}
			>
				<img
					className='absolute bottom-[-30%] left-[10px] rounded-full border-2'
					src={project?.image || 'image'}
					width={96}
					height={96}
				/>
			</div>
			<div className='mt-16'>
				<h1 className='text-2xl font-bold leading-[34px] tracking-[0.106px]'>
					{project?.name}
				</h1>
				<p>{project?.shortDescription}</p>
			</div>

			<div>
				<h1 className='text-2xl font-bold leading-[34px] tracking-[0.106px]'>
					Impact statement
				</h1>
				<p>{project?.impactDescription}</p>
			</div>

			<div>
				<h1 className='text-2xl font-bold leading-[34px] tracking-[0.106px]'>
					Contributions
				</h1>
				<p>{project?.contributionDescription}</p>
			</div>
		</div>
	);
};
