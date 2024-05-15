'use client';

import { PwLogo } from 'public/images/icons/PwLogo';
import React from 'react';

const ConnectFooter = () => {
	return (
		<footer className='border-t border-gray-100 px-4 py-2 lg:px-20'>
			<div className='flex justify-between'>
				<div className='flex items-center gap-2'>
					<span className='text-sm'>Powered by</span>
					<PwLogo />
				</div>
				{/* Add Docs and etc here when they are ready */}
			</div>
		</footer>
	);
};

export default ConnectFooter;
