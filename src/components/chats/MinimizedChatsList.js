import {useQuery} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import noDataImage from "../../assets/empty-chat.png";
import Show from "../../elements/shared/Show";
import classNames from "classnames";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {EllipsisVerticalIcon} from "@heroicons/react/24/solid";
import ProfileService from "../../services/profileService";
import {AdjustmentsHorizontalIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const NoData = () => {
    return (
        <div className="flex flex-col w-full">
            <img src={noDataImage} alt="noData"></img>
            <div className="text-center text-lg text-blue-800">
                No messages right now
            </div>
            <div className="my-8 text-sm text-center text-gray-400 w-2/3 mx-auto mb-16">
                Communicate and start discussions to make progress in your professional
                development.
            </div>
            <button
                className="font-jost mx-10 text-xl bg-blue-800 text-white text-center py-1 rounded-3xl hover:bg-blue-600 transition duration-300 ease-in-out">
                Send message
            </button>
        </div>
    )
}

const MinimizedChatsList = ({selectedChat, setSelectedChat}) => {
    const {isLoading, data} = useQuery({
        queryFn: () => ChatService.getAllChats(),
        queryKey: ['allChats'],
        select: ({data}) => data,
    });
    const profileQuery = useQuery({
        queryFn: () => ProfileService.getProfile(),
        queryKey: ['profile'],
        select: ({data}) => data,
    })

    const getParticipant = (chat) => {
        return profileQuery.data.id === chat.participant2Id ? chat.participant1 : chat.participant2;
    }

    return (
        <div className="border-t-[1px] border-[#B4BFDD] h-[70vh]">
            <div className="border-b-[1px] border-[#B4BFDD] py-4">
                <div className="inline-block w-full relative px-2">
                    <input
                        className="relative absolute w-full font-light text-sm border-[#7D7D7D] border-[1px] pl-[50px] pr-[50px] rounded-2xl"
                        placeholder="Search messages"
                    />
                    <MagnifyingGlassIcon
                        className="w-5 h-5 absolute top-2 left-5 text-[#7D7D7D]"/>
                    <AdjustmentsHorizontalIcon
                        className="w-5 h-5 absolute top-2.5 right-7 text-[#7D7D7D]"/>
                </div>
            </div>

            <Show>
                <Show.When isTrue={data && data.length > 0}>
                    {
                        !isLoading && data.map(chat => {
                            const participant = getParticipant(chat);
                            const isSelected = selectedChat ? selectedChat.id === chat.id : false;

                            return (
                                <div key={`chat-${participant.id}`} className="flex flex-row pt-2 px-2">
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
                                                    <div className="text-gray-400 text-sm max-w-40 truncate text-ellipsis">
                                                        Недавно написав цей вірш і прочи
                                                    </div>
                                                    <div className="text-gray-400 text-sm">
                                                        2 д.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
export default MinimizedChatsList;