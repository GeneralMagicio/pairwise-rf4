import Image from 'next/image';
import { IProject } from '../types';

import { truncate } from '@/app/helpers/text-helpers';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import Button from '@/app/components/Button';
import {
	CategoryMetricData,
	getProjectMetrics,
	Metric,
	processProjectMetricsCSV,
} from '@/utils/getMetrics';
import { formatMetricsNumber } from '@/utils/numbers';
import { getRandomProjectId } from '@/utils/dummy-metrics';

interface ICategoryProjectRankingCardWithMetricsProps {
	project: IProject;
}

const CategoryProjectRankingCardWithMetrics = ({
	project,
}: ICategoryProjectRankingCardWithMetricsProps) => {
	const [learnMore, setLearnMore] = useState(false);

	const [metricsMap, setMetricsMap] = useState<
		Map<string, CategoryMetricData>
	>(new Map());

	const projectMetrics = getProjectMetrics(
		metricsMap,
		getRandomProjectId(project.name), //sample project ID
	);

	const fetchMetrics = async () => {
		try {
			const response = await fetch('/data/updated_metrics_with_ids.csv');
			const data = await response.text();
			const processedMap = processProjectMetricsCSV(data);
			setMetricsMap(processedMap);
		} catch (error) {
			console.error('Failed to load or process CSV', error);
		}
	};

	useEffect(() => {
		fetchMetrics();
	}, []);

	const variants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	return (
		<motion.div
			initial='hidden'
			animate='visible'
			exit='hidden'
			variants={variants}
			className='m-4'
		>
			<div className='w-full select-none rounded-2xl pb-5'>
				<div className='relative mb-4'>
					{project.image ? (
						<div className='mx-auto h-[360px] w-[360px]'>
							<Image
								src={project.image}
								alt={project.name}
								width={500}
								height={500}
								className='mx-auto rounded-2xl'
							/>
						</div>
					) : (
						<div className='relative mx-auto h-[360px] w-[360px] rounded-2xl bg-gray-700'>
							<p className='absolute inset-0 flex items-center justify-center overflow-hidden px-1 text-center text-lg font-bold text-white'>
								{project.name}
							</p>
						</div>
					)}
				</div>
				<div className='flex justify-between'>
					<p className='mb-4 font-bold'>{project.name}</p>
				</div>
				<p className='text-ph'>
					{!learnMore
						? truncate(project.impactDescription, 90)
						: project.impactDescription}
				</p>
				{!learnMore && (
					<Button
						onClick={() => setLearnMore(true)}
						className='mt-4 w-full border border-gray-300 text-black'
					>
						Learn more
					</Button>
				)}

				<div className='my-6 border-t'></div>
				<div>
					{projectMetrics &&
						Object.keys(projectMetrics).map(categoryKey => {
							const categoryMetrics =
								projectMetrics[
									categoryKey as keyof typeof projectMetrics
								];
							return (
								<div
									className='my-2 flex flex-col rounded-lg border border-gray-300 p-3'
									key={categoryKey}
								>
									<h3 className='pb-2 font-bold'>
										{categoryKey}
									</h3>
									{Object.keys(categoryMetrics).map(
										metricKey => {
											const metric = categoryMetrics[
												metricKey as keyof typeof categoryMetrics
											] as Metric;
											return (
												<div
													key={metricKey}
													className='flex justify-between border-b-2 border-gray-200 py-2 last:border-b-0'
												>
													<p className='text-ph'>
														{metric.description}
													</p>
													<p className='font-medium'>
														{formatMetricsNumber(
															metric.value,
														) ?? '--'}
													</p>
												</div>
											);
										},
									)}
								</div>
							);
						})}
				</div>
			</div>
		</motion.div>
	);
};

export default CategoryProjectRankingCardWithMetrics;
