import React, { ReactNode } from 'react';
import Header from '../components/Header';
import ConnectHeader from './components/ConnectHeader';
import ConnectFooter from './components/ConnectFooter';

const ConnectLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<ConnectHeader />
			{children}
			<ConnectFooter />
		</div>
	);
};

export default ConnectLayout;
