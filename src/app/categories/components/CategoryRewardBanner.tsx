import React from 'react';

const CategoryRewaredBanner: React.FC = () => {
	return (
		<div className='mt-5 flex w-full  flex-col   bg-[#180207] p-[16px] shadow-lg'>
			<div className='flex  items-center gap-[16px] self-stretch'>
				<div className='flex  flex-[1_0_0]   items-center justify-between'>
					<p className='font-inter text-pretty text-sm font-semibold leading-6 text-white'>
						You&apos;ve got a chance to claim OP! Click &quot;Check
						Eligibility&quot; to see if you&apos;re eligible.
						Don&apos;t forget to review your badge group and check
						which raffles you can enter.
					</p>
				</div>
				<a target='_blank' href='https://unitap.app/prizetap'>
					<button className='rounded-md   bg-[#FF0420] p-[8px] text-sm text-white'>
						Check Elegibility
					</button>
				</a>
			</div>
		</div>
	);
};

export default CategoryRewaredBanner;
