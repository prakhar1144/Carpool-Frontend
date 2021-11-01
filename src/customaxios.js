import axios from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axiosInstance.post('http://127.0.0.1:8000/api/token/refresh/',
	{'refresh': localStorage.getItem("refresh_token")}
).then(tokenRefreshResponse => {
    localStorage.setItem('access_token', tokenRefreshResponse.data.access);
	localStorage.setItem('refresh_token', tokenRefreshResponse.data.refresh);
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.access;
    return Promise.resolve();
});

// Instantiate the interceptor
createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic);

// Obtain the fresh token each time the function is called
function getAccessToken(){
    return localStorage.getItem('access_token');
}

// Use interceptor to inject the token to requests
axiosInstance.interceptors.request.use(request => {
    request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    return request;
});

export default axiosInstance;