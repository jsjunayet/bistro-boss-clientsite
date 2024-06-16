import axios from "axios";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})
const UseAxois = () => {
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
    return axiosSecure
};

export default UseAxois;