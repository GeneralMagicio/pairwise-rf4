'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Categories, projects } from '../../mockData';
import { Routes } from '@/app/constants/Routes';
import CategoryProjectRankingCard from '../../components/CategoryProjectRankingCard';
import Button from '@/app/components/Button';
import IconTrash from 'public/images/icons/IconTrash';
import IconCheck from 'public/images/icons/IconCheck';
import IconRefresh from 'public/images/icons/IconRefresh';
import ProgressBar from '@/app/components/ProgressBar';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useProjectsByCategoryId } from '@/app/features/categories/getProjectsByCategoryId';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { InclusionState } from '../../types';
import { useUpdateProjectInclusion } from '@/app/features/categories/updateProjectInclusion';

const ProjectRankingPage = () => {
	const router = useRouter();
	const { categoryId } = useParams();
	const updateProjectInclusion = useUpdateProjectInclusion({
		categoryId: +categoryId,
	});

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const { data: projects, isLoading: isProjectsLoading } =
		useProjectsByCategoryId(+selectedCategoryId);

	const { data, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);
	const selectedCategory = data?.data?.collection;

	const projectsCount = projects?.data ? projects?.data.length + 1 : 0;
	const currentIndex =
		projects?.data.findIndex(
			project => project.inclusionState === InclusionState.Pending,
		) || 0;
	console.log('currentIndex', currentIndex);

	const handleProjectInclusion = (state: InclusionState) => {
		updateProjectInclusion.mutate({
			data: {
				state,
				id: projects?.data[currentIndex]?.id!,
			},
		});
	};

	if (isCategoryLoading || isProjectsLoading) {
		return <LoadingSpinner />;
	}
	return (
		<div>
			<div className='flex min-h-screen flex-col  justify-between'>
				<div className='border-b border-b-gray-300 pb-7 pt-9'>
					<div className='mx-4 flex justify-between gap-6'>
						<p>{selectedCategory?.name}</p>
						<Link href={`${Routes.Categories}/${categoryId}`}>
							✕
						</Link>
					</div>
				</div>
				<div className='mx-8'>
					<ProgressBar
						progress={((currentIndex + 1) / projectsCount) * 100}
					/>
					<p className='mt-2 text-sm'>
						{currentIndex + 1} of {projectsCount} Projects Selected
					</p>
				</div>
				<div className='mt-7 flex justify-center'>
					<CategoryProjectRankingCard
						project={projects?.data[currentIndex]!}
					/>
				</div>
				<div className='mb-3 flex justify-center gap-14 px-6 py-6'>
					<Button
						onClick={() =>
							handleProjectInclusion(InclusionState.Excluded)
						}
						className='rounded-full bg-red-500 p-4'
					>
						<IconTrash />
					</Button>
					<Button className='rounded-full p-4'>
						<IconRefresh />
					</Button>
					<Button
						className='rounded-full bg-green-600 p-4'
						onClick={() =>
							handleProjectInclusion(InclusionState.Included)
						}
						// onClick={() =>
						// 	router.push(
						// 		`${Routes.Categories}/${categoryId}/project-ranking/done`,
						// 	)
						// }
					>
						<IconCheck />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProjectRankingPage;
