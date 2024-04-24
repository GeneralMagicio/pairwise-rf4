'use client';

import React, { ReactNode } from 'react';
import Header from '../components/Header'; // Adjust the path as necessary
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const BadgesLayout = ({ children }: { children: ReactNode }) => {
	return <div className='centered-mobile-max-width'>{children}</div>;
};

export default BadgesLayout;
