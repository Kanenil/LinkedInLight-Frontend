import {useQuery, useQueryClient} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import Show from "../../elements/shared/Show";
import {SignalRContext} from "../../providers/SocketProvider";
import ChatItem from "./items/ChatItem";
import React, {useEffect} from "react";
import NoChats from "./items/NoChats";

const ChatsSection =({getParticipant, selectedChat, setSelectedChat}) => {
    const {isLoading, data} = useQuery({
        queryFn: () => ChatService.getAllChats(),
        queryKey: ['allChats'],
        select: ({data}) => data,
    });
    const queryClient = useQueryClient();

    SignalRContext.useSignalREffect(
        "UpdateChatList",
        () => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        },[]
    );

    SignalRContext.useSignalREffect(
        "MessagesMarkedAsRead",
        () => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        }, []
    )

    SignalRContext.useSignalREffect(
        "MessageUpdated",
        (message) => {
            if(selectedChat?.id === message.chatId)
                queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        }, []
    )

    SignalRContext.useSignalREffect(
        "ChatDeletedForAll",
        (chats) => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
            if(selectedChat && !chats.find(chat => chat.id === selectedChat.id)) {
                setSelectedChat(null);
            }
        }, [selectedChat]
    )

    useEffect(() => {
        if(selectedChat && !selectedChat?.participant1 && !isLoading) {
            setSelectedChat(data.find(chat => chat.id === selectedChat.id))
        }
    }, [data, isLoading, selectedChat])

    const onFocus = async (value) => {
        if(selectedChat && value) {
            await ChatService.readChat(selectedChat?.id);
        }
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', onFocus)
        document.addEventListener('blur', onFocus)
        window.addEventListener('blur', onFocus)
        window.addEventListener('focus', onFocus )
        document.addEventListener('focus', onFocus)

        return () => {
            window.removeEventListener('blur', onFocus)
            document.removeEventListener('blur', onFocus)
            window.removeEventListener('focus', onFocus)
            document.removeEventListener('focus', onFocus )
            document.removeEventListener('visibilitychange', onFocus )
        }
    }, [selectedChat])

    return (
        <div className="w-1/3 inline-block border-r-gray border-r-[1px] px-4 pt-2.5">
            <Show>
                <Show.When isTrue={data && data.length > 0}>
                    {
                        !isLoading && data.map(chat => (
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
        </div>
    )
}
export default ChatsSection;