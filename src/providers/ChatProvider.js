import {createContext, useContext, useState} from "react";
import ChatService from "../services/chatService";

export const ChatContext = createContext({});

const ChatProvider = ({children}) => {
    const [selectedChat, setSelectedChat] = useState(null);

    const setSelectedChatByUserId = (userId) => {
        ChatService.startChat(userId).then(({data}) => setSelectedChat(data));
    }

    return (
        <ChatContext.Provider
            value={{
                setSelectedChatByUserId,
                selectedChat,
                setSelectedChat
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export const useChatContext = () => useContext(ChatContext);

export default ChatProvider;