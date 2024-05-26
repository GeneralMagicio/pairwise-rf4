import React from 'react';
import { IProject } from '../types';
import Image from 'next/image';
import { cn } from '@/app/helpers/cn';

interface ICategoriesProjectDrawerContentProps {
	project: IProject;
}

const CategoriesProjectDrawerContent = ({
	project,
}: ICategoriesProjectDrawerContentProps) => {
	return (
		<div className='centered-mobile-max-width my-4'>
			<div className='just mx-auto w-full'>
				<div className='relative overflow-visible rounded-lg'>
					{project.image ? (
						<Image
							src={project.image}
							alt='Project Image'
							width={460}
							height={160}
							className='h-40 rounded-lg object-cover'
						/>
					) : (
						<div className='relative h-[160px] rounded-lg bg-gray-700 object-cover'>
							<p className='absolute inset-0 flex items-center justify-center overflow-hidden px-1 text-center text-lg font-bold text-white'>
								{project.name}
							</p>
						</div>
					)}

					<div
						className={cn(
							`absolute bottom-0 left-2 z-10 h-20 w-20 translate-y-1/2 transform rounded-full border-4 border-white shadow-lg`,
							!project.image && `bg-gray-700`,
						)}
					>
						<div
							className={cn(
								'relative',
								!project.image &&
									'flex h-full w-full items-center justify-center overflow-hidden',
							)}
						>
							{project.image ? (
								<Image
									src={project.image}
									alt='Project Image'
									width={100}
									height={100}
									className='mb-5 w-full rounded-full object-cover'
								/>
							) : (
								<div className='overflow-hidden'>
									<p className='text-center text-[4px] text-white'>
										{project.name}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className=''>
				<p className='mt-16 text-xl font-bold'>{project?.name}</p>
				<p className='mt-2 border-b-2 border-gray-100 pb-4 text-ph'>
					{project?.contributionDescription}
				</p>
				<p className='mt-4 text-ph'>{project?.impactDescription}</p>
			</div>
		</div>
	);
};

export default CategoriesProjectDrawerContent;
