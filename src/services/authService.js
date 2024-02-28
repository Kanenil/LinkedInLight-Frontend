import axios from './axios';

export const authService = {
    logIn: (data) => {
        return axios.post('api/auth/login', data);
    },
    signIn: (data) => {
        return axios.post('api/auth/register', data);
    }
};