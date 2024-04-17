'use client';

import { createSmartWallet } from '@/lib/third-web/methods';
import { client } from '@/lib/third-web/provider';
import Head from 'next/head';
import Image from 'next/image';
import {
	useActiveAccount,
	useActiveWallet,
	useConnect,
	useDisconnect,
} from 'thirdweb/react';
import { inAppWallet, preAuthenticate } from 'thirdweb/wallets/in-app';
// import { SignInEmail } from "./components/SignInEmail";
import { SignInEmail2 } from './components/SignInEmail2';
import { useState } from 'react';
// import { SignInEmail } from './components/SignInEmail';

export default function Home() {
	const [step, setStep] = useState<0 | 1>(0);
	const disconnectWallet = useDisconnect();
	const { connect } = useConnect();

	const wallet = useActiveWallet();
	const account = useActiveAccount();

	const preLogin = async (email: string) => {
		// send email verification code
		await preAuthenticate({
			client,
			strategy: 'email',
			email,
		});
	};

	const handleLogin = async (email: string, verificationCode: string) => {
		// verify email and connect
		await connect(async () => {
			const wallet = inAppWallet();
			await wallet.connect({
				client,
				strategy: 'email',
				email,
				verificationCode,
			});
			return wallet;
		});
	};

	const handleGoogleConnect = () => {
		connect(() => createSmartWallet('google'));
	};

	const handleAppleConnect = () => {
		connect(() => createSmartWallet('apple'));
	};

	// if (step === 1) return <SignInEmail/>
	if (step === 1) return <SignInEmail2 />;

	return (
		<div className='flex min-h-screen flex-col items-center justify-center py-2'>
			<Head>
				<title>Login Page</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
				<Image
					src='/images/impact-profit.png' // Replace with the path to your character image
					alt='Impact = Profit'
					width={330} // Adjust size accordingly
					height={330}
				/>
				<div className='mt-8 flex flex-col gap-4'>
					<button
						onClick={handleGoogleConnect}
						className='flex w-full gap-2 rounded-md bg-white p-3 text-black shadow-sm'
					>
						<Image
							src='/images/google.png'
							alt='Google Icon'
							width={25}
							height={25}
						/>{' '}
						Continue with Google
					</button>
					<button
						onClick={handleAppleConnect}
						className='flex w-full gap-2 rounded-md bg-white p-3 text-black shadow-sm'
					>
						<Image
							src='/images/apple.png'
							alt='Apple Icon'
							width={25}
							height={25}
						/>{' '}
						Continue with Apple
					</button>
					<button
						onClick={() => setStep(1)}
						className='flex w-full gap-2 rounded-md bg-white p-3 text-black shadow-sm'
					>
						<Image
							src='/images/mail-01.png'
							alt='Mail'
							width={25}
							height={25}
						/>{' '}
						Sign in with Email
					</button>
				</div>
				<p className='mt-6'>
					Don’t have an account?{' '}
					<a href='#' className='text-blue-600'>
						Sign up
					</a>
				</p>
			</main>

			<footer className='flex h-24 w-full items-center justify-center border-t'>
				<a
					className='flex items-center justify-center'
					href='#'
					target='_blank'
					rel='noopener noreferrer'
				>
					Powered by Pairwise
				</a>
			</footer>
		</div>
	);
}
