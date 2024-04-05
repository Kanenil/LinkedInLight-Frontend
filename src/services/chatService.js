import axios from "./axios";

class ChatService {
    #URL = 'api/chat';

    getAllChats() {
        return axios.get(`${this.#URL}/allChats`);
    }

    getAllMessages(chatId) {
        return axios.get(`${this.#URL}/messages/${chatId}`);
    }
}
export default new ChatService();