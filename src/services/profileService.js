import axios from "./axios";

export const profileService = {
    profile: () => {
        return axios.get('api/profile');
    },
    changeImage: (data, isBackground = false) => {
        return axios.putForm('api/profile/editImage', {newImage: data}, {
            params: {
                background: isBackground
            }
        })
    }
};