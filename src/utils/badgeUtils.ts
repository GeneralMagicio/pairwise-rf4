import { BadgeData } from '@/app/badges/components/BadgeCard';
import { BadgeCardEntryType } from '@/app/badges/page';

export const getBadgeAmount = (
	key: BadgeCardEntryType['0'],
	badges: BadgeData,
) => {
	return key === 'holderPoints'
		? badges.holderAmount
		: key === 'delegatePoints'
			? badges.delegateAmount
			: undefined;
};

export const getBadgeMedal = (
	key: BadgeCardEntryType['0'],
	badges: BadgeData,
) => {
	return key === 'holderPoints'
		? badges.holderType
		: key === 'delegatePoints'
			? badges.delegateType
			: undefined;
};
