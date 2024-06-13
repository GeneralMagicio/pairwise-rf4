'use client';
import { client } from '@/lib/third-web/provider';
import Image from 'next/image';
import {
	useActiveAccount,
	useActiveWallet,
	useConnect,
	useDisconnect,
} from 'thirdweb/react';
import { preAuthenticate } from 'thirdweb/wallets/in-app';
import { SignInEmail2, isEmailValid } from './components/SignInEmail2';
import { useEffect, useState } from 'react';
import { BackHeader } from './components/BackHeader';
import { OtpInput, OtpState } from './components/OtpInput';
import { useRouter } from 'next/navigation';
import { PwLogo } from 'public/images/icons/PwLogo';
import {
	createEmailEoa,
	createSmartWalletFromEOA,
	createSocialEoa,
} from '@/lib/third-web/methods';
import { InfoBox } from './components/InfoBox';
import { SignupSuccess } from './components/success-screens/SignupSuccess';
import { SigninSuccess } from './components/success-screens/SigninSuccess';
import { Routes } from '../constants/Routes';
import { LogginToPwBackendState, useAuth } from '@/lib/third-web/AutoConnect';
import { ErrorBox } from './components/ErrorBox';
import posthog from 'posthog-js';

enum Step {
	Main,
	EnterEmail,
	Loading,
	Otp,
	Success,
	Welcome,
}

