import { badgesImages } from '@/app/constants/BadgesData';
import Image from 'next/image';

const ConnectOTPSuccessPage = () => {
	return (
		<div className='mx-auto'>
			<div className='mt-7 text-center'>
				<Image
					src={'/images/characters/29.png'}
					width={220}
					height={100}
					alt='logo'
					className='mx-auto'
				/>
			</div>
			<div className='flex flex-col gap-4'>
				<p className='text-center text-3xl font-medium'>
					You successfully collected your voting power
				</p>
				<div className='relative flex justify-center'>
					{badgesImages.map((image, index) => (
						<div
							key={index}
							className={`flex-shrink-0 ${index > 0 ? '-ml-9' : 'ml-0'} rounded-full p-2`}
						>
							<div className='rounded-full'>
								<Image
									width={86}
									height={86}
									src={image.src}
									alt={image.alt}
								/>
							</div>
						</div>
					))}
				</div>
				<p className='text-center text-4xl font-bold text-primary'>
				Pseudonymously 
				</p>
				<p className='text-center text-lg'>
					Secured by zk-proof technology
				</p>
				<p className='text-center text-primary'>
					Find out how this zk-proof delegation works
				</p>
			</div>
		</div>
	);
};

export default ConnectOTPSuccessPage;
