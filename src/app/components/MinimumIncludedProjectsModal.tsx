import Button from '@/app/components/Button';
import Modal from '@/app/components/Modal';
import React from 'react';

interface Props {
	isOpen: boolean;
	close: () => void;
	minimum: number;
}

export const MinimumIncludedProjectsModal: React.FC<Props> = ({
	isOpen,
	close,
	minimum,
}) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={close}
		>
			<div className='p-5'>
				<p className='mb-4 text-center font-bold text-large'>{`You must keep at least ${minimum} projects to proceed.`}</p>
				<Button
					onClick={close}
					className='mb-3 w-full bg-primary'
				>
					Go back
				</Button>
			</div>
		</Modal>
	);
};
