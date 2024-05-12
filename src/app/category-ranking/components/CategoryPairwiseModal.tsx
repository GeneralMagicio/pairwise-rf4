import Button from '@/app/components/Button';
import Modal from '@/app/components/Modal';
import { Routes } from '@/app/constants/Routes';
import router from 'next/router';
import React from 'react';

interface Props {
	isOpen: boolean;
	close: () => void;
  handleSubmit: () => void;
}

export const CategoryPairwiseModal: React.FC<Props> = ({
	isOpen,
	close,
  handleSubmit
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={close}
		>
			<div className='p-5'>
				<p className='mb-4 text-center font-bold text-large'>Category Voting</p>
				<p className='mb-6 text-center text-ph'>
					Congratulations! You have completed voting for minimum of 2
					category of projects. You can now vote for the category that
					you would like to support the most.
				</p>
				<Button
					onClick={handleSubmit}
					className='mb-3 w-full bg-primary'
				>
					Start Category Voting
				</Button>
			</div>
		</Modal>
	);
};
