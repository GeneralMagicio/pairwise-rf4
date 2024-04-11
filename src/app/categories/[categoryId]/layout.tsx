import React, { ReactNode } from 'react';

const CategoryLayouy = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<div>Layout</div>
			{children}
		</div>
	);
};

export default CategoryLayouy;
