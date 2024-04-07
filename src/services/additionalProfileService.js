import axios from "./axios";

class AdditionalProfileService {
    #URL = 'api/additionalProfile';

    getIntro() {
        return axios.get(`${this.#URL}/intro`);
    }

    updateIntro(data) {
        return axios.put(`${this.#URL}/intro`, data);
    }

    getAllLanguages() {
        return axios.get(`${this.#URL}/allLanguages`);
    }

    getLanguagesByProfileUrl(url) {
        return axios.get(`${this.#URL}/${url}/languages`);
    }

    getLanguages() {
        return axios.get(`${this.#URL}/userLanguages`);
    }

    addLanguage(data) {
        return axios.post(`${this.#URL}/newLanguage`, {
            id: 0,
            ...data
        })
    }

    removeLanguage(id) {
        return axios.delete(`${this.#URL}/language/remove/${id}`)
    }

    updateLanguage(data, id) {
        return axios.put(`${this.#URL}/language/edit/${id}`, {
            ...data
        })
    }

    getVolunteerExperiences() {
        return axios.get(`${this.#URL}/userVolunteerExperiences`)
    }

    getVolunteerExperiencesByProfileUrl(url) {
        return axios.get(`${this.#URL}/${url}/volunteerExperiences`);
    }

    getVolunteerExperience(id) {
        return axios.get(`${this.#URL}/volunteerExperience/${id}`)
    }

    addVolunteerExperience(data) {
        return axios.post(`${this.#URL}/newVolunteerExperience`, data)
    }

    updateVolunteerExperience(data, id) {
        return axios.put(`${this.#URL}/volunteerExperience/edit/${id}`, data)
    }

    removeVolunteerExperience(id) {
        return axios.delete(`${this.#URL}/volunteerExperience/remove/${id}`)
    }
}

export default new AdditionalProfileService();