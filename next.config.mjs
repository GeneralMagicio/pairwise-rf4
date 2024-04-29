/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'content.optimism.io',
				port: '',
				pathname: '/profile/v0/profile-image/10/**',
			},
			{
				protocol: 'https',
				hostname: 'i.imgur.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
