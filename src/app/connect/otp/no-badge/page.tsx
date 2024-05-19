import Image from 'next/image';

const ConnectNoBadgePage = () => {
	return (
		<div className='mx-auto'>
			<div className='mt-7 text-center'>
				<Image
					src={'/images/characters/9.png'}
					width={220}
					height={100}
					alt='logo'
					className='mx-auto'
				/>
			</div>
			<div className='mx-auto flex max-w-[520px] flex-col justify-center gap-6'>
				<p className='mt-5 text-center font-bold text-primary'>
					No Badges Found!
				</p>
				<p className='text-center text-2xl'>
					Looks like you don’t have any badges to Collect Voting
					Power.
				</p>
				<p className='text-center text-ph'>
					Try connecting with a different wallet instead?
				</p>
			</div>
		</div>
	);
};

export default ConnectNoBadgePage;
