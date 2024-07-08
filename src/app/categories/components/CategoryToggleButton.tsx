import CardIcon from 'public/images/icons/CardIcon';
import ListIcon from 'public/images/icons/ListIcon';
import React, { useState } from 'react';
interface CategoryToggleButtonProps {
	toggleView: (isCardView: boolean) => void;
}

const CategoryToggleButton: React.FC<CategoryToggleButtonProps> = ({
	toggleView,
}) => {
	// const [isToggled, setIsToggled] = useState(true);
	const [isToggled, setIsToggled] = useState(() => {
		const savedState = localStorage.getItem('isCardView');
		return savedState !== null ? JSON.parse(savedState) : false;
	});

	const toggleButton = () => {
		setIsToggled(!isToggled);
		toggleView(!isToggled);
	};
	return (
		<div>
			<button
				onClick={toggleButton}
				className={`flex h-[32px] w-[60px] transform cursor-pointer   items-center rounded-full border bg-[#F2F4F7] `}
			>
				<div
					className={`m-1 h-[26px] w-[26px] rounded-full border bg-white p-[4px]  transition duration-300 ${
						!isToggled ? 'translate-x-0' : 'translate-x-6'
					}`}
				>
					{isToggled ? <CardIcon /> : <ListIcon />}
				</div>
			</button>
		</div>
	);
};

export default CategoryToggleButton;
