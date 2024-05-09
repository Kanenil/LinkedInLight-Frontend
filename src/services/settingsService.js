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

    discoverByEmailValues() {
        return axios.get(`${this.#URL}/discoverByEmailValues`);
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
    // 
    profileViewing() {
        return axios.get(`${this.#URL}/profileViewing`);
    }
    updateProfileViewing(profileViewing) {
        axios.post(`${this.#URL}/updateProfileViewing`, null, {
            params: {
                profileViewing: profileViewing
            }
        });
    }
    discoverByEmail() {
        return axios.get(`${this.#URL}/discoverByEmail`);
    }
    updateDiscoverByEmail(discoverByEmailValue) {
        axios.post(`${this.#URL}/updateDiscoverByEmail`, null, {
            params: {
                discoverByEmailValue: discoverByEmailValue
            }
        });
    }
    discoverByPhone() {
        return axios.get(`${this.#URL}/discoverByPhone`);
    }
    updateDiscoverByPhone(discoverByPhoneValue) {
        return axios.post(`${this.#URL}/updateDiscoverByPhone`, null, {
            params: {
                discoverByPhoneValue: discoverByPhoneValue
            }
        });
    }

    updateConnectionVisibility(connectionVisibility) {
        axios.post(`${this.#URL}/updateConnectionVisibility`, null, {
            params: {
                connectionVisibility: connectionVisibility
            }
        });
    }
    activeStatusVisibility() {
        return axios.get(`${this.#URL}/activeStatusVisibility`);
    }
    updateActiveStatusVisibility(activeStatusVisibilityValue) {
        axios.post(`${this.#URL}/updateActiveStatusVisibility`, null, {
            params: {
                activeStatusVisibilityValue: activeStatusVisibilityValue
            }
        });
    }

    emailVisibility() {
        return axios.get(`${this.#URL}/emailVisibility`);
    }
    updateEmailVisibility(emailVisibilityValue) {
        axios.post(`${this.#URL}/updateEmailVisibility`, null, {
            params: {
                emailVisibilityValue: emailVisibilityValue
            }
        });
    }

    updateShowLastName(showLastName) {
        axios.post(`${this.#URL}/updateShowLastName`, null, {
            params: {
                showLastName: showLastName
            }
        });
    }
    //
}
export default new SettingsService();