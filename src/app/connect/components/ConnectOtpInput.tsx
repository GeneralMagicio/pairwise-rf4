'use client';

import { cn } from '@/app/helpers/cn';
import React, { FC } from 'react';
import OTPInput from 'react-otp-input';
import { ConnectErrorBox } from './ConnectErrorBox';

export enum OtpState {
	InProgress,
	Ready,
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

const ConnectOTPInput: FC<Props> = ({ otp, setOtp, state, error }) => {
	const handleOTPChange = (otp: string) => {
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
