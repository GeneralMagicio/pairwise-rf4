'use client';

import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useAuth } from '@/lib/third-web/AutoConnect';
import { usePathname, useRouter } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useActiveWallet } from 'thirdweb/react';

const PublicRoutes = [
	'/login',
	'/connect',
	'/connect/otp',
	'/connect/otp/success',
	'/connect/otp/no-badge',
];

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const wallet = useActiveWallet();
	const currentRoute = usePathname();
	const { loggedToPw, isAutoConnecting } = useAuth();
	const { push } = useRouter();

	const [moveForward, setMoveForward] = useState(false);

	const isPublicRoute = PublicRoutes.includes(currentRoute);

	useEffect(() => {
		if (!wallet && isAutoConnecting === false && !isPublicRoute && currentRoute !== '/login') push('/login');
	}, [wallet, isAutoConnecting, push, isPublicRoute, currentRoute]);

	useEffect(() => {
		const token = localStorage.getItem('auth');
		const temp = wallet && token !== null;
		setMoveForward(temp || false);
	}, [moveForward, wallet, loggedToPw]);

	if (isPublicRoute) return <>{children}</>;
	if (!moveForward)
		return (
			<>
				<LoadingSpinner />
			</>
		);

	return <>{children}</>;
};
