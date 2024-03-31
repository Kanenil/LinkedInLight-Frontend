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

    getIndustries: () => {
        return axios.get('api/profile/allIndustries')
    },
    getAllSkills: () => {
        return axios.get('api/profile/allSkills')
    },

    getSkills: () => {
        return axios.get('api/profile/userSkills')
    },
    getMainSkills: () => {
        return axios.get('api/profile/mainSkills')
    },
    addSkill: (skill, isMainSkill = true) => {
        return axios.post('api/profile/newSkill', {
            skill,
            skillId: skill.value,
            applicationUserId: '',
            isMainSkill: isMainSkill,
            id: 0
        })
    },
    updateSkill: (data, id) => {
        return axios.put(`api/profile/skill/edit/${id}`, data)
    },
    removeSkill: (skillId) => {
        return axios.delete(`api/profile/skill/remove/${skillId}`)
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
};