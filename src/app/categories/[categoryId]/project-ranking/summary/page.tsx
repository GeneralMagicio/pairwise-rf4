'use client';

import CategoryProjectItem from '@/app/categories/components/CategoryProjectItem';
import { Categories, projects } from '@/app/categories/mockData';
import { InclusionState } from '@/app/categories/types';
import Button from '@/app/components/Button';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import TopNavigation from '@/app/components/TopNavigation';
import { Routes } from '@/app/constants/Routes';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useProjectsByCategoryId } from '@/app/features/categories/getProjectsByCategoryId';
import { useParams, useRouter } from 'next/navigation';
import { captureEvent } from '@/utils/postHog';

const ProjectRankingSummaryPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];
	const { data: projects, isLoading: isProjectsLoading } =
		useProjectsByCategoryId(+selectedCategoryId);

	const { data, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	const selectedCategory = data?.data?.collection;

	const includedProjects = projects?.data.filter(
		project => project.inclusionState === InclusionState.Included,
	);

	const includedProjectsEvents  = includedProjects?.map(project => {
		return {id:project.id, name: project.name };
	}); 
	
	
	captureEvent(localStorage.getItem("userId") || "null", 'Filtered Categories', { categories: includedProjectsEvents });

	const excludedProjects = projects?.data.filter(
		project => project.inclusionState === InclusionState.Excluded,
	);

	if (isProjectsLoading || isCategoryLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div className='flex min-h-[calc(100dvh)] flex-col  justify-between'>
			<div>
				<div>
					<TopNavigation
						link={Routes.Categories}
						text={selectedCategory?.name}
					/>
				</div>
				<div className='mx-4'>
					<div className='mb-4 mt-6'>
						<p className='font text-2xl font-bold'>
							{includedProjects?.length || 0} out of{' '}
							{projects?.data.length || 0} projects selected
						</p>
					</div>
					<p className='mb-6 text-lg'>{selectedCategory?.name}</p>
					<p className='text-lg font-semibold'>
						Selected ({includedProjects?.length || 0})
					</p>
					{includedProjects?.map(project => (
						<CategoryProjectItem
							project={project}
							key={project.id}
						/>
					))}
					<div className='mt-6'>
						<p className='mb-2 text-lg font-semibold'>
							Not Selected ({excludedProjects?.length || 0})
						</p>
						{excludedProjects?.map(project => (
							<div key={project.id} className='opacity-40'>
								<CategoryProjectItem
									project={project}
									key={project.id}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='sticky bottom-0 border-t border-b-gray-200 bg-white px-6 py-6'>
				<Button
					onClick={() =>
						router.push(
							`${Routes.Categories}/${selectedCategory?.id}/pairwise-ranking`,
						)
					}
					className='w-full bg-primary'
				>
					Start ranking
				</Button>
			</div>
		</div>
	);
};

export default ProjectRankingSummaryPage;
