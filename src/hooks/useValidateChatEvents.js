import {SignalRChatContext} from "../providers/SocketProvider";

const useValidateChatEvents = (queryClient, selectedChat, setSelectedChat) => {
    SignalRChatContext.useSignalREffect(
        "UpdateChatList",
        () => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        }, []
    );

    SignalRChatContext.useSignalREffect(
        "MessagesMarkedAsRead",
        () => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        }, []
    )

    SignalRChatContext.useSignalREffect(
        "MessageUpdated",
        (message) => {
            if(selectedChat?.id === message.chatId)
                queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        }, []
    )

    SignalRChatContext.useSignalREffect(
        "MessageDeletedForAll",
        () => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        }, []
    )

    SignalRChatContext.useSignalREffect(
        "MessageDeletedForMe",
        () => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        }, []
    )

    SignalRChatContext.useSignalREffect(
        "ChatDeletedForAll",
        (chats) => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
            if(selectedChat && !chats.find(chat => chat.id === selectedChat.id)) {
                setSelectedChat(null);
            }
        }, [selectedChat]
    )
}
export default useValidateChatEvents;