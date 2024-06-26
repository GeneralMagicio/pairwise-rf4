import { SuccessBoxIcon } from 'public/images/icons/SuccessBoxIcon';
import { FC } from 'react';

interface Props {
	message: string;
}

export const SuccessBox: FC<Props> = ({ message }) => {
	return (
		<div
			className='py flex w-fit items-center gap-2 rounded-2xl border border-[#43f53a] bg-[#ebffeb] 
		pl-2 pr-3 text-xs text-[#268821]'
		>
			<SuccessBoxIcon /> {message}
		</div>
	);
};
