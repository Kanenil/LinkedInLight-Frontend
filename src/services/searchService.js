/* eslint-disable import/no-anonymous-default-export */
import axios from "./axios"

class SearchService {
	#URL = "api/search"

	search(query) {
		return axios.get(`${this.#URL}/search`, {
			params: {
				query,
			},
		})
	}

	jobSearch() {
		return axios.get(`${this.#URL}/job-search`)
	}

	companiesSearch() {
		return axios.get(`${this.#URL}/job-search/companies`)
	}
}
export default new SearchService()
