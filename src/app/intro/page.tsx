import React from 'react';
import CircleNumber from '../components/CircleNumber';

const IntroPage = () => {
	return (
		<div className='flex flex-col items-center justify-center'>
			<h1 className='mb-16 mt-4 text-2xl font-bold'>Easy as 1-2-3</h1>
			<div className='flex flex-col justify-center gap-9  text-center'>
				<div className='flex flex-col items-center justify-center gap-4'>
					<CircleNumber number={1} />
					<p className='text-ph'>
						Select a category to start ranking projects
					</p>
				</div>
				<div className='flex flex-col items-center justify-center gap-4'>
					<CircleNumber number={2} />
					<p className='text-ph'>
						Discover projects and filter through them easily
					</p>
				</div>
				<div className='flex flex-col items-center justify-center gap-4'>
					<CircleNumber number={3} />
					<p className='text-ph'>
						Finally, rank them to submit your vote!
					</p>
				</div>
			</div>
		</div>
	);
};

export default IntroPage;
