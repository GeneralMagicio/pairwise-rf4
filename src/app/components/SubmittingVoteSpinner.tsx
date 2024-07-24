import React from 'react';
import Image from 'next/image';

const SubmittingVoteSpinner = () => {
	return (
		<div>
			<div className='fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75'>
				<div className='relative flex w-[343px] flex-col items-center rounded-lg bg-white shadow-lg'>
					<div className=' '>
						<svg
							className='absolute left-0 top-0 '
							xmlns='http://www.w3.org/2000/svg'
							width='88'
							height='92'
							viewBox='0 0 88 92'
							fill='none'
						>
							<circle cx='40' cy='44' r='47.5' stroke='#E0E2EB' />
						</svg>

						<svg
							className=' absolute left-0 top-0 opacity-80'
							xmlns='http://www.w3.org/2000/svg'
							width='112'
							height='116'
							viewBox='0 0 112 116'
							fill='none'
						>
							<circle cx='40' cy='44' r='71.5' stroke='#E0E2EB' />
						</svg>

						<svg
							className='absolute left-0 top-0 opacity-70'
							xmlns='http://www.w3.org/2000/svg'
							width='136'
							height='140'
							viewBox='0 0 136 140'
							fill='none'
						>
							<circle cx='40' cy='44' r='95.5' stroke='#E0E2EB' />
						</svg>

						<svg
							className='absolute left-0 top-0 opacity-50'
							xmlns='http://www.w3.org/2000/svg'
							width='160'
							height='164'
							viewBox='0 0 160 164'
							fill='none'
						>
							<circle
								cx='40'
								cy='44'
								r='119.5'
								stroke='#E0E2EB'
							/>
						</svg>
					</div>
					<div>
						<Image
							src='/images/sandClock.gif'
							alt='sing in success'
							width={140}
							height={140}
						/>
					</div>
					<div className='flex flex-col items-center gap-3 self-stretch px-[20px] pb-6'>
						<p className='text-[#05060B)]text-center font-inter text-[17px] font-semibold leading-[22px] tracking-[-0.073px]'>
							Submitting Vote
						</p>
						<p className='text[#404454] font-inter text-center text-[14px] font-normal leading-[18px] tracking-[-0.011px]'>
							Please wait while the vote is being submitted. This
							may take a while.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubmittingVoteSpinner;
