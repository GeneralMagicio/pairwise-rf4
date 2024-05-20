// Type definitions for badge data
export type BadgeData = {
	holderPoints: number;
	delegatePoints: number;
	recipientsPoints: number;
	badgeholderPoints: number;
};

// Function to process CSV content and return a Map of BadgeData
export const processCSV = (csvContent: string): Map<string, BadgeData> => {
	const rows = csvContent.split(/\r?\n/);
	const headers = rows[0].split(',');
	console.log('csvContent:', csvContent);
	const badgesMap = new Map<string, BadgeData>();
	for (let i = 1; i < rows.length; i++) {
		const cells = rows[i].split(',');
		if (cells.length === headers.length) {
			const userAddress = cells[0].trim();
			const userData = {
				holderPoints: parseInt(cells[1], 10),
				delegatePoints: parseInt(cells[2], 10),
				recipientsPoints: parseInt(cells[3], 10),
				badgeholderPoints: parseInt(cells[4], 10),
			};
			badgesMap.set(userAddress, userData);
		}
	}
	console.log('Badges Map:', badgesMap);
	return badgesMap;
};

// Function to get badge data by user address from the Map
export const getBadges = (
	badgesMap: Map<string, BadgeData>,
	userAddress: string,
): BadgeData | undefined => {
	return badgesMap.get(userAddress);
};
