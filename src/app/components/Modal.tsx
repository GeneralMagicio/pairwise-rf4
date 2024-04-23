'use client';

import { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	const modalNode = document.getElementById('modal-root');

	useEffect(() => {
		// Optional: Handle escape key press to close modal
		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keyup', handleKeyUp);
		return () => window.removeEventListener('keyup', handleKeyUp);
	}, [onClose]);

	if (!isOpen || !modalNode) return null;

	return ReactDOM.createPortal(
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='max-w-sm rounded-lg bg-white shadow-lg'>
				{children}
			</div>
		</div>,
		modalNode,
	);
};

export default Modal;
