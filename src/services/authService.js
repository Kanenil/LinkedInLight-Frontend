import axios from './axios';

export const authService = {
    forgotPassword: (data) => {
        return axios.post('api/auth/forgotPassword', data);
    },
    countries: () => {
        return axios.get('api/auth/countries');
    },
    cities: (country) => {
        return axios.get(`api/auth/cities/${country}`);
    }
};