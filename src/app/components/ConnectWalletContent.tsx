'use client';

import Image from 'next/image';
import IconCopy from 'public/images/icons/IconCopy';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import Button from './Button';
import { useEffect, useState } from 'react';
import { useGetOtp } from '../features/user/getOtp';
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { useRouter } from 'next/navigation';
import { Routes } from '../constants/Routes';
import { useContinueGuest } from '../features/badges/getBadges';
import { walletsLogos } from '../constants/WalletIcons';
import { SuccessBox } from '../login/components/SuccessBox';

interface IConnectWalletContentProps {
	onConnect?: () => void;
	closeDrawer: () => void;
}

const ConnectWalletContent = ({
	onConnect,
	closeDrawer,
}: IConnectWalletContentProps) => {
	const { connectors, connectAsync } = useConnect();
	const { address, isConnected } = useAccount();
	const router = useRouter();
	const { data: OtpData, isLoading: isOtpLoading } = useGetOtp();
	const { disconnect } = useDisconnect();
	const [copiedText, copy] = useCopyToClipboard();
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) setTimeout(() => setCopied(false), 1000);
	}, [copied]);

	const { mutateAsync: continueAsGuest, isPending } = useContinueGuest();

	const hasMetaMaskIO = connectors.some(
		connector => connector.id === 'io.metamask',
	);
	const filteredConnectors = hasMetaMaskIO
		? connectors.filter(connector => connector.id !== 'metaMask')
		: connectors;

	const handleConnect = async () => {
		try {
			await continueAsGuest();
			closeDrawer();
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		if (isConnected) {
			onConnect?.();
		}
	}, [isConnected]);

	const targetUrl =
		window && !isOtpLoading
			? `${window.location.origin}/connect?otp=${OtpData?.data}`
			: '';

	return (
		<div className='w-full'>
			<p className='mb-4 border-b border-gray-200 py-4 text-center text-lg font-bold '>
				Connect Wallet
			</p>
			<div className='h-4 w-full flex justify-center'>{copied && <SuccessBox message='Copied' />}</div>

			<div className='mt-4 border-b border-gray-200 py-4'>
				{address ? (
					<button onClick={() => disconnect()}>Disconnect</button>
				) : (
					<div className='flex w-full flex-col gap-2'>
						{filteredConnectors
							.filter(connector => connector.id !== 'metaMaskSDK')
							.map(connector => (
								<div
									className='flex w-full cursor-pointer items-center gap-2 rounded-xl bg-gray-100 p-2 transition-colors duration-200 ease-in-out'
									key={connector.id}
									onClick={() =>
										connectAsync({ connector }).then(() => {
											console.log('Connected to wallet');
											onConnect?.();
										})
									}
								>
									<div className='overflow-hidden rounded-full'>
										{connector.icon &&
										connector.id !== 'walletConnect' ? (
											<Image
												src={connector.icon}
												width={40}
												height={40}
												alt={connector.name}
												unoptimized
											/>
										) : (
											<Image
												src={
													walletsLogos[
														connector.id ||
															'walletConnect'
													]
												}
												width={40}
												height={40}
												alt={connector.name}
											/>
										)}
									</div>
									{connector.name}
								</div>
							))}
					</div>
				)}
			</div>
			<div className='mb-10 flex flex-col gap-4 lg:hidden'>
				<p className='mt-4 font-bold'>
					Is your wallet on a different device?
				</p>
				<span className='text-ph'>
					You can still collect voting power from your wallet by
					following instructions on the website below:
					{/* <a
						className='inline-block font-bold'
						href='/connect'
						target='_blank'
					>
						[website]
					</a> */}
				</span>
				<div className='flex justify-between rounded-md bg-gray-100 px-4 py-2'>
					<a
						target='_blank'
						href={targetUrl || undefined}
						className='font-bold'
					>
						{targetUrl}
					</a>
					<div
						onClick={() => {
							copy(targetUrl);
							setCopied(true);
						}}
						className='cursor-pointer'
					>
						<IconCopy />
					</div>
				</div>

				{/* <Button
					onClick={() => router.push(Routes.Connect)}
					className='border border-gray-200 bg-primary shadow-md'
				>
					Collect Voting Power
				</Button> */}
				<Button
					isLoading={isPending}
					onClick={handleConnect}
					className='w-full border border-gray-200 bg-white text-black text-ph'
				>
					{`Don't Connect Wallet`}
				</Button>
				<p>
					{' '}
					Keep in mind that as guests, your votes will not be
					considered.
				</p>
				{/* <p className='text-ph'>
					You will be redirected to another page outside the app.
				</p> */}
			</div>
		</div>
	);
};

export default ConnectWalletContent;
