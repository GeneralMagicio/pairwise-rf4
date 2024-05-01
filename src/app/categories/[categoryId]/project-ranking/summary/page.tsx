'use client';

import CategoryProjectItem from '@/app/categories/components/CategoryProjectItem';
import { Categories, projects } from '@/app/categories/mockData';
import Button from '@/app/components/Button';
import TopNavigation from '@/app/components/TopNavigation';
import { Routes } from '@/app/constants/Routes';
import { useParams, useRouter } from 'next/navigation';

const ProjectRankingSummaryPage = () => {
	const { categoryId } = useParams();
	const router = useRouter();
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const selectedCategory = Categories.find(
		category => category.id === +selectedCategoryId,
	);

	const categoryProjects = projects.filter(
		project => project.parentId === +selectedCategoryId,
	);

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
							25 out of 38 projects selected
						</p>
					</div>
					<p className='mb-6 text-lg'>{selectedCategory?.name}</p>
					<p className='text-lg'>Selected (25)</p>
					{categoryProjects.map(project => (
						<CategoryProjectItem
							project={project}
							key={project.id}
						/>
					))}
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
