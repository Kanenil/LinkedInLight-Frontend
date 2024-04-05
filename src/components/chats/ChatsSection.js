import noDataImage from "../../assets/empty-chat.png";
import {useQuery} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import Show from "../../elements/shared/Show";

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

const ChatsSection = () => {
    const {isLoading, data} = useQuery({
        queryFn: () => ChatService.getAllChats(),
        queryKey: ['allChats'],
        select: ({data}) => data,
    })

    return (
        <Show>
            <Show.When isTrue={data && data.length > 0}>
                {
                    !isLoading && data.map(chat => (
                        <div
                            // onClick={() => setSelectedChat(chat)}
                            className="border-b-gray-200 border-b-[1px] pt-2 hover:bg-gray-200 transition-colors duration-300 transform cursor-pointer"
                        >
                            <div className="flex">
                                <div className="inline-block pl-1">
                                    <div
                                        className="rounded-full bg-gray-500 h-12 w-12 flex items-center justify-center overflow-hidden">
                                        <img
                                            className="w-full h-full"
                                            src={chat.user.avatar}
                                            alt="noData"
                                        ></img>
                                    </div>
                                </div>

                                <div className="inline-block ml-5">
                                    <div className="text-md">{chat.user.name}</div>
                                    <div className="text-gray-400 text-sm">
                                        {chat.lastMessage.text}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pr-2 text-xs text-blue-300">
                                {/*{getSendingTime(chat.lastMessage.sendingTime)}*/}
                            </div>
                        </div>
                    ))
                }
            </Show.When>

            <Show.Else>
                <NoData/>
            </Show.Else>
        </Show>
    )
}
export default ChatsSection;