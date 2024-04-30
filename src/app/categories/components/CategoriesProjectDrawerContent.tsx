import React from 'react';
import { IProject } from '../types';
import Image from 'next/image';

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
					<Image
						src={
							project?.image ||
							'/images/characters/welcome-character.png'
						}
						alt='Project Image'
						width={460}
						height={160}
						className='h-40 rounded-lg object-cover'
					/>
					<div className='absolute bottom-0 left-2 z-10 h-20 w-20 translate-y-1/2 transform rounded-full border-4 border-white  shadow-lg'>
						<Image
							src={
								project?.image ||
								'/images/characters/welcome-character.png'
							}
							alt='Project Image'
							width={100}
							height={100}
							className='mb-5 w-full rounded-full object-cover'
						/>
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
