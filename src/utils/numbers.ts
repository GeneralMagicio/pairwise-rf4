export function formatMetricsNumber(num: number | 'NA') {
	if (num === undefined || num === null) {
		return undefined;
	}
	if (num === 'NA') {
		return 'NA';
	}

	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K';
	} else {
		const decimalPlaces = (num.toString().split('.')[1] || []).length;
		if (decimalPlaces > 3) {
			return num.toFixed(3);
		} else {
			return num.toString();
		}
	}
}
