'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

// Define the shape of the context data
interface ConnectContextType {
	isConnectDrawerOpen: boolean;
	setIsConnectDrawerOpen: (isOpen: boolean) => void;
	isClaimDrawerOpen: boolean;
	setIsClaimDrawerOpen: (isOpen: boolean) => void;
	handleConnect: () => void;
}

// Create the context
const ConnectContext = createContext<ConnectContextType | undefined>(undefined);

// Create a provider component
export const ConnectProvider = ({ children }: { children: ReactNode }) => {
	const [isConnectDrawerOpen, setIsConnectDrawerOpen] = useState(false);
	const [isClaimDrawerOpen, setIsClaimDrawerOpen] = useState(false);

	const handleConnect = () => {
		setIsConnectDrawerOpen(false);
		setIsClaimDrawerOpen(true);
	};

	return (
		<ConnectContext.Provider
			value={{
				isConnectDrawerOpen,
				setIsConnectDrawerOpen,
				isClaimDrawerOpen,
				setIsClaimDrawerOpen,
				handleConnect,
			}}
		>
			{children}
		</ConnectContext.Provider>
	);
};

// Hook to use the context
export const useConnect = () => {
	const context = useContext(ConnectContext);
	if (context === undefined) {
		throw new Error('useConnect must be used within a ConnectProvider');
	}
	return context;
};
