import {createContext, useContext, useState} from "react";
import ChatService from "../services/chatService";
import {useQuery} from "@tanstack/react-query";
import ProfileService from "../services/profileService";

export const ChatContext = createContext({});

const ChatProvider = ({children}) => {
    const [selectedChat, setSelectedChat] = useState(null);
    const {data: profile} = useQuery({
        queryFn: () => ProfileService.getProfile(),
        queryKey: ['profile'],
        select: ({data}) => data,
    })

    const setSelectedChatByUserId = (userId) => {
        ChatService.getAllChats().then(({data}) => {
            const chat = data.find(value =>
                (value.participant2Id === profile.id && value.participant1Id === userId) ||
                (value.participant1Id === profile.id && value.participant2Id === userId)
            );

            if(chat)
                setSelectedChat(chat);
            else
                ChatService.startChat(userId).then(() => setSelectedChatByUserId(userId));
        })
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