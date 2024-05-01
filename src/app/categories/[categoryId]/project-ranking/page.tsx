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
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ProjectRankingPage = () => {
	const [exitDirection, setExitDirection] = useState(0);
	const [exitRotation, setExitRotation] = useState(0);

	const router = useRouter();
	const { categoryId } = useParams();
	const updateProjectInclusion = useUpdateProjectInclusion({
		categoryId: +categoryId,
	});

	const selectedCategoryId =
		typeof categoryId === 'string' ? categoryId : categoryId[0];

	const {
		data: projects,
		isLoading: isProjectsLoading,
		isFetching: isProjectsFetching,
	} = useProjectsByCategoryId(+selectedCategoryId);

	const { data, isLoading: isCategoryLoading } =
		useCategoryById(+selectedCategoryId);
	const selectedCategory = data?.data?.collection;

	const projectsCount = projects?.data ? projects?.data.length + 1 : 0;
	const currentIndex =
		projects?.data.findIndex(
			project => project.inclusionState === InclusionState.Pending,
		) || 0;

	const updatingProject =
		isProjectsFetching || updateProjectInclusion.isPending;

	console.log('currentIndex', currentIndex);

	const handleProjectInclusion = (state: InclusionState) => {
		if (state === InclusionState.Excluded) {
			setExitDirection(-150);
			setExitRotation(-20);
		} else if (state === InclusionState.Included) {
			setExitDirection(150);
			setExitRotation(20);
		}
		updateProjectInclusion.mutate({
			data: {
				state,
				id: projects?.data[currentIndex]?.id!,
			},
		});
	};

	const animationVariants = {
		hidden: { opacity: 0, x: -50 },
		show: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.5,
			},
		},
		exit: {
			opacity: 0,
			x: exitDirection,
			rotate: exitRotation,
			transition: {
				duration: 0.5,
			},
		},
	};

	useEffect(() => {
		currentIndex === -1 &&
			router.push(
				`${Routes.Categories}/${categoryId}/project-ranking/done`,
			);
	}, [currentIndex]);

	if (isCategoryLoading || isProjectsLoading || currentIndex === -1) {
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
				<AnimatePresence mode='wait'>
					<motion.div
						key={currentIndex}
						variants={animationVariants}
						initial='hidden'
						animate='show'
						exit='exit'
					>
						<div className='mt-7 flex justify-center'>
							<CategoryProjectRankingCard
								project={projects?.data[currentIndex]!}
							/>
						</div>
					</motion.div>
				</AnimatePresence>
				<div className='mb-3 flex justify-center gap-14 px-6 py-6'>
					<Button
						disabled={updatingProject}
						onClick={() =>
							handleProjectInclusion(InclusionState.Excluded)
						}
						className={`rounded-full p-4 ${updatingProject ? 'cursor-not-allowed bg-red-200' : 'bg-red-500'}`}
					>
						<IconTrash />
					</Button>
					<Button
						disabled={updatingProject}
						className='rounded-full p-4'
					>
						<IconRefresh />
					</Button>
					<Button
						disabled={updatingProject}
						className={`rounded-full p-4 ${updatingProject ? 'cursor-not-allowed bg-green-200' : 'bg-green-600'}`}
						onClick={() =>
							handleProjectInclusion(InclusionState.Included)
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
