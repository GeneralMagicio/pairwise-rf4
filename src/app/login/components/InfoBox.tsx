import { WarningBoxIcon } from 'public/images/icons/WarningBoxIcon';
import { FC } from 'react';

interface Props {
	message: string;
}

export const InfoBox: FC<Props> = ({ message }) => {
	return (
		<div className='py flex w-fit items-center gap-2 rounded-2xl border border-[#FEC84B] bg-[#FFFAEB] pl-2 pr-3 text-xs text-[#B54708]'>
			<WarningBoxIcon /> {message}
		</div>
	);
};
