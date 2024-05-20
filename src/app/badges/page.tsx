import TopNavigation from '../components/TopNavigation';
import { Routes } from '../constants/Routes';
import BadgeCard from './components/BadgeCard';
import {badgesMap} from './utility/getBadges';

const BadgesPage = () => {
	let address = "olimpio.eth"; //get this address from the wallet which was paired
	return (
		<div>
			<TopNavigation link={Routes.Categories} text='Badges' />
			<div className='mx-5 my-6'>
				<p className='font-bold'>Your Badges</p>
				<div className='mt-6 grid grid-cols-2 justify-between gap-4'>
				{ badgesMap.get(address).map(badge => <BadgeCard key={ address+badge }/> )  }
				</div>
			</div>
		</div>
	);
};

export default BadgesPage;
