import axios from './axios';

export const authService = {
    forgotPassword: (data) => {
        return axios.post('api/auth/forgotPassword', data);
    }
};