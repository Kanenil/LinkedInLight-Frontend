import React, {useEffect, useState} from "react";
import WriteInIcon from "../../elements/icons/WriteInIcon";
import {
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ChatsSection from "../../components/chats/ChatsSection";
import MessagesSection from "../../components/chats/MessagesSection";
import ChatService from "../../services/chatService";
import {useQuery} from "@tanstack/react-query";
import SearchConnections from "../../components/chats/SearchConnections";
import ProfileService from "../../services/profileService";
import SendMessage from "../../components/chats/SendMessage";
import {Helmet} from "react-helmet-async";

const Chats = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const {data} = useQuery({
        queryFn: () => ProfileService.getProfile(),
        queryKey: ['profile'],
        select: ({data}) => data,
    });

    const getParticipant = (chat) => {
        if(!data || !chat)
            return;

        return data.id === chat.participant2Id ? chat.participant1 : chat.participant2;
    }

    const onNewChat = user => {
        ChatService.startChat(user.id).then(({data}) => {
            console.log(data)
            //setSelectedChat(data);
        })
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
        <React.Fragment>
            <Helmet>
                <title>Chats</title>
            </Helmet>
            <div className="flex-grow flex flex-col mt-8 mb-2 mx-auto w-[1170px]">
                <div className="flex relative border-[1px] border-gray rounded-t-3xl  h-[70px]">
                    <div className="w-1/3 inline-block border-r-gray border-r-[1px] overflow-hidden relative">
                        <div className="inline-block absolute left-10 top-6">Messages</div>
                        <div className="inline-block absolute text-3xl font-mono inline-flex right-24 top-3">
                            ...
                        </div>
                        <WriteInIcon className="fill-black w-16 h-16 inline-block absolute right-0 top-6"/>
                    </div>
                    <div className="flex flex-row items-center w-2/3 px-[30px] py-[13px]">
                        <div className="inline-block relative">
                            <input
                                className="relative absolute w-75 font-light border-gray-300 border-[1px] pl-[50px] rounded-2xl"
                                placeholder="Search messages"
                            />
                            <MagnifyingGlassIcon
                                className="w-5 h-5 absolute top-2.5 left-4 text-gray-500"/>
                            <AdjustmentsHorizontalIcon
                                className="w-5 h-5 absolute top-3 right-5 text-gray-500"/>
                        </div>

                        <SearchConnections selectCallback={onNewChat}/>
                    </div>
                </div>
                <div className="flex relative flex-grow border-[1px] border-gray rounded-b-3xl overflow-hidden">
                    <ChatsSection getParticipant={getParticipant} selectedChat={selectedChat} setSelectedChat={onSelectChat}/>

                    <div className="w-2/3 flex flex-col">
                        <MessagesSection getParticipant={getParticipant} chat={selectedChat}/>

                        <SendMessage getParticipant={getParticipant} selectedChat={selectedChat}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Chats;
