'use client';

import { cn } from '@/app/helpers/cn';
import React, { FC, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { ConnectErrorBox } from './ConnectErrorBox';

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
	setError: (error: string | false) => void;
	error?: string | false;
}

const OtpLength = 6;
const ResendTime = 60;

const ConnectOTPInput: FC<Props> = ({
	otp,
	setOtp,
	state,
	setState,
	onSubmit,
	error,

	setError,
}) => {
	const [resendTimer, setResendTimer] = useState(ResendTime);

	const handleResend = () => {
		setResendTimer(ResendTime);
		setOtp('');
		setState(OtpState.InProgress);
		// resend();
	};

	useEffect(() => {
		setTimeout(() => {
			setResendTimer(Math.max(0, resendTimer - 1));
		}, 1000);
	}, [resendTimer, setResendTimer]);

	const handleOTPChange = (otp: string) => {
		if (otp.length === OtpLength) setState(OtpState.Ready);
		else {
			setState(OtpState.InProgress);
			setError(false);
		}
		setOtp(otp);
	};

	return (
		<div className='flex w-full flex-col items-center gap-4'>
			<OTPInput
				inputStyle={cn(
					`!w-12 h-12 mx-2 text-2xl rounded-lg border-2 border-gray-300`,
					state === OtpState.Valid && 'border-success',
					state === OtpState.Invalid &&
						'border-yellow-400 bg-yellow-50',
				)}
				numInputs={OtpLength}
				onChange={handleOTPChange}
				value={otp}
				inputType={'number'}
				renderInput={props => <input {...props} />}
				shouldAutoFocus
			/>
			{error && <ConnectErrorBox message={error} />}
		</div>
	);
};

export default ConnectOTPInput;
