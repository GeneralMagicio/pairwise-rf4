'use client';

import { ReactNode } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

posthog.init(process.env.NEXT_PUBLIC_POST_HOG_API!, {
	api_host:
		process.env.NEXT_PUBLIC_POST_HOG_HOST || 'https://us.i.posthog.com',
	autocapture: false,
});

export default function PHProvider({ children }: { children: ReactNode }) {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
