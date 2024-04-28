import axios from "./axios"

class PrivacySettingsService {
	#URL = "api/privacySettings"

	getProfileVisibility() {
		return axios.get(`${this.#URL}/profileVisibility`)
	}

	editProfileVisibility(model) {
		return axios.put(`${this.#URL}/profileVisibility`, model)
	}
}

export default new PrivacySettingsService()
