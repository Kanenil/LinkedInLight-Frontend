import axios from "./axios";

class RecommendedProfileService {
    #URL = 'api/recommendedProfile'

    getCertifications() {
        return axios.get(`${this.#URL}/userCertifications`)
    }

    getCertification(id) {
        return axios.get(`${this.#URL}/certification/${id}`)
    }

    getCertificationsByProfileUrl(url) {
        return axios.get(`${this.#URL}/${url}/certifications`);
    }

    addCertification(data) {
        return axios.post(`${this.#URL}/newCertification`, data)
    }

    updateCertification(data, id) {
        return axios.put(`${this.#URL}/certification/edit/${id}`, data)
    }

    removeCertification(id) {
        return axios.delete(`${this.#URL}/certification/remove/${id}`)
    }

    getCourses() {
        return axios.get(`${this.#URL}/userCourses`)
    }

    getCoursesByProfileUrl(url) {
        return axios.get(`${this.#URL}/${url}/courses`);
    }

    getCourse(id) {
        return axios.get(`${this.#URL}/course/${id}`)
    }

    addCourse(data) {
        return axios.post(`${this.#URL}/newCourse`, data)
    }

    updateCourse(data, id) {
        return axios.put(`${this.#URL}/course/edit/${id}`, data)
    }

    removeCourse(id) {
        return axios.delete(`${this.#URL}/course/remove/${id}`)
    }

    getProjects() {
        return axios.get(`${this.#URL}/userProjects`)
    }

    getProject(id) {
        return axios.get(`${this.#URL}/project/${id}`)
    }

    getProjectsByProfileUrl(url) {
        return axios.get(`${this.#URL}/${url}/projects`);
    }

    addProject(data) {
        return axios.post(`${this.#URL}/newProject`, data)
    }

    updateProject(data, id) {
        return axios.put(`${this.#URL}/project/edit/${id}`, data)
    }

    removeProject(id) {
        return axios.delete(`${this.#URL}/project/remove/${id}`)
    }
}

export default new RecommendedProfileService();