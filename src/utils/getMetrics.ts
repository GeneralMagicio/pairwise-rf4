// Type definitions for project metric data
export type Metric = {
	value: number | boolean;
	description: string;
};

export type CategoryMetricData = {
	NetworkGrowth: {
		dailyActiveAddresses: Metric;
		monthlyActiveAddresses: Metric;
		recurringAddresses: Metric;
	};
	NetworkQuality: {
		gasFees: Metric;
		transactionCount: Metric;
		trustedTransactionCount: Metric;
		trustedTransactionShare: Metric;
	};
	UserGrowth: {
		trustedUsersOnboarded: Metric;
	};
	UserQuality: {
		trustedDailyActiveUsers: Metric;
		trustedMonthlyActiveUsers: Metric;
		trustedRecurringUsers: Metric;
		powerUserAddresses: Metric;
	};
	checkOssRequirements: Metric;
};

// Helper function to parse a string as a float, handling commas and optional quotes
const parseNumber = (value: string): number => {
	// Remove quotes if present and then replace commas
	return parseFloat(value.replace(/"/g, '').replace(/,/g, ''));
};

// Function to process CSV content and return a Map of CategoryMetricData
export const processProjectMetricsCSV = (
	csvContent: string,
): Map<string, CategoryMetricData> => {
	const rows = csvContent.split(/\r?\n/);
	const headers = rows[0].split(',');
	const metricsMap = new Map<string, CategoryMetricData>();

	for (let i = 1; i < rows.length; i++) {
		const cells = rows[i].split(',');
		if (cells.length === headers.length) {
			const projectId = cells[0];
			const metricData = {
				NetworkGrowth: {
					dailyActiveAddresses: {
						value: parseNumber(cells[7]),
						description: 'Daily Active Users (DAU)',
					},
					monthlyActiveAddresses: {
						value: parseNumber(cells[9]),
						description: 'Monthly Active Users',
					},
					recurringAddresses: {
						value: parseNumber(cells[11]),
						description: 'Recurring Addresses',
					},
				},
				NetworkQuality: {
					gasFees: {
						value: parseNumber(cells[2]),
						description: 'Gas Fees',
					},
					transactionCount: {
						value: parseNumber(cells[3]),
						description: 'Transaction Count',
					},
					trustedTransactionCount: {
						value: parseNumber(cells[4]),
						description: 'Trusted Transaction Count',
					},
					trustedTransactionShare: {
						value: parseNumber(cells[5]),
						description: 'Trusted Transaction Share',
					},
				},
				UserGrowth: {
					trustedUsersOnboarded: {
						value: parseNumber(cells[6]),
						description: 'Trusted Users Onboarded',
					},
				},
				UserQuality: {
					trustedDailyActiveUsers: {
						value: parseNumber(cells[8]),
						description: 'Trusted Daily Active Users',
					},
					trustedMonthlyActiveUsers: {
						value: parseNumber(cells[10]),
						description: 'Trusted Monthly Active Users',
					},
					trustedRecurringUsers: {
						value: parseNumber(cells[12]),
						description: 'Trusted Recurring Users',
					},
					powerUserAddresses: {
						value: parseNumber(cells[13]),
						description: 'Power User Addresses',
					},
				},
				checkOssRequirements: {
					value: cells[1].toUpperCase() === 'TRUE',
					description: 'Check OSS Requirements',
				},
			};
			metricsMap.set(projectId, metricData);
		}
	}

	console.log('Metrics Map:', metricsMap);
	return metricsMap;
};

// Function to get project metric data by project ID from the Map
export const getProjectMetrics = (
	metricsMap: Map<string, CategoryMetricData>,
	projectId: string,
): CategoryMetricData | undefined => {
	return metricsMap.get(projectId);
};
