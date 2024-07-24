import { isMobile } from 'react-device-detect';
import { useEffect, useState } from 'react';

const ConnectSplashMessage = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(isMobile);
	}, []);

	return (
		<div>
			{open && (
				<div className='fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75'>
					<div className='relative rounded-lg bg-white shadow-lg'>
						<div className='px-6 py-4'>
							<p className='mt-2 text-sm text-gray-600'>
								Go to the device with your OP account and
								connect it pseudonymously to this device
							</p>
							<div className='mt-4 flex justify-center'>
								<button
									className='rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500'
									onClick={() => setOpen(false)}
								>
									OK
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ConnectSplashMessage;
