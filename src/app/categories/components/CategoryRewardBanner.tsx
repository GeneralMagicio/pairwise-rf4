import React from 'react';

const CategoryRewaredBanner: React.FC = () => {
	return (
		<div className='mt-5 flex w-full  flex-col   bg-[#180207] p-[16px] shadow-lg'>
			<div className='flex items-center gap-[16px] self-stretch'>
				<div className='flex flex-[1_0_0] items-center justify-between'>
					<p className='font-inter text-base font-semibold leading-6 text-white'>
						Your activity and support deserve a prize! Unwrap your
						special reward now.
					</p>
				</div>
				<button className='rounded-md   bg-[#FF0420] p-[8px] text-white'>
					Claim Prize
				</button>
			</div>
		</div>
	);
};

export default CategoryRewaredBanner;
