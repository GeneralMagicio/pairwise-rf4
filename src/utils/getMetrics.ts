// Type definitions for project metric data
export type Metric = {
	value: number | 'NA';
	description: string;
};

export interface ComparisonResult {
	[key: string]: {
		[key: string]: {
			description: string;
			value1: number | 'NA';
			value2: number | 'NA';
		};
	};
}

export type CategoryMetricData = {
	NetworkGrowth: {
		dailyActiveAddresses: Metric;
		monthlyActiveAddresses: Metric;
		recurringAddresses: Metric;
		openrankTrustedUsersCount: Metric;
	};
	NetworkQuality: {
		gasFees: Metric;
		transactionCount: Metric;
		trustedTransactionCount: Metric;
		trustedTransactionShare: Metric;
		logGasFees: Metric;
		logTransactionCount: Metric;
		logTrustedTransactionCount: Metric;
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
};

// Initial default values
const defaultMetricData: CategoryMetricData = {
	NetworkGrowth: {
		dailyActiveAddresses: {
			value: 'NA',
			description: 'Daily Active Users (DAU)',
		},
		monthlyActiveAddresses: {
			value: 'NA',
			description: 'Monthly Active Users',
		},
		recurringAddresses: {
			value: 'NA',
			description: 'Recurring Addresses',
		},
		openrankTrustedUsersCount: {
			value: 'NA',
			description: 'OpenRank Trusted Users',
		},
	},
	NetworkQuality: {
		gasFees: { value: 'NA', description: 'Gas Fees' },
		transactionCount: { value: 'NA', description: 'Transactions' },
		trustedTransactionCount: {
			value: 'NA',
			description: 'Trusted Transactions',
		},
		trustedTransactionShare: {
			value: 'NA',
			description: 'Trusted Transaction Share',
		},
		logGasFees: { value: 'NA', description: 'Gas Fees (Log scale)' },
		logTransactionCount: {
			value: 'NA',
			description: 'Transaction (Log scale)',
		},
		logTrustedTransactionCount: {
			value: 'NA',
			description: 'Trusted transactions (Log scale)',
		},
	},
	UserGrowth: {
		trustedUsersOnboarded: {
			value: 'NA',
			description: 'Trusted Users Onboarded',
		},
	},
	UserQuality: {
		trustedDailyActiveUsers: {
			value: 'NA',
			description: 'Trusted Daily Active Users',
		},
		trustedMonthlyActiveUsers: {
			value: 'NA',
			description: 'Trusted Monthly Active Users',
		},
		trustedRecurringUsers: {
			value: 'NA',
			description: 'Trusted Recurring Users',
		},
		powerUserAddresses: {
			value: 'NA',
			description: 'Power User Addresses',
		},
	},
};

// Helper function to parse a string as a float, handling commas and optional quotes
const parseNumber = (value: string): number | 'NA' => {
	const cleanedValue = value.replace(/"/g, '').replace(/,/g, '');
	return cleanedValue ? parseFloat(cleanedValue) || 'NA' : 'NA';
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
					openrankTrustedUsersCount: {
						value: parseNumber(cells[14]),
						description: 'OpenRank Trusted Users',
					},
				},
				NetworkQuality: {
					gasFees: {
						value: parseNumber(cells[2]),
						description: 'Gas Fees',
					},
					transactionCount: {
						value: parseNumber(cells[3]),
						description: 'Transactions',
					},
					trustedTransactionCount: {
						value: parseNumber(cells[4]),
						description: 'Trusted Transactions',
					},
					trustedTransactionShare: {
						value: parseNumber(cells[5]),
						description: 'Trusted Transaction Share',
					},
					logGasFees: {
						value: parseNumber(cells[16]),
						description: 'Gas Fees (Log scale)',
					},
					logTransactionCount: {
						value: parseNumber(cells[17]),
						description: 'Transaction (Log scale)',
					},
					logTrustedTransactionCount: {
						value: parseNumber(cells[18]),
						description: 'Trusted transactions (Log scale)',
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
): CategoryMetricData => {
	return metricsMap.get(projectId) || defaultMetricData;
};

export const compareProjects = (
	metricsMap: Map<string, CategoryMetricData>,
	projectId1: string,
	projectId2: string,
): ComparisonResult => {
	const project1Metrics = getProjectMetrics(metricsMap, projectId1);
	const project2Metrics = getProjectMetrics(metricsMap, projectId2);
	console.log('Project 1 Metrics:', project1Metrics);
	console.log('Project 2 Metrics:', project2Metrics);
	if (!project1Metrics || !project2Metrics) {
		return {};
	}

	const result: ComparisonResult = {};

	for (const category in project1Metrics) {
		if (project1Metrics.hasOwnProperty(category)) {
			result[category] = {};
			const categoryMetrics1 =
				project1Metrics[category as keyof CategoryMetricData];
			const categoryMetrics2 =
				project2Metrics[category as keyof CategoryMetricData];

			for (const metric in categoryMetrics1) {
				if (categoryMetrics1.hasOwnProperty(metric)) {
					const metricData1 = categoryMetrics1[
						metric as keyof typeof categoryMetrics1
					] as Metric;
					const metricData2 = categoryMetrics2[
						metric as keyof typeof categoryMetrics2
					] as Metric;

					result[category][metric] = {
						description: metricData1.description,
						value1: metricData1.value as number,
						value2: (metricData2?.value as number) || 0,
					};
				}
			}
		}
	}

	return result;
};
