import Image from 'next/image';

export type MedalTypes =
	| 'Bronze'
	| 'Diamond'
	| 'Platnium'
	| 'Gold'
	| 'Silver'
	| 'WHALE';

export type BadgeData = {
	holderPoints?: number;
	delegatePoints?: number;
	recipientsPoints?: 1;
	badgeholderPoints?: 1;
	holderAmount?: number;
	delegateAmount?: number;
	holderType?: MedalTypes;
	delegateType?: MedalTypes;
};

interface BadgeCardProps {
	type: BadgeType;
	points: number;
	medal?: BadgeData['holderType'];
	amount?: number;
}

export const badgeTypeMapping = {
	holderPoints: 'Holder',
	delegatePoints: 'Delegate',
	recipientsPoints: 'Recipient',
	badgeholderPoints: 'Badgeholder',
};

type BadgeType = keyof typeof badgeTypeMapping;

const BadgeCard: React.FC<BadgeCardProps> = ({
	type,
	points,
	medal,
	amount,
}) => {
	const formatAmount = (amount: number | undefined) => {
		if (amount === undefined) return '';
		return amount >= 1000000
			? `${(amount / 1000000).toFixed(2)}M`
			: amount.toString();
	};
	const handleBadgesImage = () => {
		switch (type) {
			case 'holderPoints':
				return '/images/badges/1.png';
			case 'delegatePoints':
				return '/images/badges/2.png';
			case 'recipientsPoints':
				return '/images/badges/4.png';
			case 'badgeholderPoints':
				return '/images/badges/3.png';
			default:
				return '/images/badges/1.png';
		}
	};

	const handleBadgeInfo = (amount?: number, points?: number) => {
		switch (type) {
			case 'holderPoints':
			case 'delegatePoints':
				return (
					<div>
						<div className='mb-2 flex items-center gap-2 text-sm'>
							<Image
								src='/images/tokens/op.png'
								width={16}
								height={16}
								alt='token'
								className='h-4 w-4'
							/>
							<p className='text-xs font-normal leading-4'>
								{formatAmount(amount)}
							</p>
						</div>
						<div className='flex items-center gap-1 text-xs  font-normal leading-4'>
							<p>Weight</p>
							<p className='text-primary'>{points}</p>
						</div>
					</div>
				);
			case 'recipientsPoints':
			case 'badgeholderPoints':
				return (
					<div>
						<div className='flex items-center gap-2 text-xs font-normal leading-4'>
							<p>1 Address</p>
							<p className='text-primary'>1 Vote</p>
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className=''>
			<div className='mr-4 min-h-full w-[148px] flex-none  flex-col rounded-lg border bg-[#F2F3F8] p-4'>
				<Image
					className='mx-auto'
					src={handleBadgesImage()}
					width={128}
					height={128}
					alt='badge'
				/>
				<div className='border-b border-b-gray-300  py-2'>
					<div className='flex justify-between gap-1'>
						<p className='text-[12px] font-bold leading-4 text-[#180207]'>
							BADGE
						</p>
						<p className='text-[12px] leading-4'>
							{badgeTypeMapping[type]}
						</p>
					</div>
					{(type === 'holderPoints' || type === 'delegatePoints') && (
						<div className='flex justify-between'>
							<p className='text-[12px] font-bold leading-4 text-[#180207]'>
								TYPE
							</p>
							<p className='text-[12px] leading-4'>{medal}</p>
						</div>
					)}
				</div>
				<div className='flex flex-col gap-2'>
					<p className='mt-2 text-xs font-semibold'>BADGE INFO</p>
					{handleBadgeInfo(amount, points)}
				</div>
			</div>
		</div>
	);
};

export default BadgeCard;
