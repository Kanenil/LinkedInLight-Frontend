import {useQuery, useQueryClient} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import Show from "../../elements/shared/Show";
import ChatItem from "./items/ChatItem";
import React, {useEffect} from "react";
import NoChats from "./items/NoChats";
import useValidateChatEvents from "../../hooks/useValidateChatEvents";
import {useSearchParams} from "react-router-dom";

const ChatsSection = ({getParticipant, selectedChat, setSelectedChat}) => {
    const {isLoading, data} = useQuery({
        queryFn: () => ChatService.getAllChats(),
        queryKey: ['allChats'],
        select: ({data}) => data,
    });
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();

    useValidateChatEvents(queryClient, selectedChat, setSelectedChat);

    useEffect(() => {
        if (selectedChat && !selectedChat?.participant1 && !isLoading) {
            setSelectedChat(data.find(chat => chat.id === selectedChat.id))
        }
    }, [data, isLoading, selectedChat])

    useEffect(() => {
        const chatId = searchParams.get('chat');

        if (chatId && !isLoading) {
            const chat = data?.find(val => val.id == chatId);

            if (!chat) {
                searchParams.delete('chat');
                setSearchParams(searchParams);
                return;
            }

            setSelectedChat(chat)
        }
    }, [searchParams, data, isLoading])

    const onFocus = async (value) => {
        if (selectedChat && value) {
            await ChatService.readChat(selectedChat?.id);
        }
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', onFocus)
        document.addEventListener('blur', onFocus)
        window.addEventListener('blur', onFocus)
        window.addEventListener('focus', onFocus)
        document.addEventListener('focus', onFocus)

        return () => {
            window.removeEventListener('blur', onFocus)
            document.removeEventListener('blur', onFocus)
            window.removeEventListener('focus', onFocus)
            document.removeEventListener('focus', onFocus)
            document.removeEventListener('visibilitychange', onFocus)
        }
    }, [selectedChat])

    return (
        <Show>
            <Show.When isTrue={data && data.length > 0}>
                {
                    !isLoading && data?.map(chat => (
                        <ChatItem
                            key={`chat-${getParticipant(chat).id}`}
                            selectedChat={selectedChat}
                            getParticipant={getParticipant}
                            setSelectedChat={setSelectedChat}
                            chat={chat}
                        />
                    ))
                }
            </Show.When>

            <Show.Else>
                <NoChats/>
            </Show.Else>
        </Show>
    )
}
export default ChatsSection;