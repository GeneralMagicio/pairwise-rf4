'use client';

import { useActiveWallet } from 'thirdweb/react';
import LoadingSpinner from './components/LoadingSpinner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const wallet = useActiveWallet();

	useEffect(() => {
		router.push('/categories');
	}, [wallet, router]);

	if (wallet) {
		return <LoadingSpinner />;
	}

	return (
		<main className='flex min-h-[calc(100dvh)] flex-col items-center justify-between p-24'>
			Main Page
		</main>
	);
}
