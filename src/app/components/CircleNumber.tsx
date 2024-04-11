interface CircleNumberProps {
	number: number;
}

const CircleNumber: React.FC<CircleNumberProps> = ({ number }) => {
	return (
		<div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-orange-500 font-bold text-orange-500'>
			{number}
		</div>
	);
};

export default CircleNumber;
