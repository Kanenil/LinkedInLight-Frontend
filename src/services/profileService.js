import axios from "./axios";

class ProfileService {
    #URL = 'api/profile';

    getProfile() {
        return axios.get(this.#URL);
    }

    changeImage(data, isBackground = false) {
        return axios.putForm(`${this.#URL}/editImage`, {newImage: data}, {
            params: {
                background: isBackground
            }
        })
    }

    getAbout() {
        return axios.get(`${this.#URL}/edit/about`)
    }

    editAbout(newAbout) {
        return axios.put(`${this.#URL}/edit/about`, newAbout)
    }

    getIndustries() {
        return axios.get(`${this.#URL}/allIndustries`)
    }

    getAllSkills() {
        return axios.get(`${this.#URL}/allSkills`)
    }

    getSkills() {
        return axios.get(`${this.#URL}/userSkills`)
    }

    getMainSkills() {
        return axios.get(`${this.#URL}/mainSkills`)
    }

    addSkill(skill, isMainSkill = true) {
        return axios.post(`${this.#URL}/newSkill`, {
            skill,
            skillId: skill.value,
            applicationUserId: ``,
            isMainSkill: isMainSkill,
            id: 0
        })
    }

    updateSkill(data, id) {
        return axios.put(`${this.#URL}/skill/edit/${id}`, data)
    }

    removeSkill(skillId) {
        return axios.delete(`${this.#URL}/skill/remove/${skillId}`)
    }

    getEducations() {
        return axios.get(`${this.#URL}/userEducations`)
    }

    getEducation(id) {
        return axios.get(`${this.#URL}/education/${id}`)
    }

    addEducation(data) {
        return axios.post(`${this.#URL}/newEducation`, data)
    }

    updateEducation(data, id) {
        return axios.put(`${this.#URL}/education/edit/${id}`, data)
    }

    removeEducation(id) {
        return axios.delete(`${this.#URL}/education/remove/${id}`)
    }

    getExperiences() {
        return axios.get(`${this.#URL}/userExperiences`)
    }

    getExperience(id) {
        return axios.get(`${this.#URL}/experience/${id}`)
    }

    addExperience(data) {
        return axios.post(`${this.#URL}/newExperience`, data)
    }

    updateExperience(data, id) {
        return axios.put(`${this.#URL}/experience/edit/${id}`, data)
    }

    removeExperience(id) {
        return axios.delete(`${this.#URL}/experience/remove/${id}`)
    }
}

export default new ProfileService();