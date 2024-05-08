'use client';

import CategoryItem from '@/app/categories/components/CategoryItem';
import { Categories, projects } from '@/app/categories/mockData';
import Button from '@/app/components/Button';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import { Routes } from '@/app/constants/Routes';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useParams, useRouter } from 'next/navigation';

const CategoryRankingComment = () => {
	const router = useRouter();
	const { categoryId } = useParams();
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const { data: category, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);

	if (isCategoryLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='relative flex min-h-[calc(100dvh)] flex-col '>
			<div className='flex flex-grow flex-col'>
				<TopRouteIndicator name={category?.data.collection?.name} />
				<div className='pb-8 pt-6'>
					<CategoryItem category={category?.data.collection!} />
				</div>
				<div className='mx-4'>
					<label className='block text-sm font-medium text-gray-700'>
						Add comment
					</label>
					<textarea
						placeholder='Add comments to describe reason for your voting and ranking.'
						className='mt-1 block h-[100px] w-full resize-none rounded-md border border-gray-300 px-3 py-2 shadow-sm'
					></textarea>
					<p className='mt-2 text-sm text-gray-500'>
						Min 100 characters
					</p>
				</div>
			</div>

			<div className='sticky bottom-0 w-full border-t border-gray-200 bg-white px-6 py-6'>
				<Button
					onClick={() =>
						router.push(
							`${Routes.Categories}/${category?.data.collection?.id}/pairwise-ranking/done`,
						)
					}
					className='w-full bg-primary'
				>
					Submit Vote
				</Button>
			</div>
		</div>
	);
};

export default CategoryRankingComment;
