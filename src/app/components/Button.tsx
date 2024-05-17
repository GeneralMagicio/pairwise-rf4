import { ComponentProps } from 'react';
import { cn } from '../helpers/cn';
import { ButtonLoadingSpinner } from './LoadingSpinner';

interface ButtonType extends ComponentProps<'button'> {
	isLoading?: boolean;
}

const Button = ({
	children,
	isLoading,
	className = '',
	...props
}: ButtonType) => {
	return (
		<button
			{...props}
			className={cn(
				`rounded-lg py-2 text-white ${className}`,
				isLoading ? 'flex items-center justify-center gap-2' : '',
			)}
		>
			{children}
			{isLoading ? <ButtonLoadingSpinner /> : null}
		</button>
	);
};

export default Button;
