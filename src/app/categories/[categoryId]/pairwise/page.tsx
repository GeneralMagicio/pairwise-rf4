'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Categories, projects } from '../../mockData';
import { Routes } from '@/app/constants/Routes';
import CategoryPairwiseCard from '../../components/CategoryPairwiseCard';

const PariwisePage = () => {
	const { categoryId } = useParams();
	console.log('categoryId', categoryId);
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];
	const selectedCategory = Categories.find(
		category => category.id === +selectedCategoryId,
	);
	const categoryProjects = projects.filter(
		project => project.parentId === +selectedCategoryId,
	);
	return (
		<div>
			<div className='border-b border-b-gray-300 pb-7 pt-9'>
				<div className='mx-4 flex justify-between gap-6'>
					<p>{selectedCategory?.name}</p>
					<Link href={`${Routes.Categories}/${categoryId}`}>✕</Link>
				</div>
			</div>
			<div className='mt-7 flex justify-center'>
				<CategoryPairwiseCard project={categoryProjects[0]} />
			</div>
		</div>
	);
};

export default PariwisePage;
