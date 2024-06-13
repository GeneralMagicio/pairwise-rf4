'use client';

import { useParams, useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';

import Button from '@/app/components/Button';
import { Routes } from '@/app/constants/Routes';
import { useProjectsRankingByCategoryId } from '@/app/features/categories/getProjectsRankingByCategoryId';
import { IProject } from '@/app/categories/types';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useUpdateSortingByCategoryId } from '@/app/features/categories/updateSortingByCategoryId';
import CategoryRankingBasicListItem from '@/app/categories/components/CategoryRankingBasicListItem';
import posthog from 'posthog-js';

const CategoryRankingListPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();
	const [listProjects, setListProjects] = useState<IProject[]>([]);
	const {
		mutateAsync: mutateAsyncUpdateSorting,
		isPending: isSortingPending,
	} = useUpdateSortingByCategoryId({
		categoryId: +categoryId,
	});
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const listProjectsIds = listProjects.map(project => project.id);
	console.log('listProjectsIds', listProjectsIds);

	const { data: projectsRanking, isLoading: isProjectsRankingLoading } =
		useProjectsRankingByCategoryId(+selectedCategoryId);

	const { data: category, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	const isPending = isSortingPending;

	const handleSubmitSortedProjects = async () => {
		try {
			const filteredProjects = listProjects.filter(project => listProjectsIds.includes(project.id))
			.map(project => ({ id: project.id, name: project.name }));
			posthog.capture('Ranked', { rankedCategories: filteredProjects });


			await mutateAsyncUpdateSorting({
				data: {
					collectionId: +selectedCategoryId,
					projectIds: listProjectsIds,
				},
			});

			router.push(
				`${Routes.Categories}/${category?.data?.collection?.id}/pairwise-ranking/comment`,
			);
		} catch (e) {
			console.log('Error');
		}
	};

	useEffect(() => {
		if (projectsRanking?.data.ranking) {
			setListProjects(projectsRanking?.data.ranking);
		}
	}, [projectsRanking?.data.ranking]);

	if (isProjectsRankingLoading || isCategoryLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='relative flex min-h-[calc(100dvh)] flex-col '>
			<div className='flex flex-grow flex-col'>
				<TopRouteIndicator name={category?.data?.collection.name} />
				<div className='mx-4'>
					<p className='mt-6 text-2xl font-bold'>Well done!</p>
					<p className='mt-2 text-ph'>
						You have finished ranking of Developer Ecosystem, now
						you can create list or continue ranking other projects.
					</p>
				</div>
				<div className='mt-6 flex justify-between bg-gray-100 p-2 text-ph'>
					<div className='flex gap-8'>
						<div>Rank</div>
						<div>Project Name</div>
					</div>
					{/* <div>Action</div> */}
				</div>
				<div>
					{listProjects.map((project, index) => (
						<CategoryRankingBasicListItem
							key={project.id}
							project={project}
							order={index + 1}
						/>
					))}
				</div>
			</div>
			<div className='sticky bottom-0 w-full border-t border-gray-200 bg-white px-6 py-6'>
				<div className='flex justify-between gap-4'>
					<Button
						onClick={() =>
							router.push(
								`${Routes.Categories}/${categoryId}/pairwise-ranking/ranking-list/edit`,
							)
						}
						className='w-full text-black shadow-md'
					>
						Edit
					</Button>
					<Button
						onClick={handleSubmitSortedProjects}
						className={`w-full bg-primary ${isPending ? 'opacity-50' : ''}`}
						disabled={isPending}
					>
						Submit Vote
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CategoryRankingListPage;
