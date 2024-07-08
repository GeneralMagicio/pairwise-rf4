import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			maxWidth: {
				mobile: '500px', // Adding the custom size variable 'mobile'
			},
			colors: {
				primary: '#FF0420',
				ph: '#636779',
				fg_disabled: '#98A2B3',
				bg_disabled: '#F2F4F7',
				success: '#75E0A7',
			},
			screens: {
				xxs: '250px',
				xs: '350px',
			},
		},
	},
	plugins: [],
};
export default config;
