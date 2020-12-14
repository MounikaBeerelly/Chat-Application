import axios from 'axios';

const SKIP_AUTHORIZATION = [
    '/login',
    '/register'
]
const requestHandler = (request) => {
    if (!SKIP_AUTHORIZATION.includes(request.url) && sessionStorage.getItem('chatapp-userToken')) {
        request.headers['Authorization'] = sessionStorage.getItem('chatapp-userToken');
    }
    return request
}

const errorHandler = (error) => {
    return Promise.reject({ ...error })
}

const successHandler = (response) => {
    return response
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
})

// Init Axios
export default function AxiosInstance() {
    return axiosInstance;
}

// Add interceptors
axiosInstance.interceptors.request.use(
    request => requestHandler(request)
)

axiosInstance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
)
