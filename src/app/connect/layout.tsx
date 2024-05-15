import React, { ReactNode } from 'react';
import Header from '../components/Header';
import ConnectHeader from './components/ConnectHeader';

const ConnectLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<ConnectHeader />
			{children}
		</div>
	);
};

export default ConnectLayout;
