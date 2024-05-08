import axios from "./axios";

class SettingsService {
    #URL = 'api/privacySettings';
    //Visibility
    profileViewingValues() {
        return axios.get(`${this.#URL}/profileViewingValues`);
    }

    emailVisibilityValues() {
        return axios.get(`${this.#URL}/emailVisibilityValues`);
    }

    discoverByPhoneValues() {
        return axios.get(`${this.#URL}/discoverByPhoneValues`);
    }

    activeStatusVisibilityValues() {
        return axios.get(`${this.#URL}/activeStatusVisibilityValues`);
    }

    connectionVisibility() {
        return axios.get(`${this.#URL}/connectionVisibility`);
    }

    showLastName() {
        return axios.get(`${this.#URL}/showLastName`);
    }

    shareProfileUpdates() {
        return axios.get(`${this.#URL}/shareProfileUpdates`);
    }
    
    profileVisibility() {
        return axios.get(`${this.#URL}/profileVisibility`);
    }
    // Previewed
    profileViewing() {
        return axios.get(`${this.#URL}/profileViewing`);
    }
    discoverByEmail() {
        return axios.get(`${this.#URL}/discoverByEmail`);
    }
    discoverByPhone() {
        return axios.get(`${this.#URL}/discoverByPhone`);
    }
    connectionVisibility() {
        return axios.get(`${this.#URL}/connectionVisibility`);
    }
    activeStatusVisibility() {
        return axios.get(`${this.#URL}/activeStatusVisibility`);
    }
    //
}
export default new SettingsService();