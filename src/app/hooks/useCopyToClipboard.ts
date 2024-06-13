import { useState, useCallback } from 'react';

// Defines the return type of the hook: a tuple containing a string or null, and a function
type UseCopyToClipboard = [
	copiedText: string | null,
	copy: (text: string) => Promise<boolean>,
];

const useCopyToClipboard = (): UseCopyToClipboard => {
	const [copiedText, setCopiedText] = useState<string | null>(null);

	const copy = useCallback(async (text: string): Promise<boolean> => {
		if (navigator.clipboard) {
			// Check if the clipboard API is available
			try {
				await navigator.clipboard.writeText(text);
				setCopiedText(text); // Update the state to the last copied text
				return true;
			} catch (error) {
				console.error('Failed to copy: ', error);
				setCopiedText(null);
				return false;
			}
		} else {
			console.warn('Clipboard not available');
			return false;
		}
	}, []);

	return [copiedText, copy];
};

export default useCopyToClipboard;
