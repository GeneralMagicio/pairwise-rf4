import Image from 'next/image';

export const SigninSuccess = () => {
	return (
		<div className='flex w-full flex-col items-center justify-center gap-4'>
			<Image
				src='/images/sign-in-success.png'
				alt='sing in success'
				width={250}
				height={250}
			/>
			<h1 className='text-center text-4xl font-bold'>
				Account verified successfully
			</h1>
			<h3 className='text-md text-center'>Hodl! Logging in...</h3>
		</div>
	);
};
