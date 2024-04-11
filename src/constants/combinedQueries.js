import ConnectionService from "../services/connectionService";

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
]

export {connectedQuery}