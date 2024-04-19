import Image from 'next/image';
import { ErrorBoxX } from 'public/images/icons/ErrorBoxX';
import { FC } from 'react';

interface Props {
	message: string;
}

export const ErrorBox: FC<Props> = ({ message }) => {
	return (
		<div className='py flex w-fit items-center gap-2 rounded-2xl border border-primary bg-[#FFD1D5] pl-2 pr-3 text-xs text-primary'>
			<ErrorBoxX /> {message}
		</div>
	);
};
