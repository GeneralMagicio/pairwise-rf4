import Image from 'next/image';

export const SignupSuccess = () => {
	return (
		<div className='flex w-full flex-col items-center justify-center gap-4'>
			<Image
				src='/images/sign-in-success.png'
				alt='sing in success'
				width={250}
				height={250}
			/>
			<h1 className='text-center text-4xl font-bold'>
				Pairwise Passport Verified!
			</h1>
			<h3 className='text-center text-lg'>
				Your journey to direct the Superchain <br /> through RetroPGF
				begins.
			</h3>
			<h3 className='text-md text-center'>Hold! Logging in...</h3>
		</div>
	);
};
