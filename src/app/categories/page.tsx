'use client';

import React, { useEffect, useState } from 'react';
import CategoryItem from './components/CategoryItem';
import { useCategories } from '../features/categories/getCategories';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGetCategoryPairs } from '../features/categories/getCategoryPairs';
import { CategoryPairwiseModal } from '../category-ranking/components/CategoryPairwiseModal';
import { useRouter } from 'next/navigation';
import CategoryCardView from './components/CategoryCardView';
import CategoryToggleButton from './components/CategoryToggleButton';

const CategoriesPage = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const { data: categories, isLoading } = useCategories();
	const { data: categoryPairs, isLoading: isGettingCategoryPairs } =
		useGetCategoryPairs();
	const router = useRouter();

	const [isCardView, setIsCardView] = useState(() => {
		const savedState = localStorage.getItem('isCardView');
		return savedState !== null ? JSON.parse(savedState) : false;
	});

	useEffect(() => {
		const bool = categoryPairs && categoryPairs.length > 0;
		setModalOpen(bool || false);
	}, [categoryPairs]);

	const closeModal = () => setModalOpen(false);

	const handleSubmit = () => router.push('/category-ranking');

	if (isLoading) {
		return <LoadingSpinner />;
	}

	const toggleView = () => {
		localStorage.setItem('isCardView', JSON.stringify(!isCardView));
		setIsCardView(!isCardView);
	};
	return (
		<div className='px-4'>
			<CategoryPairwiseModal
				isOpen={isModalOpen}
				close={closeModal}
				handleSubmit={handleSubmit}
			/>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='mt-6 text-2xl font-bold'>Categories</h1>
					<p className='mb-6 text-ph '>Select one to begin ranking</p>
				</div>
				<CategoryToggleButton toggleView={toggleView} />
			</div>
			{isCardView ? (
				<div className='grid grid-cols-2 gap-2'>
					{categories?.data?.map((category, index) => (
						<CategoryCardView
							key={category.id}
							category={category}
							imageNumber={(index % 5) + 1}
						/>
					))}
				</div>
			) : (
				categories?.data?.map((category, index) => (
					<CategoryItem
						key={category.id}
						category={category}
						imageNumber={(index % 5) + 1}
					/>
				))
			)}
		</div>
	);
};

export default CategoriesPage;
