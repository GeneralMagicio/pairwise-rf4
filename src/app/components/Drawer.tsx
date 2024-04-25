import { motion, AnimatePresence } from 'framer-motion';
import React, { ReactNode, useEffect } from 'react';

interface DrawerProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	children: ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, setIsOpen, children }) => {
	// Manage body scroll when drawer is open
	useEffect(() => {
		const body = document.body;
		const scrollY = window.scrollY; // Capture scroll position
		if (isOpen) {
			body.style.position = 'fixed';
			body.style.top = `-${scrollY}px`;
			body.style.width = '100%';
			body.style.overflow = 'hidden';
		} else {
			const scrollY = body.style.top;
			body.style.position = '';
			body.style.top = '';
			body.style.overflow = '';
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		}
	}, [isOpen]);

	// Animation variants for Framer Motion
	const backdropVariants = {
		open: { opacity: 1 },
		closed: { opacity: 0 },
	};

	const drawerVariants = {
		open: { y: 0 },
		closed: { y: '100%' },
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 z-40 bg-slate-700 bg-opacity-50 backdrop-blur-sm backdrop-filter'
					onClick={() => setIsOpen(false)}
					initial='closed'
					animate='open'
					exit='closed'
					variants={backdropVariants}
					transition={{ duration: 0.3 }} // Synchronize backdrop transition
				>
					<motion.div
						className='fixed bottom-0 left-0 right-0 z-50 overflow-auto rounded-t-2xl bg-white p-4 shadow-xl'
						style={{ maxHeight: '80vh' }}
						variants={drawerVariants}
						initial='closed'
						animate='open'
						exit='closed'
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 30,
						}}
						onClick={e => e.stopPropagation()}
					>
						<div className='h-full overflow-hidden'>
							<div className='no-scrollbar h-full overflow-y-scroll'>
								{children}
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Drawer;
