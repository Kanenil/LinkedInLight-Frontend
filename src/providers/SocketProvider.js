import {createSignalRContext} from "react-signalr";
import {general} from "../constants/general";
import {APP_ENV} from "../env";
import {LogLevel} from "@microsoft/signalr";

export const SignalRContext = createSignalRContext();

const SocketProvider = ({children}) => {
    const token = localStorage.getItem(general.token);

    return (
        <SignalRContext.Provider
            connectEnabled={!!token}
            accessTokenFactory={() => localStorage.getItem(general.token)}
            dependencies={[token]}
            logger={LogLevel.None}
            url={APP_ENV.CHAT_URL}
        >
            {children}
        </SignalRContext.Provider>
    )
}
export default SocketProvider;