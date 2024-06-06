import Image from 'next/image';
import { BadgeData } from './BadgeCard';

interface Props extends BadgeData {
	size: number;
}

export const AdjacentBadges: React.FC<Props> = ({
	badgeholderPoints,
	delegatePoints,
	holderPoints,
	recipientsPoints,
	size,
}) => {
	const getBadgeImages = () => {
		const badgesImages = [];
		if (holderPoints && holderPoints > 0)
			badgesImages.push({
				src: '/images/badges/1.png',
				alt: 'holder badge',
			});
		if (delegatePoints && delegatePoints > 0)
			badgesImages.push({
				src: '/images/badges/2.png',
				alt: 'delegate badge',
			});
		if (badgeholderPoints === 1)
			badgesImages.push({
				src: '/images/badges/3.png',
				alt: 'badge-holder badge',
			});
		if (recipientsPoints === 1)
			badgesImages.push({
				src: '/images/badges/4.png',
				alt: 'recipient badge',
			});

		return badgesImages;
	};
	return (
		<div
			className='relative flex cursor-pointer justify-center'
		>
			{getBadgeImages().map((image, index) => (
				<div
					key={index}
					className={`flex-shrink-0 ${index > 0 ? (size > 25 ? '-ml-10' : '-ml-7') : 'ml-0'} rounded-full p-2`}
				>
					<div className='rounded-full'>
						<Image
							width={size}
							height={size}
							src={image.src}
							alt={image.alt}
						/>
					</div>
				</div>
			))}
		</div>
	);
};
