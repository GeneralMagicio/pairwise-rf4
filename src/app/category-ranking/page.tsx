'use client';

import React, { useEffect } from 'react';
// import CategoryPairwiseCard from '../../components/CategoryPairwiseCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useGetCategoryPairs } from '../features/categories/getCategoryPairs';
import CategoryPairwiseCard from '../categories/components/CategoryPairwiseCard';
import { useUpdateCategoryVote } from '../features/categories/updateCategoryVote';
import TopRouteIndicator from '../components/TopRouteIndicator';
import { useRouter } from 'next/navigation';

interface IUserSeenRankingFinishedModal {
	value: string;
	categoryId: string;
}

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const CategoryPairwiseRankingPage = () => {
	// const router = useRouter();
	// const { categoryId } = useParams();

	// const selectedCategoryId =
	// 	typeof categoryId === 'string' ? categoryId : categoryId[0];

	// const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter()

	const { mutate, isPending: isVotingPending } = useUpdateCategoryVote();

	// const { data: categoryData, isLoading: isCategoryLoading } =
	// 	useCategoryById(+selectedCategoryId);

	const {
		data: pairwisePairs,
		isLoading: isPairwisePairsLoading,
		isFetching: isFetchingPairwise,
	} = useGetCategoryPairs();
	console.log('PairwiseData', pairwisePairs);

	const [firstCategory, secondCategory] = pairwisePairs ?? [];

	useEffect(() => {
		if (pairwisePairs?.length === 0) router.push('/category-ranking/comment')
	}, [pairwisePairs, router])

	// const cu	rrentPercentage =
	// 	((pairwisePairs?.votedPairs ?? 0) /
	// 		(pairwisePairs?.totalPairs ?? 1)) *
	// 	100;
	// const thresholdPercentage = pairwisePairs?.threshold
	// 	? +pairwisePairs?.threshold * 100
	// 	: 100;

	// const handleVote = (pickedId: number) => console.log("Voting")

	const isLoading = false
	const handleVote = async (pickedId: number) => {
		mutate({
			data: {
				collection1Id: firstCategory.id,
				collection2Id: secondCategory.id,
				pickedId,
			},
		});
	};

	// const isLoading = isVotingPending || isFetchingPairwise;

	// const userSawModal = () => {
	// 	localStorage.setItem(
	// 		'hasUserSeenRankingFinishedModal',
	// 		JSON.stringify({
	// 			value: 'true',
	// 			categoryId: selectedCategoryId,
	// 		}),
	// 	);
	// };

	// useEffect(() => {
	// 	const hasUserSeenRankingFinishedModal = localStorage.getItem(
	// 		'hasUserSeenRankingFinishedModal',
	// 	);

	// 	const parsedData: IUserSeenRankingFinishedModal = JSON.parse(
	// 		hasUserSeenRankingFinishedModal || '{}',
	// 	);

	// 	if (
	// 		currentPercentage > thresholdPercentage &&
	// 		(!hasUserSeenRankingFinishedModal ||
	// 			parsedData.categoryId !== selectedCategoryId ||
	// 			parsedData.value !== 'true')
	// 	) {
	// 		setIsModalOpen(true);
	// 	}
	// }, [currentPercentage]);

	// useEffect(() => {
	// 	//If the user has voted all the pairs, redirect to the ranking list
	// 	if (
	// 		pairwisePairs? &&
	// 		pairwisePairs?.votedPairs === pairwisePairs?.totalPairs
	// 	) {
	// 		console.log(
	// 			'My Log',
	// 			pairwisePairs?.totalPairs,
	// 			pairwisePairs?.totalPairs,
	// 		);
	// 		//it should change
	// 		router.push(
	// 			`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-list`,
	// 		);
	// 	}
	// }, [pairwisePairs?]);

	if (
		isPairwisePairsLoading
		|| pairwisePairs?.length === 0
		// !pairwisePairs?.pairs[0]
	) {
		return <LoadingSpinner />;
	}

	// if () router.push('/category-ranking/comment')


	return (
		<div className='flex min-h-[calc(100dvh)] flex-col justify-between'>
			<div>
				<TopRouteIndicator name={"Category Voting"} />
				{/* <div className='mb-1 mt-6 px-8'>
					<ProgressBar progress={currentPercentage} />
					<p className='mt-2 text-sm'>
						{currentPercentage.toFixed(2)}% of 100% Projects ranked
					</p>
					{/* <p>Voted {pairwisePairs?.votedPairs}</p>
				<p>Total {pairwisePairs?.totalPairs}</p>
				<p>Total {pairwisePairs?.threshold}</p> 
	</div> */}
				<p className='text-bold mb-4 mt-6 px-3 text-center text-base'>
					{`Which category should receive more RetroPGF funding?`}
				</p>
				<div className='flex flex-col items-center justify-center gap-3'>
					<div
						key={firstCategory.id}
						onClick={() => {
							console.log('Clicking on First', isLoading);
							!isLoading && handleVote(firstCategory.id);
						}}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCard project={firstCategory} />
					</div>
					<div
						key={secondCategory.id}
						onClick={() =>
							!isLoading && handleVote(secondCategory.id)
						}
						className={`${isLoading ? 'cursor-not-allowed opacity-50' : 'opacity-100'} cursor-pointer`}
					>
						<CategoryPairwiseCard project={secondCategory} />
					</div>
				</div>
			</div>
			{/* { ? (
				<div className='border-t border-t-gray-300 px-6 py-6'>
					<Button
						onClick={() => {
							router.push(
								`${Routes.Categories}/${selectedCategoryId}/pairwise-ranking/ranking-list`,
							);
						}}
						className='w-full bg-primary'
					>
						Finish Ranking
					</Button>
				</div>
			) : (
				<div></div>
			)} */}
		</div>
	);
};

export default CategoryPairwiseRankingPage;
