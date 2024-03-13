import axios from "./axios";

export const profileService = {
    profile: () => {
        return axios.get('api/profile');
    }
};