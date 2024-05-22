'use client';

import CategoryCard from '@/app/categories/components/CategoryCard';
import Button from '@/app/components/Button';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { Routes } from '@/app/constants/Routes';
import { useCategoryById } from '@/app/features/categories/getCategoryById';
import { useParams, useRouter } from 'next/navigation';

const RankingDonePage = () => {
	const router = useRouter();
	const { categoryId } = useParams();
	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const { data, isLoading } = useCategoryById(+selectedCategoryId);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			<div className='flex min-h-[calc(90vh)] flex-col items-center justify-center'>
				<div className='text-center'>
					<p className='text-2xl font-extrabold'>Ranking done!</p>
					<p className='mb-2 mt-4 text-lg text-ph'>
						Preview your project ranking and submit your vote
					</p>
					<div className='mx-auto mt-6 flex w-[170px] justify-center'>
						<CategoryCard
							category={data?.data.collection!}
							progress={data?.data.progress}
						/>
					</div>
				</div>
			</div>
			<div className='sticky bottom-0 border-t border-b-gray-200 bg-white px-6 py-6'>
				<Button
					onClick={() =>
						router.push(
							`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-list`,
						)
					}
					className='w-full bg-primary'
				>
					Preview Ranking
				</Button>
			</div>
		</div>
	);
};

export default RankingDonePage;
