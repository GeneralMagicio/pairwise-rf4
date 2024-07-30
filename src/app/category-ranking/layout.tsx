import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
	return <div className='centered-mobile-max-width'>{children}</div>;
};

export default Layout;
