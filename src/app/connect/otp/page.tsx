'use client';

import Image from 'next/image';
import ConnectOTPInput, { OtpState } from '../components/ConnectOtpInput';
import { useState } from 'react';
import Button from '@/app/components/Button';
import { badgesImages } from '@/app/constants/BadgesData';
import { useUpdateOtp } from '@/app/features/user/updateOtp';
import { useRouter } from 'next/navigation';
import { Routes } from '@/app/constants/Routes';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { useAccount, useSignMessage } from 'wagmi';
import {
	identityLsKey,
	useCreateIdentity,
} from '@/app/hooks/useCreateIdentity';
import axios from 'axios';
import { API_URL } from '@/app/config';
import { BadgeData } from '@/app/badges/components/BadgeCard';

const storeIdentity = async ({
	identity,
	token,
}: {
	identity: string;
	token: string;
}) => {
	return axios.post(
		`${API_URL}user/store-identity`,
		{
			identity,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				auth: token,
			},
		},
	);
};

const storeBadges = async ({
	mainAddress,
	signature,
	token,
}: {
	mainAddress: string;
	signature: string;
	token: string;
}) => {
	const { data: badges } = await axios.post<BadgeData>(
		`${API_URL}user/store-badges`,
		{
			mainAddress,
			signature,
		},
		{
			headers: {
				'Content-Type': 'application/json',
				auth: token,
			},
		},
	);

	return badges;
};

const ConnectOTPPage = () => {
	const [otp, setOtp] = useState('');
	const [otpState, setOtpState] = useState<OtpState>(OtpState.Ready);
	const [error, setError] = useState<string | false>(false);
	const { mutateAsync, isPending } = useUpdateOtp();
	const { createIdentity } = useCreateIdentity();
	const { mutateAsync: storeIdentityMutation } = useMutation({
		mutationFn: storeIdentity,
	});
	const { mutateAsync: storeBadgesMutation, data: badges } = useMutation({
		mutationFn: storeBadges,
	});

	const { address } = useAccount();

	const { signMessageAsync } = useSignMessage();

	const router = useRouter();

	const handleSubmitOtp = async () => {
		try {
			if (otp) {
				const res = await mutateAsync({ data: { otp } });
				setOtpState(OtpState.Valid)

				const token = res.data;
				const message = `Sign this message to generate your Semaphore identity.`;
				const signature = await signMessageAsync({
					message: message,
				});

				await createIdentity(signature);

				const identity = localStorage.getItem(identityLsKey);

				if (!identity || !address) return;

				await Promise.all([
					storeIdentityMutation({ identity, token }),
					storeBadgesMutation({
						mainAddress: address,
						signature,
						token,
					}),
				]);

				router.push(Routes.ConnectSuccess);
			}
		} catch (error) {
			setOtpState(OtpState.Invalid);
			setError('Not able to connect you to a user. Please try again later');
		}
	};

	const disabled = otp.length !== 6 || isPending;

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
						onSubmit={handleSubmitOtp}
						error={error}
						state={otpState}
						setState={setOtpState}
						setError={setError}
					/>
				</div>
				<Button
					onClick={handleSubmitOtp}
					className={`mt-6 w-full ${!disabled ? 'bg-primary' : 'cursor-not-allowed bg-gray-200'}`}
					disabled={disabled}
				>
					Delegate
				</Button>
			</div>
		</div>
	);
};

export default ConnectOTPPage;
