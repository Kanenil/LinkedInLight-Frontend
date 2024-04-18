import {createSignalRContext} from "react-signalr";
import {general} from "../constants/general";
import {APP_ENV} from "../env";
import {LogLevel} from "@microsoft/signalr";

export const SignalRChatContext = createSignalRContext();
export const SignalRConnectionsContext = createSignalRContext();

const SocketProvider = ({children}) => {
    const token = localStorage.getItem(general.token);

    const factory = () => localStorage.getItem(general.token)

    return (
        <SignalRChatContext.Provider
            connectEnabled={!!token}
            accessTokenFactory={factory}
            dependencies={[token]}
            logger={LogLevel.None}
            url={APP_ENV.CHAT_URL}
        >
            <SignalRConnectionsContext.Provider
                connectEnabled={!!token}
                accessTokenFactory={factory}
                dependencies={[token]}
                logger={LogLevel.None}
                url={APP_ENV.CONNECTION_URL}
            >
                {children}
            </SignalRConnectionsContext.Provider>
        </SignalRChatContext.Provider>
    )
}
export default SocketProvider;