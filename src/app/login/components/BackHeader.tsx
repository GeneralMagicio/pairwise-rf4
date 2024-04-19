import IconArrowLeft from 'public/images/icons/IconArrowLeft';
import { FC } from 'react';

interface Props {
	onClick: () => void;
}

export const BackHeader: FC<Props> = ({ onClick }) => {
	return (
		<header className='flex w-full items-center justify-start border-b-2 p-8'>
			<span onClick={onClick}>
				<IconArrowLeft />
			</span>
		</header>
	);
};
