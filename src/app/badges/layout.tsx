'use client';

import React, { ReactNode } from 'react';

const BadgesLayout = ({ children }: { children: ReactNode }) => {
	return <div className='centered-mobile-max-width'>{children}</div>;
};

export default BadgesLayout;
