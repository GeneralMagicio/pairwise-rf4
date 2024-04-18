export const truncate = (input: string, maxLength: number = 90) =>
	input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
