interface IProgressBarProps {
	progress: number; // progress should be a value between 0 to 100
	isMinGreater: boolean;
}

const ProgressBar: React.FC<IProgressBarProps> = ({
	progress,
	isMinGreater,
}) => {
	return (
		<div
			className={`h-3 w-full rounded-full ${isMinGreater ? 'bg-[#FFD1D5]' : 'bg-[#CBD5E0]'}`}
		>
			<div
				className={`h-3 rounded-full ${isMinGreater ? 'bg-red-600' : 'bg-[#636779]'}`}
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
};

export default ProgressBar;
