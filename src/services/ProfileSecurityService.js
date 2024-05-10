import axios from './axios';

export const ProfileSecurityService = {
    changePassword: (data) => {
        return axios.put('api/ProfileSecurity/changePassword', data);
    },
    setTwoStepVerification: (data) => {
        return axios.put('api/ProfileSecurity/TwoStepVerification', data);
    },
    TwoStepVerification: () => {
        return axios.get('api/ProfileSecurity/TwoStepVerification');
    },
};