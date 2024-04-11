import ConnectionService from "../services/connectionService";
import ChatService from "../services/chatService";

const connectedQuery = (userId, isOwner) => [
    {
        queryFn: ({queryKey}) => ConnectionService.isConnected(queryKey[1]),
        queryKey: ['isConnected', userId],
        select: ({data}) => data,
        enabled: !isOwner
    },
    {
        queryFn: ({queryKey}) => ConnectionService.isConnectionRequested(queryKey[1]),
        queryKey: ['isConnectionRequested', userId],
        select: ({data}) => data,
        enabled: !isOwner,
        retry: false
    }
];

const headerQuery = () => [
    {
        queryFn: () => ChatService.allUnreadMessages(),
        queryKey: ['allUnreadMessages'],
        select: ({data}) => data,
    },
    {
        queryFn: () => ConnectionService.getPendingRequests(),
        queryKey: ['pendingRequests'],
        select: ({data}) => data,
    }
]

export {connectedQuery, headerQuery}