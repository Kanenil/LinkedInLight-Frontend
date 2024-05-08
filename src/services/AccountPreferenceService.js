import axios from "./axios"

class AccountPreferenceService {
	#URL = "api/accountPreference"

	AccountPreference() {
		return axios.get(`${this.#URL}`)
	}
	updateAccountPreference(data) {
		return axios.put(`${this.#URL}`, data)
	}
}

export default new AccountPreferenceService()
