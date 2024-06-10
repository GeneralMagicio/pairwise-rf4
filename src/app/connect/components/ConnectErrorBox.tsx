import Image from 'next/image';
import { ErrorBoxX } from 'public/images/icons/ErrorBoxX';
import IconAlertCircle from 'public/images/icons/IconAlertCircle';
import IconWarning from 'public/images/icons/IconWarning';
import { FC } from 'react';

interface Props {
	message: string;
}

export const ConnectErrorBox: FC<Props> = ({ message }) => {
	return (
		<div className='py flex w-fit items-center gap-2 rounded-2xl border border-yellow-400 bg-yellow-50 pl-2 pr-3 text-xs text-yellow-600'>
			<IconWarning /> {message}
		</div>
	);
};