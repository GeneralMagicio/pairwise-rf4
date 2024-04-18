import React, { useEffect, useState } from 'react';

export const DotsLoader = () => {
	const [dots, setDots] = useState<number>(3);

	useEffect(() => {
		setTimeout(() => {
			setDots(Math.max((dots + 1) % 4, 1));
		}, 250);
	}, [dots]);

	return (
		<div className='flex'>
			{Array.from(Array(dots)).map((dot, index) => (
				<div key={index}>.</div>
			))}
		</div>
	);
};
