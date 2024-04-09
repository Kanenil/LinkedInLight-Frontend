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

    sendMessage(message) {
        return axios.postForm(this.#URL, message);
    }

    readChat(chat) {
        return axios.post(`${this.#URL}/read/${chat}`, null);
    }

    deleteChat(chat, deleteForMe) {
        return axios.delete(`${this.#URL}/${chat}`, {
            params: {
                deleteForMeOnly: deleteForMe
            }
        });
    }
}
export default new ChatService();