import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TanstackProvider from './providers/TanstackProvider';
import WagmiAppProvider from './providers/WagmiAppProvider';
import './globals.css';
import './globals.css';
import { Thirdweb5Provider } from '@/lib/third-web/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Pairwise',
	description: 'Voting APP',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<WagmiAppProvider>
					<TanstackProvider>
						<Thirdweb5Provider>
							<div>{children}</div>
						</Thirdweb5Provider>
					</TanstackProvider>
					<div id='modal-root'></div>
				</WagmiAppProvider>
			</body>
		</html>
	);
}
