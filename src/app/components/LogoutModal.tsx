import React from 'react';
import { useDisconnect } from 'wagmi';
import IconBug from 'public/images/icons/IconBug';
import IconLogout from 'public/images/icons/IconLogout';
interface LogoutModal {}
// Logut Modal
const LogoutModal: React.FC<LogoutModal> = () => {
	const { disconnectAsync } = useDisconnect();

	const handleLogOut = async () => {
		await disconnectAsync();
		localStorage.clear();
		window.location.reload();
	};

	return (
		<div className='sticky bottom-0 flex items-center justify-around gap-6 bg-white px-4 py-4'>
			<a
				href='https://github.com/GeneralMagicio/pairwise-RPGF4/issues/new?assignees=MoeNick&labels=bug&projects=&template=bug_report.md&title=%5BBUG%5D+'
				target='_blank'
				className='flex h-11 flex-[1_0_0] items-center justify-center gap-1.5 rounded-lg border border-[var(--Border-Border-Tertiary,#E0E2EB)] bg-[var(--Background-Neutral-2,#FBFCFE)] px-4 py-2.5 shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]'
			>
				<span className='xxs:hidden xs:block'>
					<IconBug />
				</span>
				<span className='font-inter text-xs font-medium leading-[21px] tracking-[-0.05px] text-[#404454] xxs:text-[15px] xs:text-[14px]'>
					Report a Bug
				</span>
			</a>

			<button
				onClick={() => handleLogOut()}
				className='flex h-11 flex-[1_0_0] items-center justify-center gap-[var(--spacing-sm,6px)] rounded-lg border border-[var(--Border-Border-Secondary,#FF99A1)] bg-[var(--Component-colors-Components-Buttons-Secondary-button-secondary-bg,#FFF)] px-[var(--spacing-xl,16px)] py-2.5 shadow-[0px_1px_3px_0px_rgba(16,24,40,0.10),0px_1px_2px_0px_rgba(16,24,40,0.06)]'
			>
				<IconLogout />
				<span className='font-inter text-base font-semibold leading-[21px] tracking-[-0.05px] text-[#FF0420]'>
					{' '}
					Logout
				</span>
			</button>
		</div>
	);
};

export default LogoutModal;
