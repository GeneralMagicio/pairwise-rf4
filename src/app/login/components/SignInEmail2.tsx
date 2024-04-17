// signin.tsx
import { useState } from 'react';

interface SignInForm {
	email: string;
}

export const SignInEmail2 = () => {
	// const [formData, setFormData] = useState<SignInForm>({
	// 	email: '',
	// });
	const [email, setEmail] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const isEmailValid = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!isEmailValid(email)) {
			alert('Please enter a valid email address');
			return;
		}

		// Handle form submission logic here (e.g., send login request to backend)
		console.log('Sign in successful!', email);
	};

	return (
		<div className='flex w-full flex-col justify-center gap-6 rounded-md p-8'>
			<h2 className='mb-2 text-center text-3xl font-bold'>
				Sign in with Email
			</h2>
			<form onSubmit={handleSubmit}>
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
			<button
				type='submit'
				className='disabled disabled:bg-bg_disabled disabled:text-fg_disabled mt-2 w-full cursor-pointer rounded-md bg-primary px-3 py-2 font-medium text-white'
				disabled={!isEmailValid(email)}
			>
				Sign in
			</button>
		</div>
	);
};
