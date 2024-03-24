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

    getEducations: () => {
        return axios.get('api/profile/userEducations')
    },
    getEducation: (id) => {
        return axios.get(`api/profile/education/${id}`)
    },
    addEducation: (data) => {
        return axios.post('api/profile/newEducation', data)
    },
    updateEducation: (data, id) => {
        return axios.put(`api/profile/education/edit/${id}`, data)
    },
    removeEducation: (id) => {
        return axios.delete(`api/profile/education/remove/${id}`)
    },

    getExperiences: () => {
        return axios.get('api/profile/userExperiences')
    },
    getExperience: (id) => {
        return axios.get(`api/profile/experience/${id}`)
    },
    addExperience: (data) => {
        return axios.post('api/profile/newExperience', data)
    },
    updateExperience: (data, id) => {
        return axios.put(`api/profile/experience/edit/${id}`, data)
    },
    removeExperience: (id) => {
        return axios.delete(`api/profile/experience/remove/${id}`)
    },

    getCertifications: () => {
        return axios.get('api/profile/userCertifications')
    },
    getCertification: (id) => {
        return axios.get(`api/profile/certification/${id}`)
    },
    addCertification: (data) => {
        return axios.post('api/profile/newCertification', data)
    },
    updateCertification: (data, id) => {
        return axios.put(`api/profile/certification/edit/${id}`, data)
    },
    removeCertification: (id) => {
        return axios.delete(`api/profile/certification/remove/${id}`)
    },
};