'use client';

import { Routes } from '@/app/constants/Routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import IconGithub from 'public/images/icons/IconGithub';
import IconGM from 'public/images/icons/IconGM';
import IconParagraph from 'public/images/icons/IconParagraph';
import IconX from 'public/images/icons/IconX';
import { PwLogo } from 'public/images/icons/PwLogo';
import React from 'react';

const ConnectFooter = () => {
	const router = useRouter();
	return (
		<footer className='border-t border-gray-100 px-4 py-2 lg:px-20'>
			<div className='flex justify-between'>
				<div className='flex items-center gap-2'>
					<span className='text-sm'>Powered by</span>
					<PwLogo />
				</div>
				{/* Add Docs and etc here when they are ready */}
				<div className='flex items-center justify-center gap-4'>
					<Link target='_blank' href={Routes.LinkX}>
						<IconX />
					</Link>
					<Link target='_blank' href={Routes.LinkGithub}>
						<IconGithub />
					</Link>
					<Link target='_blank' href={Routes.LinkParagraph}>
						<IconParagraph />
					</Link>
				</div>
				<div className='flex items-center gap-2'>
					<p>Crafted with</p>
					<div className='color-red'>&#10084;&#65039;</div>
					<p>by</p>
					<IconGM />
				</div>
			</div>
		</footer>
	);
};

export default ConnectFooter;
