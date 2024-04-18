// signin.tsx
import { FC, useState } from 'react';
import { ErrorBox } from './ErrorBox';

interface SignInForm {
	email: string;
	onSubmit: () => void;
	setEmail: (email: string) => void;
	emailError: boolean;
}

export const isEmailValid = (email: string) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};


export const SignInEmail2: FC<SignInForm> = ({onSubmit, email, setEmail, emailError}) => {

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	return (
		<div className='flex w-full flex-col justify-center gap-6 rounded-md p-8'>
			<h2 className='mb-2 text-center text-3xl font-bold'>
				Sign in with Email
			</h2>
			<form>
				<label
					htmlFor='email'
					className='mb-2 block text-sm font-medium text-gray-700'
				>
					Email
				</label>
				<input
					type='email'
					id='email'
					name='email'
					placeholder='Enter your email'
					autoComplete='email'
					value={email}
					onChange={handleChange}
					className='w-full rounded-md border border-gray-300 px-3 py-2'
					required
				/>
			</form>
			{emailError && <div className='mx-auto my-[-5px]'> <ErrorBox message='Please enter a valid email'/> </div>}
			<button
				onClick={onSubmit}
				type='submit'
				className='disabled disabled:bg-bg_disabled disabled:text-fg_disabled mt-2 w-full cursor-pointer rounded-md bg-primary px-3 py-2 font-medium text-white'
				disabled={!isEmailValid(email)}
			>
				Sign in
			</button>
		</div>
	);
};
