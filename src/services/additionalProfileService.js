import axios from "./axios";

export const additionalProfileService = {
    getAllLanguages: () => {
        return axios.get('api/additionalProfile/allLanguages')
    },
    getLanguages: () => {
        return axios.get('api/additionalProfile/userLanguages')
    },
    addLanguage: (data) => {
        return axios.post('api/additionalProfile/newLanguage', {
            id: 0,
            ...data
        })
    },
    removeLanguage: (id) => {
        return axios.delete(`api/additionalProfile/language/remove/${id}`)
    },
    updateLanguage: (data, id) => {
        return axios.put(`api/additionalProfile/language/edit/${id}`, {
            ...data
        })
    },

    getVolunteerExperiences: () => {
        return axios.get('api/additionalProfile/userVolunteerExperiences')
    },
    getVolunteerExperience: (id) => {
        return axios.get(`api/additionalProfile/volunteerExperience/${id}`)
    },
    addVolunteerExperience: (data) => {
        return axios.post('api/additionalProfile/newVolunteerExperience', data)
    },
    updateVolunteerExperience: (data, id) => {
        return axios.put(`api/additionalProfile/volunteerExperience/edit/${id}`, data)
    },
    removeVolunteerExperience: (id) => {
        return axios.delete(`api/additionalProfile/volunteerExperience/remove/${id}`)
    },
}