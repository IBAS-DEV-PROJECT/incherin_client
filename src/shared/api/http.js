import axios from 'axios';
import { normalizeHttpError } from '@shared/lib/httpError';

// CRA면 REACT_APP_API_URL, Vite면 VITE_API_URL 사용
const baseURL =
  import.meta?.env?.VITE_API_URL || process.env.REACT_APP_API_URL || '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => Promise.reject(normalizeHttpError(err))
);
