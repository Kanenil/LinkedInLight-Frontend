import axios from "./axios";

class ChatService {
    #URL = 'api/chat';

    getAllChats() {
        return axios.get(`${this.#URL}/allChats`);
    }

    getAllMessages(chatId) {
        return axios.get(`${this.#URL}/messages/${chatId}`);
    }

    searchConnections(search) {
        return axios.get(`${this.#URL}/connections-search`, {
            params: {
                name: search
            }
        });
    }

    startChat(participantId) {
        return axios.post(`${this.#URL}/startNewChat`, null, {
            params: {
                participant2Id: participantId
            }
        });
    }
}
export default new ChatService();