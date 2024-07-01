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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<Head>
				<link rel='icon' href='/favicon.ico' sizes='any' />
				<meta property='og:title' content='Pairwise Voting App' />
				<meta
					property='og:description'
					content='Pairwise Voting App is a fun pseudonymous way to signal in Retro Funding 4. Be part of the experiment ... Vote anytime, anywhere. Share feedback pseudo anonymously.'
				/>
				<meta property='og:image' content='/preview-image.png' />
				<meta property='og:url' content='https://app.pairwise.vote/' />
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
