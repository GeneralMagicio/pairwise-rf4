'use client';

import { Categories, projects } from '@/app/categories/mockData';
import { useParams, useRouter } from 'next/navigation';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import CategoryRankingListItem from '@/app/categories/components/CategoryRankingListItem';

const CategoryRankingListPage = () => {
	const [listProjects, setListProjects] = useState(projects);
	const router = useRouter();
	const { categoryId } = useParams();

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];
	console.log(categoryId);
	const selectedCategory = Categories.find(
		category => category.id === +selectedCategoryId,
	);
	console.log('selected', selectedCategory);
	const categoryProjects = projects.filter(
		project => project.parentId === +selectedCategoryId,
	);
	console.log('projects', listProjects);

	return (
		<div>
			<TopRouteIndicator name={selectedCategory?.name} />
			<div className='mx-4'>
				<p className='mt-6 text-2xl font-bold'>Well done!</p>
				<p className='mt-2 text-ph'>
					You have finished ranking of Developer Ecosystem, now you
					can create list or continue ranking other projects.
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
	);
};

export default CategoryRankingListPage;
