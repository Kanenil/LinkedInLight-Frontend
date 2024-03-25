import axios from "./axios";

export const recommendedProfileService = {
    getCertifications: () => {
        return axios.get('api/recommendedProfile/userCertifications')
    },
    getCertification: (id) => {
        return axios.get(`api/recommendedProfile/certification/${id}`)
    },
    addCertification: (data) => {
        return axios.post('api/recommendedProfile/newCertification', data)
    },
    updateCertification: (data, id) => {
        return axios.put(`api/recommendedProfile/certification/edit/${id}`, data)
    },
    removeCertification: (id) => {
        return axios.delete(`api/recommendedProfile/certification/remove/${id}`)
    },
}