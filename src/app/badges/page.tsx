import TopNavigation from '../components/TopNavigation';
import { Routes } from '../constants/Routes';
import BadgeCard from './components/BadgeCard';

const BadgesPage = () => {
	return (
		<div>
			<TopNavigation link={Routes.Categories} text='Badges' />
			<div className='mx-5 my-6'>
				<p className='font-bold'>Your Badges</p>
				<div className='mt-6 grid grid-cols-2 justify-between gap-4'>
					<BadgeCard />
					<BadgeCard />
					<BadgeCard />
					<BadgeCard />
				</div>
			</div>
		</div>
	);
};

export default BadgesPage;
