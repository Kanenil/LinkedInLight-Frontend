import axios from "./axios"

class AccountPreferenceService {
	#URL = "api/accountPreference"

	AccountPreference() {
		return axios.get(`${this.#URL}`)
	}
	updateAccountPreference(data) {
		return axios.put(`${this.#URL}`, data)
	}

	showProfilePhotosValues() {
		return axios.get(`${this.#URL}/showProfilePhotosValues`)
	}
	feedPreferencesValues() {
		return axios.get(`${this.#URL}/feedPreferencesValues`)
	}
	hibernationReasonValues() {
		return axios.get(`${this.#URL}/hibernationReasonValues`)
	}
	hibernate(data) {
		return axios.post(`${this.#URL}/hibernateAccount`, null, {
            params: {
                reason: data.reason,
                feedback: data.feedback
            }
        });
	}
}

export default new AccountPreferenceService()
