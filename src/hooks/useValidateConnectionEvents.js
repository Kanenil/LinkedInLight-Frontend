import {SignalRConnectionsContext} from "../providers/SocketProvider";
import {useQueryClient} from "@tanstack/react-query";

const useValidateConnectionEvents = () => {
    const queryClient = useQueryClient();

    SignalRConnectionsContext.useSignalREffect(
        "New connection request",
        () => {
            queryClient.invalidateQueries(['connections', 'pendingRequests']);
        }, []
    );

    SignalRConnectionsContext.useSignalREffect(
        "All pending requests",
        () => {
            queryClient.invalidateQueries(['connections', 'pendingRequests']);
        }, []
    );

    SignalRConnectionsContext.useSignalREffect(
        "Connection Request accepted",
        () => {
            queryClient.invalidateQueries(['connections', 'pendingRequests']);
        }, []
    );

}
export default useValidateConnectionEvents;