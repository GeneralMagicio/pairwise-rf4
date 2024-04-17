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
		<div className='container mx-auto mt-20 flex w-full max-w-md justify-center rounded-md bg-white p-8 shadow-md'>
			<h2 className='mb-4 text-center text-xl font-bold'>
				Sign in with Email
			</h2>
			<form onSubmit={handleSubmit}>
				<div className='mb-6'>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
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
						className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600'
						required
					/>
				</div>
				<button
					type='submit'
					className='disabled w-full cursor-pointer rounded-md bg-primary px-3 py-2 font-medium text-white disabled:bg-bg_disabled disabled:text-fg_disabled'
					disabled={!isEmailValid(email)}
				>
					Sign in
				</button>
			</form>
		</div>
	);
};
