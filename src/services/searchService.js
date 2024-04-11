import axios from "./axios";

class SearchService {
    #URL = 'api/search';

    search(query) {
        return axios.get(`${this.#URL}/search`, {
            params: {
                query
            }
        });
    }
}
export default new SearchService();