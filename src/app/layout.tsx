import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TanstackProvider from './providers/TanstackProvider';
import WagmiAppProvider from './providers/WagmiAppProvider';
import PHProvider from './providers/PostHogProvider';
import './globals.css';
import './globals.css';
import { Thirdweb5Provider } from '@/lib/third-web/provider';
import { AuthGuard } from '@/utils/AuthGuard';
import { ConnectProvider } from './providers/ConnectProvider';
import ConnectDrawers from './components/ConnectDrawers';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Pairwise',
	description: 'Voting APP',
	icons: [
		{
			rel: 'icon',
			url: '/favicon.ico',
			sizes: 'any',
		},
		{
			rel: 'icon',
			url: '/favicon.svg',
			type: 'image/svg+xml',
		},
		{
			rel: 'icon',
			url: '/favicon.png',
			type: 'image/png',
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<Head>
				<link rel='icon' href='/favicon.ico' sizes='any' />
			</Head>
			<body className={inter.className}>
				<WagmiAppProvider>
					<TanstackProvider>
						<Thirdweb5Provider>
							<AuthGuard>
								<PHProvider>
									<ConnectProvider>
										<div>{children}</div>
										<ConnectDrawers />
									</ConnectProvider>
								</PHProvider>
							</AuthGuard>
						</Thirdweb5Provider>
					</TanstackProvider>
					<div id='modal-root'></div>
				</WagmiAppProvider>
			</body>
		</html>
	);
}
