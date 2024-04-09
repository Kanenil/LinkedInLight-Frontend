import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import {useQuery} from "@tanstack/react-query";
import ProfileService from "../../services/profileService";
import React, {useEffect, useState} from "react";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import Show from "../../elements/shared/Show";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import MinimizedChatsList from "./MinimizedChatsList";
import MinimizedMessages from "./MinimizedMessages";
import ChatService from "../../services/chatService";

const MinimizedChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {data} = useQuery({
        queryFn: () => ProfileService.getProfile(),
        queryKey: ['profile'],
        select: ({data}) => data,
    });
    const imageUrl = data?.image ? APP_ENV.UPLOADS_URL + "/" + data?.image : defaultImage;
    const [selectedChat, setSelectedChat] = useState(null);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    }

    const getParticipant = (chat) => {
        if(!data || !chat)
            return;

        return data.id === chat.participant2Id ? chat.participant1 : chat.participant2;
    }

    const onSelectChat = async (val) => {
        setSelectedChat(val);
        await ChatService.readChat(val.id);
    }

    const onFocus = async (value) => {
        if(selectedChat && value) {
            await ChatService.readChat(selectedChat.id);
        }
    }

    useEffect(() => {
        const handleActivityFalse = () => onFocus(false)
        const handleActivityTrue = () => onFocus(true)

        document.addEventListener('visibilitychange', onFocus)
        document.addEventListener('blur', handleActivityFalse)
        window.addEventListener('blur', handleActivityFalse)
        window.addEventListener('focus', handleActivityTrue )
        document.addEventListener('focus', handleActivityTrue)

        return () => {
            window.removeEventListener('blur', onFocus)
            document.removeEventListener('blur', handleActivityFalse)
            window.removeEventListener('focus', handleActivityFalse)
            document.removeEventListener('focus', handleActivityTrue )
            document.removeEventListener('visibilitychange', handleActivityTrue )
        }
    }, [selectedChat])

    return (
        <div className={`fixed flex flex-row gap-10 z-20 left-[${selectedChat?'55':'75'}vw] bottom-0`}>
            <MinimizedMessages chat={selectedChat} setSelectedChat={setSelectedChat} getParticipant={getParticipant}/>
            <div className="w-80 h-fit mt-auto bg-white rounded-t-xl flex flex-col"
                 style={{boxShadow: "0px 2px 10px rgba(71, 77, 92, 0.25)"}}>
                <button onClick={toggleOpen} className="w-full py-2 border-b-[1px] border-b-[#B4BFDD]">
                    <Show>
                        <Show.When isTrue={isOpen}>
                            <ChevronDownIcon className="mx-auto w-5 h-5"/>
                        </Show.When>

                        <Show.Else>
                            <ChevronUpIcon className="mx-auto w-5 h-5"/>
                        </Show.Else>
                    </Show>
                </button>

                <div className="flex flex-row gap-5 items-center px-4 py-2">
                    <div className="w-8 h-8 overflow-hidden rounded-full my-auto border-2 border-[#2D2A33]">
                        <img alt="image" className="object-contain"
                             src={imageUrl}/>
                    </div>

                    <h1 className="font-jost font-medium">Messages</h1>

                    <div className="ml-auto items-center gap-5 flex flex-row">
                        <h3 className="text-3xl -mt-3 font-mono">...</h3>
                        <PencilSquareIcon className="w-6 h-6"/>
                    </div>
                </div>

                <ConditionalWrapper condition={isOpen}>
                    <MinimizedChatsList selectedChat={selectedChat} setSelectedChat={onSelectChat}/>
                </ConditionalWrapper>
            </div>
        </div>
    )
}
export default MinimizedChat;