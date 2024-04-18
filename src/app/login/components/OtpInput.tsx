import { cn } from '@/app/helpers/cn';
import React, { FC, useState } from 'react';
import OTPInput from 'react-otp-input';
import { ErrorBox } from './ErrorBox';
import { DotsLoader } from './bouncing-dots/DotsLoader';

export enum OtpState {
	InProgress,
	Ready,
	Loading,
	Invalid,
	Valid,
}
interface Props {
	onSubmit: () => void;
	otp: string;
	setOtp: (otp: string) => void;
	state: OtpState;
	setState: (state: OtpState) => void;
	error: string | false;
}

const OtpLength = 6;

export const OtpInput: FC<Props> = ({
	otp,
	setOtp,
	state,
	setState,
	onSubmit,
	error,
}) => {
	const handleOTPChange = (otp: string) => {
		if (otp.length === OtpLength) setState(OtpState.Ready);
		else setState(OtpState.InProgress);
		setOtp(otp);
	};

	return (
		<div className='flex w-full flex-col items-center gap-4'>
			<div className='mb-4 text-3xl font-bold'>Verify Email</div>
			<div className='text-center text-gray-500'>
				Please enter the 4 digit secure code sent to your email
				<span className='font-bold'> useremail@gmail.com </span>
			</div>
			<div className='flex flex-col gap-8 h-28 items-center'>
				<OTPInput
					inputStyle={cn(
						`!w-12 h-12 mx-2 text-2xl rounded-lg border-2 border-gray-300`,
						state === OtpState.Valid && 'border-success',
						state === OtpState.Invalid &&
							'border-primary bg-pink-100',
					)}
					numInputs={OtpLength}
					onChange={handleOTPChange}
					value={otp}
					inputType={'number'}
					renderInput={props => <input {...props} />}
					shouldAutoFocus
				/>
				{error && <ErrorBox message={error} />}
			</div>
			<button
				onClick={onSubmit}
				className={cn(
					`mt-2 w-full rounded-md bg-primary py-2 font-bold text-white`,
					state !== OtpState.Ready &&
						'cursor-not-allowed bg-bg_disabled text-fg_disabled',
				)}
				disabled={state !== OtpState.Ready}
			>
				<span className='flex justify-center'>
					{state === OtpState.Loading ? <DotsLoader /> : 'Submit'}
				</span>
			</button>
			<div className='text-center text-gray-500'>
				Didnt receive the code?{' '}
				<div>
					<a
						href='#'
						className='font-bold text-primary hover:underline'
					>
						Resend Code
					</a>
				</div>
			</div>
		</div>
	);
};
