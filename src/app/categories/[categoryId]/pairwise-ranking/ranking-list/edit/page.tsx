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
import { InclusionState, IProject } from '@/app/categories/types';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useUpdateSortingByCategoryId } from '@/app/features/categories/updateSortingByCategoryId';
import { useUpdatePairwiseFinish } from '@/app/features/categories/updatePairwiseFinish';
import { useProjectsByCategoryId } from '@/app/features/categories/getProjectsByCategoryId';
import CategoryRankingNotSelectedListItem from '@/app/categories/components/CategoryRankingNotSelectedListItem';
import { MinimumIncludedProjectsModal } from '@/app/components/MinimumIncludedProjectsModal';
import { MinimumModalState } from '@/utils/types';

const CategoryRankingListEditPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();
	const [listProjects, setListProjects] = useState<IProject[]>([]);
	const [excludedProjects, setExcludedProjects] = useState<IProject[]>([]);
	const [minimumModal, setMinimumModal] = useState<MinimumModalState>(
		MinimumModalState.False,
	);

	const {
		mutateAsync: mutateAsyncUpdateSorting,
		isPending: isSortingPending,
		error: sortingError
	} = useUpdateSortingByCategoryId({
		categoryId: +categoryId,
	});
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const { data: categoryAllProjects } =
		useProjectsByCategoryId(+selectedCategoryId);

	const listProjectsIds = listProjects.map(project => project.id);
	console.log('listProjectsIds', listProjectsIds);

	const { data: projectsRanking, isLoading: isProjectsRankingLoading } =
		useProjectsRankingByCategoryId(+selectedCategoryId);

	const { data: category, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	const isPending = isSortingPending;

	const handleSubmitSortedProjects = async () => {
		try {
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

	const handleAddFromNotSelected = (projectId: number) => {
		const project = excludedProjects?.find(
			project => project.id === projectId,
		);
		if (project) {
			project.inclusionState = InclusionState.Included;
			setListProjects(prevProjects => [...prevProjects, project]);
			setExcludedProjects(prevProjects =>
				prevProjects.filter(p => p.id !== projectId),
			);
		}
	};

	const handleRemoveFromSelected = (projectId: number) => {
		const project = listProjects.find(project => project.id === projectId);
		if (project) {
			project.inclusionState = InclusionState.Excluded;
			setExcludedProjects(prevProjects => [...prevProjects, project]);
			setListProjects(prevProjects =>
				prevProjects.filter(p => p.id !== projectId),
			);
		}
	};

	useEffect(() => {
		if (
			minimumModal === MinimumModalState.False &&
			sortingError &&
			// @ts-ignore
			sortingError.response &&
			// @ts-ignore
			sortingError.response.data
		) {
			// @ts-ignore
			const errorResponse = sortingError.response.data;
			if (errorResponse.pwCode === 'pw1000') {
				setMinimumModal(MinimumModalState.True);
			}
		}
	}, [sortingError, minimumModal]);

	useEffect(() => {
		if (projectsRanking?.data.ranking) {
			setListProjects(projectsRanking?.data.ranking);
		}
		const _excludedProjects = categoryAllProjects?.data.filter(
			project => project.inclusionState === InclusionState.Excluded,
		);
		setExcludedProjects(_excludedProjects || []);
	}, [projectsRanking?.data.ranking, categoryAllProjects?.data]);

	if (isProjectsRankingLoading || isCategoryLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='relative flex min-h-[calc(100dvh)] flex-col '>
			<MinimumIncludedProjectsModal
				close={() => setMinimumModal(MinimumModalState.Shown)}
				isOpen={minimumModal === MinimumModalState.True}
				// @ts-ignore
				minimum={sortingError?.response?.data.minimum || 2}
			/>
			<div className='flex flex-grow flex-col'>
				<TopRouteIndicator name={category?.data?.collection.name} />
				<div className='mx-4'>
					<p className='mt-6 text-2xl font-bold'>Well done!</p>
					<p className='mt-2 text-ph'>
						You have finished ranking of Developer Ecosystem, now
						you can create list or continue ranking other projects.
					</p>
				</div>
				<p className='mb-2 mt-6 font-semibold text-ph'>
					Ranked ({listProjects?.length})
				</p>
				<div className='flex justify-between bg-gray-100 p-2 text-ph'>
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
								handleRemoveFromSelected={
									handleRemoveFromSelected
								}
							/>
						))}
					</Reorder.Group>
				</div>
				<p className='mb-2 mt-6 font-semibold text-ph'>
					Not Selected ({excludedProjects?.length})
				</p>
				<div>
					{excludedProjects?.map((project, index) => (
						<CategoryRankingNotSelectedListItem
							project={project}
							key={project.id}
							handleAddFromNotSelected={handleAddFromNotSelected}
						/>
					))}
				</div>
			</div>

			<div className='sticky bottom-0 w-full border-t border-gray-200 bg-white px-6 py-6'>
				<div className='flex justify-between gap-4'>
					<Button
						onClick={() =>
							router.push(
								`${Routes.Categories}/${categoryId}/pairwise-ranking/ranking-list`,
							)
						}
						className='w-full text-black shadow-md'
					>
						Discard Changes
					</Button>
					<Button
						onClick={handleSubmitSortedProjects}
						className={`w-full bg-primary ${isPending ? 'opacity-50' : ''}`}
						disabled={isPending}
					>
						Save Changes
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CategoryRankingListEditPage;
