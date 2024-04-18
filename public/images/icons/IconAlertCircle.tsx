const IconAlertCircle = ({ color = '#404454' }: IIconProps) => {
	return (
		<svg
			width='22'
			height='22'
			viewBox='0 0 22 22'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M11 15V11M11 7H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z'
				stroke={color}
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export default IconAlertCircle;
