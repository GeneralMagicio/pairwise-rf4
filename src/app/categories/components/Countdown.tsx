import { useEffect, useState } from 'react';

function getTimeDifference(): {
	days: number;
	hours: number;
	mins: number;
	secs: number;
} {
	const now = new Date();

	// Target date and time (July 16th at 20:00 CET)
	const targetDate = new Date(
		Date.UTC(
			now.getFullYear(),
			6,
			17,
			10 /* 12:00 CET adjusted to UTC */,
			0,
			0,
		),
	);

	const diffMs = targetDate.getTime() - now.getTime();

	const dayMs = 1000 * 60 * 60 * 24;
	const hourMs = dayMs / 24;
	const minMs = hourMs / 60;

	const days = Math.floor(diffMs / dayMs);
	const hours = Math.floor((diffMs % dayMs) / hourMs);
	const mins = Math.floor((diffMs % hourMs) / minMs);
	const secs = Math.floor((diffMs % minMs) / 1000);

	return {
		days: Math.max(days, 0),
		hours: Math.max(hours, 0),
		mins: Math.max(mins, 0),
		secs: Math.max(secs, 0),
	};
}

interface Time {
	days: number;
	hours: number;
	mins: number;
	secs: number;
}

export const Countdown: React.FC = () => {
	const [time, setTime] = useState<Time>(getTimeDifference());

	useEffect(() => {
		const interval = setInterval(
			() => setTime(getTimeDifference()),
			10 * 1000,
		);

		return () => clearInterval(interval);
	}, []);

	const { days, hours, mins } = time;

	return (
		<div className='mt-4 flex h-16 w-full items-center justify-between bg-primary p-4 text-white'>
			<p> Time left for voting </p>
			<p className='text-xl font-bold'>
				{`${days}d: ${hours}h: ${mins}min`}
			</p>
		</div>
	);
};
