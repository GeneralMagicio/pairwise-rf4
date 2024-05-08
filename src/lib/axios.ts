import { API_URL } from '@/app/config';
import Axios, { InternalAxiosRequestConfig } from 'axios';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
	config.headers = config.headers || {};
	config.headers.Accept = 'application/json';
	return config;
}

export const axios = Axios.create({
	baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
