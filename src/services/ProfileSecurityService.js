import axios from './axios';

export const ProfileSecurityService = {
    changePassword: (data) => {
        return axios.put('api/ProfileSecurity/changePassword', data);
    },
};