'use client';

import LoadingSpinner from '@/app/components/LoadingSpinner';
import { useIsAutoConnecting } from '@/lib/third-web/AutoConnect';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useActiveWallet } from 'thirdweb/react';

const PublicRoutes = ['/login', '/connect', '/connect/otp'];

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const wallet = useActiveWallet();
	const currentRoute = usePathname();
	const { loggedToPw } = useIsAutoConnecting();

	const [moveForward, setMoveForward] = useState(false);

	const isPublicRoute = PublicRoutes.includes(currentRoute);

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