export default function Home() {
	const [step, setStep] = useState<Step>(Step.Main);
	const [otpState, setOtpState] = useState<OtpState>(OtpState.InProgress);
	const [otpError, setOtpError] = useState<string | false>(false);
	const [emailError, setEmailError] = useState(false);
	const [createdEOA, setCreatedEOA] = useState(false);
	const [socialError, setSocialError] = useState(false);
	const [socialLoading, setSocialLoading] = useState(false);
	const [otp, setOtp] = useState('');
	const { isAutoConnecting, isNewUser, loggedToPw } = useAuth();
	const router = useRouter();
	const [strategy, setStrategy] = useState('');


	const disconnectWallet = useDisconnect();
	const { connect, error } = useConnect();
	const [email, setEmail] = useState<string>('');

	const handleEmail = (email: string) => {
		setEmailError(false);
		setEmail(email);
	};

	

	const wallet = useActiveWallet();
	const account = useActiveAccount();
	useEffect(() => {
		const CaptureEvent = async () => {
			posthog.capture('Open Login Page');
		};
	
		CaptureEvent();
	  }, []); 

	const handleOtpChange = (otp: string) => {
		setOtpError(false);
		setOtp(otp);
	};

	const preLogin = (email: string) => async () => {
		// send email verification code
		if (!isEmailValid(email)) {
			setEmailError(true);
			return;
		}

		setStep(Step.Otp);
		try {
			await preAuthenticate({
				client,
				strategy: 'email',
				email,
			});
		} catch (e) {
			setOtpError('An error occurred! Try again.');
		}
	};

	useEffect(() => {
		if (error) {
			setOtpState(OtpState.Invalid);
			setOtpError('An error occurred! Try again.');
		}
	}, [error]);

	useEffect(() => {
		if (createdEOA) setStep(Step.Success);
		else if (!createdEOA && step === Step.Success) setStep(Step.Main);
	}, [createdEOA, step]);

	useEffect(() => {
		if (loggedToPw === LogginToPwBackendState.Error) {
			setStep(Step.Main);
			setSocialError(true);
		}
	}, [loggedToPw]);

	useEffect(() => {
		if (loggedToPw === LogginToPwBackendState.LoggedIn && !isNewUser) {
			posthog.identify(localStorage.getItem("auth")|| '')
			posthog.capture('User Logged In',{loginType:strategy})
			router.push(Routes.Categories);
		} else if (
			loggedToPw === LogginToPwBackendState.LoggedIn &&
			isNewUser
		) {
			posthog.identify(localStorage.getItem("auth")|| '')
			posthog.capture('User Logged In',{loginType:strategy})
			router.push(Routes.Welcome);
		}
	}, [step, router, isNewUser, loggedToPw]);

	const handleEmailLogin =
		(email: string, verificationCode: string) => async () => {
			setOtpState(OtpState.Loading);
			try {
				const emailEoa = await createEmailEoa(email, verificationCode);
				const account = emailEoa.getAccount();
				if (!account) {
					throw new Error(`Unable to create an email EOA`);
				}
				setOtpState(OtpState.Valid);
				setTimeout(() => setCreatedEOA(true), 500);
				connect(() => createSmartWalletFromEOA(account));
			} catch (e) {
				setOtpState(OtpState.Invalid);
				setOtpError('Incorrect code');
			}
		};

	const handleSocialConnect = (strategy: 'google' | 'apple') => async () => {
		setStrategy(strategy);
		setSocialLoading(true);
		const socialEoa = await createSocialEoa(strategy);
		setCreatedEOA(true);
		const account = socialEoa.getAccount();
		if (!account) {
			throw new Error(`Unable to create a ${strategy} EOA`);
		}
		setSocialLoading(false);
		connect(() => createSmartWalletFromEOA(account));
	};

	if (step === Step.Success && isNewUser) {
		return (
			<div className='mt-48 w-[85%]'>
				<SignupSuccess />
			</div>
		);
	}

	if (step === Step.Success && !isNewUser) {
		return (
			<div className='mt-48 w-[85%]'>
				<SigninSuccess />
			</div>
		);
	}

	if (step === Step.EnterEmail)
		return (
			<>
				<BackHeader onClick={() => setStep(Step.Main)} />
				<div className='mt-32 w-full'>
					<SignInEmail2
						emailError={emailError}
						setEmail={handleEmail}
						email={email}
						onSubmit={preLogin(email)}
					/>
				</div>
			</>
		);

	if (step === Step.Otp)
		return (
			<>
				<BackHeader onClick={() => setStep(Step.EnterEmail)} />
				<div className='mx-auto mt-32 w-[90%]'>
					<OtpInput
						resend={preLogin(email)}
						error={otpError}
						onSubmit={handleEmailLogin(email, otp)}
						otp={otp}
						email={email}
						setOtp={handleOtpChange}
						setState={setOtpState}
						state={otpState}
					/>
				</div>
			</>
		);

	if (step === Step.Main)
		return (
			<div className='relative flex h-full w-full flex-col items-center justify-between'>
				<div className='absolute top-16 flex w-full flex-col items-center justify-center gap-4'>
					{isAutoConnecting && (
						<InfoBox message='Please wait. Auto connecting...' />
					)}
					{socialLoading && (
						<InfoBox message='Please wait...' />
					)}
					{socialError && (
						<div className=''>
							<ErrorBox message='Oops! we encountered and error. Please try again.' />
						</div>
					)}
				</div>
				<main className='flex w-full flex-1 flex-col items-center justify-center px-8 text-center'>
					<Image
						src='/images/impact-profit.png' // Replace with the path to your character image
						alt='Impact = Profit'
						width={330} // Adjust size accordingly
						height={330}
					/>
					<div className='mt-20 flex w-full flex-col gap-2'>
						<button
							onClick={handleSocialConnect('google')}
							className='border-color-fg flex w-full justify-center gap-2 rounded-lg border bg-white p-3 text-black shadow-sm'
						>
							<Image
								src='/images/google.png'
								alt='Google Icon'
								width={25}
								height={25}
							/>{' '}
							<span className='ml-1 font-bold'>
								Continue with Google
							</span>
						</button>
						<button
							onClick={handleSocialConnect('apple')}
							className='border-color-fg flex w-full justify-center gap-2 rounded-lg border bg-white p-3 text-black shadow-sm'
						>
							<Image
								src='/images/apple.png'
								alt='Apple Icon'
								width={25}
								height={25}
							/>{' '}
							<span className='ml-1 font-bold'>
								Continue with Apple
							</span>
						</button>
						<button
							onClick={() => {
								setStrategy('email');
								setStep(Step.EnterEmail)}}
							className='border-color-fg flex w-full justify-center gap-2 rounded-lg border bg-white p-3 text-black shadow-sm'
						>
							<Image
								src='/images/mail-01.png'
								alt='Mail'
								width={25}
								height={25}
							/>{' '}
							<span className='ml-1 font-bold'>
								Sign in with Email
							</span>
						</button>
					</div>
				</main>

				<footer className='flex h-24 w-full items-center justify-center'>
					<span className='text-sm'>Powered by</span>
					<PwLogo />
				</footer>
			</div>
		);
}
