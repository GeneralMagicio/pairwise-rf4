'use client';

import { InclusionState } from '@/app/categories/types';
import Button from '@/app/components/Button';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { Routes } from '@/app/constants/Routes';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useProjectsByCategoryId } from '@/app/features/categories/getProjectsByCategoryId';
import { useUpdateCategoryMarkFiltered } from '@/app/features/categories/updateCategoryMarkFiltered';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

const ProjectRankingDonePage = () => {
	const router = useRouter();
	const { categoryId } = useParams();

	const updateCategoryMarkFiltered = useUpdateCategoryMarkFiltered({
		categoryId: +categoryId,
	});

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const { data: projects } = useProjectsByCategoryId(+selectedCategoryId);

	const { data, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);
	const selectedCategoryProgress = data?.data?.progress;
	console.log('Selected Category', selectedCategoryProgress);

	const currentIndex =
		projects?.data.findIndex(
			project => project.inclusionState === InclusionState.Pending,
		) || 0;

	if (isCategoryLoading) {
		return <LoadingSpinner />;
	}

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
					onClick={() => {
						if (
							selectedCategoryProgress === 'Filtering' &&
							currentIndex === -1
						) {
							updateCategoryMarkFiltered.mutate({
								data: {
									cid: +selectedCategoryId,
								},
							});
						}
						router.push(
							`${Routes.Categories}/${categoryId}/project-ranking/summary`,
						);
					}}
					disabled={updateCategoryMarkFiltered.isPending}
					className='w-full bg-primary'
				>
					View summary
				</Button>
			</div>
		</div>
	);
};

export default ProjectRankingDonePage;
