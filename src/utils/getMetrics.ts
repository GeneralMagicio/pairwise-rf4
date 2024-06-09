// Type definitions for project metric data
export type ProjectMetricData = {
	checkOssRequirements: boolean;
	gasFees: number;
	transactionCount: number;
	trustedTransactionCount: number;
	trustedTransactionShare: number;
	trustedUsersOnboarded: number;
	dailyActiveAddresses: number;
	trustedDailyActiveUsers: number;
	monthlyActiveAddresses: number;
	trustedMonthlyActiveUsers: number;
	recurringAddresses: number;
	trustedRecurringUsers: number;
	powerUserAddresses: number;
};
// Helper function to parse a string as a float, handling commas and optional quotes
const parseNumber = (value: string): number => {
	// Remove quotes if present and then replace commas
	return parseFloat(value.replace(/"/g, '').replace(/,/g, ''));
};

// Function to process CSV content and return a Map of ProjectMetricData
export const processProjectMetricsCSV = (
	csvContent: string,
): Map<string, ProjectMetricData> => {
	const rows = csvContent.split(/\r?\n/);
	const headers = rows[0].split(',');
	const metricsMap = new Map<string, ProjectMetricData>();

	for (let i = 1; i < rows.length; i++) {
		const cells = rows[i].split(',');
		if (cells.length === headers.length) {
			const projectId = cells[0];
			const metricData = {
				checkOssRequirements: cells[1].toUpperCase() === 'TRUE',
				gasFees: parseNumber(cells[2]),
				transactionCount: parseNumber(cells[3]),
				trustedTransactionCount: parseNumber(cells[4]),
				trustedTransactionShare: parseNumber(cells[5]),
				trustedUsersOnboarded: parseNumber(cells[6]),
				dailyActiveAddresses: parseNumber(cells[7]),
				trustedDailyActiveUsers: parseNumber(cells[8]),
				monthlyActiveAddresses: parseNumber(cells[9]),
				trustedMonthlyActiveUsers: parseNumber(cells[10]),
				recurringAddresses: parseNumber(cells[11]),
				trustedRecurringUsers: parseNumber(cells[12]),
				powerUserAddresses: parseNumber(cells[13]),
			};
			metricsMap.set(projectId, metricData);
		}
	}

	console.log('Metrics Map:', metricsMap);
	return metricsMap;
};

// Function to get project metric data by project ID from the Map
export const getProjectMetrics = (
	metricsMap: Map<string, ProjectMetricData>,
	projectId: string,
): ProjectMetricData | undefined => {
	return metricsMap.get(projectId);
};
