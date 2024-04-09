import noDataImage from "../../assets/empty-chat.png";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import Show from "../../elements/shared/Show";
import defaultImage from "../../assets/default-image.jpg";
import {APP_ENV} from "../../env";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import classNames from "classnames";
import {getSendingTime} from "../../utils/date";
import {SignalRContext} from "../../providers/SocketProvider";
import ChatOptionButton from "./ChatOptionButton";

const NoData = () => {
    return (
        <div>
            <img src={noDataImage} alt="noData"></img>
            <div className="text-center text-lg text-blue-800">
                No messages right now
            </div>
            <div className="my-8 text-sm text-center text-gray-400 w-2/3 mx-auto mb-16">
                Communicate and start discussions to make progress in your professional
                development.
            </div>
            <div
                className="text-xl bg-blue-800 text-white text-center py-1 mx-10 rounded-3xl hover:bg-blue-600 transition duration-300 ease-in-out">
                Send message
            </div>
        </div>
    )
}

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
            queryClient.invalidateQueries('allChats');
        },[]
    );

    SignalRContext.useSignalREffect(
        "MessagesMarkedAsRead",
        () => {
            queryClient.invalidateQueries('allChats');
        }, []
    )

    return (
        <div className="w-1/3 inline-block border-r-gray border-r-[1px] px-4 pt-2.5">
            <Show>
                <Show.When isTrue={data && data.length > 0}>
                    {
                        !isLoading && data.map(chat => {
                            const participant = getParticipant(chat);
                            const isSelected = selectedChat ? selectedChat.id === chat.id : false;

                            if(!participant)
                                return;

                            const lastMessage = chat.messages[chat.messages.length - 1];

                            return (
                                <div key={`chat-${participant.id}`} className="flex flex-row mb-4">
                                    <div
                                        onClick={() => setSelectedChat(chat)}
                                        className={classNames("hover:bg-[#EEF1FB] rounded-lg transition-colors duration-300 transform cursor-pointer w-full",{
                                            'bg-[#EEF1FB]': isSelected
                                        })}
                                    >
                                        <div className="flex">
                                            <div className="pl-1">
                                                <div
                                                    className="rounded-full bg-gray-500 h-12 w-12 flex items-center justify-center border-2 border-black overflow-hidden">
                                                    <img
                                                        className="w-full h-full"
                                                        src={participant.image ? APP_ENV.UPLOADS_URL + "/" + participant?.image : defaultImage}
                                                        alt="noData"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex flex-col ml-5 font-jost">
                                                <div
                                                    className="text-md">{participant.firstName} {participant.lastName}</div>
                                                <div className="flex flex-row gap-2">
                                                    <div className="text-gray-400 text-sm max-w-52 truncate text-ellipsis">
                                                        {lastMessage?.content}
                                                    </div>
                                                    <div className="text-gray-400 text-sm">
                                                        {getSendingTime(new Date(lastMessage?.sentAt))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ConditionalWrapper condition={isSelected}>
                                        <ChatOptionButton chat={selectedChat}/>
                                    </ConditionalWrapper>
                                </div>
                            )
                        })
                    }
                </Show.When>

                <Show.Else>
                    <NoData/>
                </Show.Else>
            </Show>
        </div>
    )
}
export default ChatsSection;