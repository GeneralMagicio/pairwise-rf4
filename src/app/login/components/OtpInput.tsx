import { cn } from '@/app/helpers/cn';
import React, { FC, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { ErrorBox } from './ErrorBox';
import { DotsLoader } from './bouncing-dots/DotsLoader';
import { Edit2 } from 'public/images/icons/Edit2';

export enum OtpState {
	InProgress,
	Ready,
	Loading,
	Invalid,
	Valid,
}
interface Props {
	onSubmit: () => void;
	resend: () => void;
	otp: string;
	email: string;
	setOtp: (otp: string) => void;
	state: OtpState;
	setState: (state: OtpState) => void;
	error: string | false;
}

const OtpLength = 6;
const ResendTime = 60;

export const OtpInput: FC<Props> = ({
	otp,
	setOtp,
	state,
	email,
	setState,
	onSubmit,
	error,
	resend,
}) => {
	const [resendTimer, setResendTimer] = useState(ResendTime);

	const handleResend = () => {
		setResendTimer(ResendTime);
		setOtp('');
		setState(OtpState.InProgress);
		resend();
	};

	useEffect(() => {
		setTimeout(() => {
			setResendTimer(Math.max(0, resendTimer - 1));
		}, 1000);
	}, [resendTimer, setResendTimer]);

	const handleOTPChange = (otp: string) => {
		if (otp.length === OtpLength) setState(OtpState.Ready);
		else setState(OtpState.InProgress);
		setOtp(otp);
	};

	return (
		<div className='flex w-full flex-col items-center gap-4'>
			<div className='mb-4 text-3xl font-bold'>Verify Email</div>
			<p className='text-center text-gray-500'>
				Please enter the 6 digit secure code sent to your email
				<span className='font-bold'> {email} </span>
				<span className='ml-1 inline-block'>
					<Edit2 />
				</span>
			</p>
			<div className='flex h-24 flex-col items-center gap-8'>
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
				Didnt receive the code?
				<div>
					{resendTimer === 0 ? (
						<div
							onClick={handleResend}
							className='font-bold text-primary'
						>
							Resend Code
						</div>
					) : (
						<div>
							{`Resend code in`}
							<span className='font-bold text-primary'>
								{' '}
								{`${resendTimer}s`}{' '}
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
