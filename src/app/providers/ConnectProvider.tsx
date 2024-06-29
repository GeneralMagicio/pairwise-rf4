'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

// Define the shape of the context data
interface ConnectContextType {
	isConnectDrawerOpen: boolean;
	setIsConnectDrawerOpen: (isOpen: boolean) => void;
	isClaimDrawerOpen: boolean;
	setIsClaimDrawerOpen: (isOpen: boolean) => void;
	isLogOutDrawerOpen:boolean,
	setIsLogOutDrawerOpen:(isOpen: boolean) => void;
	handleConnect: () => void;
	handleDisconnect:() => void;
}

// Create the context
const ConnectContext = createContext<ConnectContextType | undefined>(undefined);

// Create a provider component
export const ConnectProvider = ({ children }: { children: ReactNode }) => {
	const [isConnectDrawerOpen, setIsConnectDrawerOpen] = useState(false);
	const [isClaimDrawerOpen, setIsClaimDrawerOpen] = useState(false);
	const [isLogOutDrawerOpen, setIsLogOutDrawerOpen] = useState(false);

	const handleConnect = () => {
		setIsConnectDrawerOpen(false);
		setIsClaimDrawerOpen(true);
		setIsLogOutDrawerOpen(false)
	};

	const handleDisconnect = () => {
		setIsClaimDrawerOpen(false);
		setIsConnectDrawerOpen(true);
		
	};


	return (
		<ConnectContext.Provider
			value={{
				isConnectDrawerOpen,
				setIsConnectDrawerOpen,
				isClaimDrawerOpen,
				setIsClaimDrawerOpen,
				isLogOutDrawerOpen,
				setIsLogOutDrawerOpen,
				handleConnect,
				handleDisconnect,
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
