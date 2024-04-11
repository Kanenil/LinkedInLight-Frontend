import {SignalRContext} from "../providers/SocketProvider";

const useValidateChatEvents = (queryClient, selectedChat, setSelectedChat) => {
    SignalRContext.useSignalREffect(
        "UpdateChatList",
        () => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        }, []
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
        "MessageDeletedForAll",
        () => {
            queryClient.invalidateQueries(['allChats', 'allUnreadMessages']);
        }, []
    )

    SignalRContext.useSignalREffect(
        "MessageDeletedForMe",
        () => {
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
}
export default useValidateChatEvents;