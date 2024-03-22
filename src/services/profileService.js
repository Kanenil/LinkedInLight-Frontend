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
    },
    getAbout: () => {
        return axios.get('api/profile/edit/about')
    },
    editAbout: (newAbout) => {
        return axios.put('api/profile/edit/about', newAbout)
    },
    getSkills: () => {
        return axios.get('api/profile/userSkills')
    },
    addSkill: (skill) => {
        return axios.post('api/profile/newSkill', {
            name: skill,
            applicationUserId: '',
            id: 0
        })
    },
    removeSkill: (skillId) => {
        return axios.delete(`api/profile/skill/remove/${skillId}`)
    },
    getLanguages: () => {
        return axios.get('api/profile/userLanguages')
    },
    addLanguage: (data) => {
        return axios.post('api/profile/newLanguage', {
            id: 0,
            ...data
        })
    },
    removeLanguage: (id) => {
        return axios.delete(`api/profile/language/remove/${id}`)
    },
    updateLanguage: (data, id) => {
        return axios.put(`api/profile/language/edit/${id}`, {
            ...data
        })
    },
};