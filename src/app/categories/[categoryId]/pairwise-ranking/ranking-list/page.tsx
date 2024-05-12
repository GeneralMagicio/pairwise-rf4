'use client';

import { Categories, projects } from '@/app/categories/mockData';
import { useParams, useRouter } from 'next/navigation';
import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import CategoryRankingListItem from '@/app/categories/components/CategoryRankingListItem';
import Button from '@/app/components/Button';
import { Routes } from '@/app/constants/Routes';
import { useProjectsRankingByCategoryId } from '@/app/features/categories/getProjectsRankingByCategoryId';
import { IProject } from '@/app/categories/types';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useUpdateSortingByCategoryId } from '@/app/features/categories/updateSortingByCategoryId';
import { useUpdatePairwiseFinish } from '@/app/features/categories/updatePairwiseFinish';

const CategoryRankingListPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();
	const [listProjects, setListProjects] = useState<IProject[]>([]);
	const { mutateAsync: mutateAsyncUpdatePairwiseFinish } =
		useUpdatePairwiseFinish({ categoryId: +categoryId });
	const { mutateAsync: mutateAsyncUpdateSorting } =
		useUpdateSortingByCategoryId({
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

	const handleSubmitSortedProjects = async () => {
		try {
			await mutateAsyncUpdatePairwiseFinish({
				data: {
					cid: +selectedCategoryId,
				},
			});
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
					<div>Action</div>
				</div>
				<div>
					<Reorder.Group
						axis='y'
						values={listProjects}
						onReorder={setListProjects}
					>
						{listProjects.map((project, index) => (
							<CategoryRankingListItem
								key={project.id}
								project={project}
								order={index + 1}
							/>
						))}
					</Reorder.Group>
				</div>
			</div>
			<div className='sticky bottom-0 w-full border-t border-gray-200 bg-white px-6 py-6'>
				<Button
					// onClick={() =>
					// 	router.push(
					// 		`${Routes.Categories}/${category?.data?.collection?.id}/pairwise-ranking/comment`,
					// 	)
					// }
					onClick={handleSubmitSortedProjects}
					className='w-full bg-primary'
				>
					Submit Vote
				</Button>
			</div>
		</div>
	);
};

export default CategoryRankingListPage;
