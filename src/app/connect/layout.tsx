'use client';

import React, { ReactNode } from 'react';

import ConnectHeader from './components/ConnectHeader';
import ConnectFooter from './components/ConnectFooter';

const ConnectLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='flex min-h-[calc(100dvh)] flex-col'>
			<ConnectHeader />
			<div className='flex-grow'>{children}</div>
			<ConnectFooter />
		</div>
	);
};

export default ConnectLayout;
