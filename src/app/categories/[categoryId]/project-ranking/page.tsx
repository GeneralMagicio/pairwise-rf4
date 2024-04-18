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

const ProjectRankingPage = () => {
	const router = useRouter();
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
			<div className='flex min-h-screen flex-col  justify-between'>
				<div className='border-b border-b-gray-300 pb-7 pt-9'>
					<div className='mx-4 flex justify-between gap-6'>
						<p>{selectedCategory?.name}</p>
						<Link href={`${Routes.Categories}/${categoryId}`}>
							✕
						</Link>
					</div>
				</div>
				<div className='mt-7 flex justify-center'>
					<CategoryProjectRankingCard project={categoryProjects[0]} />
				</div>
				<div className='mb-3 flex justify-center gap-14 px-6 py-6'>
					<Button className='rounded-full bg-red-500 p-4'>
						<IconTrash />
					</Button>
					<Button className='rounded-full p-4'>
						<IconRefresh />
					</Button>
					<Button
						className='rounded-full bg-green-600 p-4'
						onClick={() =>
							router.push(
								`${Routes.Categories}/${categoryId}/project-ranking/done`,
							)
						}
					>
						<IconCheck />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProjectRankingPage;
