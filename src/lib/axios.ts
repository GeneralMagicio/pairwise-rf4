import { API_URL } from '@/app/config';
import Axios, { InternalAxiosRequestConfig } from 'axios';

const token = '3xwfmCoUXQmj1DmI3EPQQxCxi94BfC5D';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	config.headers = config.headers || {};
	if (token) {
		config.headers.auth = token;
	}
	config.headers.Accept = 'application/json';
	return config;
}

export const axios = Axios.create({
	baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
