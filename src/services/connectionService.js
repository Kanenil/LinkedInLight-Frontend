import axios from "./axios";

class ConnectionService {
    #URL = 'api/connection';

    getConnections() {
        return axios.get(`${this.#URL}/connections`);
    }

    connectionsSearch(query, page = 1) {
        return axios.get(`${this.#URL}/connection-search`, {
            params: {
                query,
                page
            }
        });
    }

    getConnectionCountByProfileUrl(url) {
        return axios.get(`${this.#URL}/connectionCount/${url}`);
    }

    getPendingRequests() {
        return axios.get(`${this.#URL}/pendingRequests`);
    }

    sendRequest(receiverId) {
        return axios.post(`${this.#URL}/sendRequest`, null, {
            params: {
                receiverId
            }
        });
    }

    acceptRequest(requestId) {
        return axios.post(`${this.#URL}/accept/${requestId}`, null);
    }

    rejectRequest(requestId) {
        return axios.post(`${this.#URL}/reject/${requestId}`, null);
    }

    revokeRequest(requestId) {
        return axios.delete(`${this.#URL}/revoke/${requestId}`, null);
    }

    removeConnection(connectionId) {
        return axios.delete(`${this.#URL}/remove/${connectionId}`, null);
    }

    isConnected(user2Id) {
        return axios.get(`${this.#URL}/isConnected/${user2Id}`);
    }

    isConnectionRequested(user2Id) {
        return axios.get(`${this.#URL}/isConnectionRequested/${user2Id}`);
    }
}
export default new ConnectionService();