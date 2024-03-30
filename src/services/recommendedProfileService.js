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

    getCourses: () => {
        return axios.get('api/recommendedProfile/userCourses')
    },
    getCourse: (id) => {
        return axios.get(`api/recommendedProfile/course/${id}`)
    },
    addCourse: (data) => {
        return axios.post('api/recommendedProfile/newCourse', data)
    },
    updateCourse: (data, id) => {
        return axios.put(`api/recommendedProfile/course/edit/${id}`, data)
    },
    removeCourse: (id) => {
        return axios.delete(`api/recommendedProfile/course/remove/${id}`)
    },
}