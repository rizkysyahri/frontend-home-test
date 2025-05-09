import axios from 'axios';

const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_API || '';
  } else {
    return process.env.NEXT_PUBLIC_API || 'https://test-fe.mysellerpintar.com/api';
  }
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

export default axiosInstance;