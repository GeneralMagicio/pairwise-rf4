'use client';

const LoadingSpinner = () => {
	return (
		<div className='flex h-[85vh] items-center justify-center'>
			<div className='h-20 w-20 animate-spin rounded-full border-8 border-gray-300 border-t-primary' />
		</div>
	);
};

export default LoadingSpinner;
