'use client';

import Button from '@/app/components/Button';
import { Routes } from '@/app/constants/Routes';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const ProjectRankingDonePage = () => {
	const router = useRouter();
	const { categoryId } = useParams();
	return (
		<div className='flex min-h-[calc(100dvh)] flex-col justify-between'>
			<div className='mx-auto flex h-[80vh] flex-col items-center justify-center gap-4'>
				<Image
					src='/images/characters/ranking-done-character.png'
					alt='Ranking Done'
					width={250}
					height={250}
				/>
				<p className='mx-auto text-lg font-bold'>Filtering done!</p>
				<p className='mx-auto text-ph'>Now they battle to the DEATH!</p>
			</div>
			<div className='border-t border-t-gray-300 px-6 py-6'>
				<Button
					onClick={() =>
						router.push(
							`${Routes.Categories}/${categoryId}/project-ranking/summary`,
						)
					}
					className='w-full bg-primary'
				>
					View summary
				</Button>
			</div>
		</div>
	);
};

export default ProjectRankingDonePage;
