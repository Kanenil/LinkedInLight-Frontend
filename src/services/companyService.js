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
}

export default new CompanyService();