import {useQuery} from "@tanstack/react-query";
import ChatService from "../../../services/chatService";
import noDataImage from "../../../assets/empty-chat.png";
import Show from "../../../elements/shared/Show";
import classNames from "classnames";
import {APP_ENV} from "../../../env";
import defaultImage from "../../../assets/default-image.jpg";
import ProfileService from "../../../services/profileService";
import {AdjustmentsHorizontalIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {getSendingTime} from "../../../utils/date";
import {Link} from "react-router-dom";
import React from "react";
import ChatItem from "../items/ChatItem";
import NoChats from "../items/NoChats";

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

            <div className="flex flex-col pt-2 px-1">
                <Show>
                    <Show.When isTrue={data && data.length > 0}>
                        {
                            !isLoading && data.map(chat => (
                                <ChatItem
                                    key={`chat-${getParticipant(chat).id}`}
                                    selectedChat={selectedChat}
                                    getParticipant={getParticipant}
                                    setSelectedChat={setSelectedChat}
                                    chat={chat}
                                />
                            ))
                        }
                    </Show.When>

                    <Show.Else>
                        <NoChats/>
                    </Show.Else>
                </Show>
            </div>
        </div>
    )
}
export default MinimizedChatsList;