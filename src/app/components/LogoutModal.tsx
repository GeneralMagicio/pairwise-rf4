import React from 'react';
import { useDisconnect } from 'wagmi';
interface LogoutModal {

}

const LogoutModal: React.FC<LogoutModal> = () => {
	const { disconnectAsync } = useDisconnect();

	const handleLogOut = async () => {
		await disconnectAsync();
		localStorage.clear();
		window.location.reload();
	};

	return (
		<div className='flex w-full  justify-center bg-[#FBFCFE] sticky bottom-0'>
			<div className='flex w-[393px] flex-col items-center gap-6 rounded-t-[20px] p-4 pb-10 '>
				<div className='flex w-full items-center justify-end gap-6 self-stretch'>
				</div>
				<button
					onClick={() => handleLogOut()}
					className='flex h-[44px] w-[345px] items-center justify-center gap-1.5 rounded-md border border-[#FF99A1] bg-[#FFF] p-[10px] px-4'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 20 20'
						fill='none'
					>
						<path
							d='M13.3333 14.1668L17.5 10.0001M17.5 10.0001L13.3333 5.83343M17.5 10.0001H7.5M10 14.1668C10 14.4131 10 14.5362 9.99085 14.6429C9.89569 15.7517 9.07905 16.6641 7.98753 16.8812C7.88252 16.902 7.76001 16.9156 7.51529 16.9428L6.66412 17.0374C5.3854 17.1795 4.74601 17.2505 4.23805 17.088C3.56078 16.8713 3.00785 16.3764 2.71765 15.7272C2.5 15.2403 2.5 14.597 2.5 13.3103V6.68984C2.5 5.40323 2.5 4.75992 2.71765 4.27303C3.00785 3.62383 3.56078 3.12893 4.23805 2.9122C4.74601 2.74965 5.38538 2.82069 6.66412 2.96277L7.51529 3.05735C7.7601 3.08455 7.8825 3.09815 7.98753 3.11903C9.07905 3.33606 9.89569 4.24846 9.99085 5.35727C10 5.46395 10 5.58711 10 5.83343'
							stroke='#FF0420'
							stroke-width='1.66667'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
					<div className='font-inter text-[16px] font-semibold leading-[21px] tracking-[-0.05px] text-[#FF0420]'>
						Log out
					</div>
				</button>
			</div>
		</div>
	);
};

export default LogoutModal;
