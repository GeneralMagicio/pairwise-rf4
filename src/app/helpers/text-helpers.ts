export const truncate = (input: string, maxLength: number = 90) =>
	input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;

export const formatAddress = (address: string = '') => {
	const firstEight = address.substring(0, 8);
	const lastSix = address.substring(address.length - 6);
	return `${firstEight}...${lastSix}`;
};
