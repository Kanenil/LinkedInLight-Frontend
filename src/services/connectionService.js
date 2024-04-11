import axios from "./axios";

class ConnectionService {
    #URL = 'api/connection';

    getConnections() {
        return axios.get(`${this.#URL}/connections`);
    }
}
export default new ConnectionService();