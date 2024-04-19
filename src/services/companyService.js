import axios from "./axios";

class CompanyService {
    #URL = 'api/company';

    getIndustries() {
        return axios.get(`${this.#URL}/allIndustries`);
    }

    getTypes() {
        return axios.get(`${this.#URL}/allOrganizationTypes`);
    }

    getSizes() {
        return axios.get(`${this.#URL}/allOrganizationSizes`);
    }

    create(model) {
        return axios.post(`${this.#URL}/newCompany`, model);
    }

    getUserCompanies() {
        return axios.get(`${this.#URL}/userCompanies`);
    }

    getFollowedCompanies() {
        return axios.get(`${this.#URL}/followedCompanies`);
    }

    getFollowersCount(companyId) {
        return axios.get(`${this.#URL}/${companyId}/followersCount`);
    }
}

export default new CompanyService();