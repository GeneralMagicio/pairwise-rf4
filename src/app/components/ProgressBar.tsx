interface IProgressBarProps {
	progress: number; // progress should be a value between 0 to 100
}

const ProgressBar: React.FC<IProgressBarProps> = ({ progress }) => {
	return (
		<div className='h-3 w-full rounded-full  bg-red-100'>
			<div
				className='h-3 rounded-full bg-red-600'
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
};

export default ProgressBar;
