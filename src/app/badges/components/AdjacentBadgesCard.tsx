import Image from 'next/image';
import { BadgeData } from './BadgeCard';

interface Props extends BadgeData {}

export const AdjacentBadgesCard: React.FC<Props> = ({
	badgeholderPoints,
	delegatePoints,
	holderPoints,
	recipientsPoints,
	holderAmount,
	delegateAmount,
	holderType,
	delegateType,
}) => {
	const getBadgeImages = () => {
		const badgesImages = [];
		if (holderPoints && holderPoints > 0)
			badgesImages.push({
				src: '/images/badges/1.png',
				alt: 'holder badge',
				badge: 'Holder',
				type: holderType,
				amount: holderAmount,
				weight: holderPoints,
			});
		if (delegatePoints && delegatePoints > 0)
			badgesImages.push({
				src: '/images/badges/2.png',
				alt: 'delegate badge',
				badge: 'Delegate',
				type: delegateType,
				amount: delegateAmount,
				weight: delegatePoints,
			});
		if (badgeholderPoints === 1)
			badgesImages.push({
				src: '/images/badges/3.png',
				alt: 'badge-holder badge',
				badge: 'BadgeHolder',
			});
		if (recipientsPoints === 1)
			badgesImages.push({
				src: '/images/badges/4.png',
				alt: 'recipient badge',
				badge: 'Recipient',
			});

		return badgesImages;
	};
	const formatAmount = (amount: number | undefined) => {
		if (amount === undefined) return '';
		return amount >= 1000000 ? `${amount / 1000000}M` : amount.toString();
	};
	return (
		<div className='flex w-full overflow-x-scroll'>
			{getBadgeImages().map((image, index) => (
				<div
					key={index}
					className='mr-4 w-[148px] flex-none flex-col rounded-md border bg-[#F2F3F8] px-[12px] py-[10px]'
				>
					<div className='mb-2 flex items-center justify-center'>
						<Image
							width={128}
							height={128}
							src={image.src}
							alt={image.src}
						/>
					</div>

					<div className='mb-2 flex gap-2'>
						<div className='flex flex-col gap-1'>
							<span className='text-[12px] font-bold leading-4 text-[#180207]'>
								BADGE
							</span>
							{image.type ? (
								<span className='text-[12px] font-bold leading-4 text-[#180207]'>
									TYPE
								</span>
							) : (
								<></>
							)}
						</div>
						<div className='flex flex-col gap-1'>
							<span className='text-[12px] leading-4'>
								{image.badge}
							</span>
							<span className='text-[12px] leading-4'>
								{image.type}
							</span>
						</div>
					</div>
					<hr />
					<div className='mt-2 flex flex-col gap-1'>
						<p className='font-sans text-[10px] font-semibold uppercase leading-4 text-black'>
							BADGE INFO
						</p>
						{image.type ? (
							<div>
								<div className='flex items-center gap-2'>
									<Image
										src='/images/tokens/op.png'
										width={16}
										height={16}
										alt='token'
										className='h-4 w-4'
									/>
									<p className='text-xs font-normal leading-4'>
										{formatAmount(image.amount)}
									</p>
								</div>

								<span className='text-xs font-normal leading-4'>
									Weight :{' '}
									<span className='text-primary'>
										{image.weight}
									</span>
								</span>
							</div>
						) : (
							<p className='text-xs font-normal leading-4'>
								1 Address
								<span className='text-primary'> 1 Vote</span>
							</p>
						)}
					</div>
				</div>
			))}
		</div>
	);
};
