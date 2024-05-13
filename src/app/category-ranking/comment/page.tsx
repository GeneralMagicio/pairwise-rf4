'use client';

import CategoryRankingItem from '@/app/categories/components/CategoryRankingItem';
import Button from '@/app/components/Button';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import TopRouteIndicator from '@/app/components/TopRouteIndicator';
import { useCategoryRankings } from '@/app/features/categories/getCategoryRankings';
import { useRouter } from 'next/navigation';

const CategoryRankingComment = () => {
	const router = useRouter();

	const { data, isLoading } = useCategoryRankings();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<div className='relative flex min-h-[calc(100dvh)] flex-col '>
			<div className='flex flex-grow flex-col'>
				<TopRouteIndicator name={'Category Voting'} />
				<div className='pb-8 pt-6'>
					{data?.ranking.map(cat => <CategoryRankingItem key={cat.id} category={cat} />)}
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
					onClick={() => router.push(`/category-ranking/done`)}
					className='w-full bg-primary'
				>
					Submit Vote
				</Button>
			</div>
		</div>
	);
};

export default CategoryRankingComment;
