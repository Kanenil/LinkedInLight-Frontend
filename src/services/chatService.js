import axios from "./axios";

class ChatService {
    #URL = 'api/chat';

    getAllChats() {
        return axios.get(`${this.#URL}/allChats`);
    }
}
export default new ChatService();