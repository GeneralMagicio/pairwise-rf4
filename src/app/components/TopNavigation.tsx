import Link from 'next/link';
import IconArrowLeft from 'public/images/icons/IconArrowLeft';

interface ITopNavigationProps {
	link?: string;
	text?: string;
}

const TopNavigation = ({ link = '/', text }: ITopNavigationProps) => {
	return (
		<div className='border-b border-b-gray-300 pb-7 pt-9'>
			<div className='mx-4 flex items-center gap-6'>
				<Link href={link}>
					<IconArrowLeft />
				</Link>
				<p className='font-bold'>{text}</p>
			</div>
		</div>
	);
};

export default TopNavigation;
