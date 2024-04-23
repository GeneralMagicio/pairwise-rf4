'use client';

import Head from 'next/head';
import React, { ReactNode } from 'react';

const LoginLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='centered-mobile-max-width flex h-screen flex-col items-center'>
			<Head>
				<title>Login Page</title>
			</Head>
			{children}
		</div>
	);
};

export default LoginLayout;
