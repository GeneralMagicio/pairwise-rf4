import { cn } from '@/app/helpers/cn';
import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { ErrorBox } from './ErrorBox';

type OtpState = "in progess" | "ready" | false | true

export const OtpInput = () => {
	const [otp, setOtp] = useState('');
  const [state, setState] = useState<OtpState>("in progess")
	// const [isError, setIsError] = useState(false);

	const handleOTPChange = (otp: string) => {
    if (otp.length === 4) setState("ready")
    else setState('in progess')
		setOtp(otp);
	};

	// const valid = true;

	// const handleOnPaste = (event: any) => {
	// 	const pastedValue = event.clipboardData.getData('text').slice(0, 4);
	// 	setOtp(pastedValue);
	// 	setIsError(!isValidOtp(pastedValue)); // Simulate OTP validation
	// };

	// const isValidOtp = (code: string) => {
	// 	// Replace this with your actual OTP validation logic
	// 	return code === '1234'; // Simulate valid OTP
	// };

	return (
		<div className='flex w-full flex-col gap-4 items-center'>
			<div className='mb-4 text-3xl font-bold'>Verify Email</div>
			<div className='text-center text-gray-500'>
				Please enter the 4 digit secure code sent to your email
				<span className='font-bold'> useremail@gmail.com </span>
			</div>
			<OTPInput
				inputStyle={cn(
					`!w-16 h-16 mx-2 text-2xl rounded-lg border-2 border-gray-300`,
					state === true && 'border-success',
					state === false && 'border-primary bg-pink-100',
          
				)}
				numInputs={4}
				onChange={handleOTPChange}
				// renderSeparator={<span>{separator}</span>}
				value={otp}
				// placeholder={placeholder}
				inputType={'text'}
				renderInput={props => <input {...props} />}
				shouldAutoFocus
			/>
      <ErrorBox message='Oops! we encountered and error. Please try again.'/> 
			<button
				className={cn(
					`mt-16 w-full rounded-md bg-primary py-2 font-bold text-white`,
					state !== "ready" && 'cursor-not-allowed bg-bg_disabled text-fg_disabled',
				)}
				disabled={state !== "ready"}
			>
				Submit
			</button>
			<div className='text-center text-gray-500'>
				Didnt receive the code?{' '}
				<div>
					<a href='#' className='text-primary font-bold hover:underline'>
						Resend Code
					</a>
				</div>
			</div>
		</div>
	);
};
