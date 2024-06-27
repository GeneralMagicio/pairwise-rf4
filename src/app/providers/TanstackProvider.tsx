'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useEffect } from 'react';

const TanstackProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient();

	useEffect(() => {
		const handleFocus = () => {
			queryClient.invalidateQueries({queryKey: ['badges']});
		};

		window.addEventListener('focus', handleFocus);

		return () => {
			window.removeEventListener('focus', handleFocus);
		};
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default TanstackProvider;
