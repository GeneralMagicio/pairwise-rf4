import Image from 'next/image';
import React from 'react';

const WelcomePage = () => {
	return (
		<div className='flex flex-col items-center justify-center'>
			<Image
				src='/images/characters/welcome-character.png'
				alt='Welcome character'
				width={200}
				height={200}
			/>
			<h1 className='mt-4 text-2xl font-bold'>Welcome to Pairwise</h1>
		</div>
	);
};

export default WelcomePage;
