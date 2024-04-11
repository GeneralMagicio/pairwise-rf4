import { ComponentProps } from 'react';
import { cn } from '../helpers/cn';

const Button = ({
	children,
	className = '',
	...props
}: ComponentProps<'button'>) => {
	return (
		<button
			{...props}
			className={cn(`rounded-lg py-2 text-white ${className}`)}
		>
			{children}
		</button>
	);
};

export default Button;
