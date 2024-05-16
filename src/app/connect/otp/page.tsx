'use client';

import Image from 'next/image';
import ConnectOTPInput, { OtpState } from '../components/ConnectOtpInput';
import { useState } from 'react';
import Button from '@/app/components/Button';
import { badgesImages } from '@/app/constants/BadgesData';

const ConnectOTPPage = () => {
	const [otp, setOtp] = useState('');
	const [otpState, setOtpState] = useState<OtpState>(OtpState.Ready);

	return (
		<div className='centered-mobile-max-width'>
			<div className='text-center'>
				<Image
					src={'/images/characters/7.png'}
					width={220}
					height={100}
					alt='logo'
					className='mx-auto'
				/>
			</div>
			<div className='mt-6'>
				<p className='text-center text-2xl font-medium'>Voting Power</p>
			</div>
			<div className='relative mb-10 mt-4 flex justify-center'>
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
			<div className='border-1 mb-10 rounded-lg border border-gray-200 p-6'>
				<p className='text-xl font-semibold'>
					Paste the OTP from Pairwise.
				</p>
				<p className='mb-6 mt-2 text-primary'>How to get OTP?</p>
				<div>
					<ConnectOTPInput
						otp={otp}
						setOtp={setOtp}
						onSubmit={() => {}}
						state={otpState}
						setState={setOtpState}
					/>
				</div>
				<Button className='mt-16 w-full bg-primary'>Delegate</Button>
			</div>
		</div>
	);
};

export default ConnectOTPPage;
