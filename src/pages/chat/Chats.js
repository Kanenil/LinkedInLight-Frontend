import React, {useEffect, useState} from "react";
import WriteInIcon from "../../elements/icons/WriteInIcon";
import {
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ChatsSection from "../../components/chats/ChatsSection";
import MessagesSection from "../../components/chats/MessagesSection";
import ChatService from "../../services/chatService";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import SearchConnections from "../../components/chats/SearchConnections";
import ProfileService from "../../services/profileService";
import SendMessage from "../../components/chats/message-senders/SendMessage";
import {Helmet} from "react-helmet-async";
import {useSearchParams} from "react-router-dom";
import Show from "../../elements/shared/Show";
import MinimizedSendMessage from "../../components/chats/message-senders/MinimizedSendMessage";
import useMobileDetector from "../../hooks/useMobileDetector";

const Chats = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const {data, isLoading} = useQuery({
        queryFn: () => ProfileService.getProfile(),
        queryKey: ['profile'],
        select: ({data}) => data,
    });
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();
    const {isMobile} = useMobileDetector();

    const getParticipant = (chat) => {
        if(!data || !chat)
            return;

        return data.id === chat.participant2Id ? chat.participant1 : chat.participant2;
    }

    if(isLoading)
        return;

    const onNewChat = user => {
        ChatService.startChat(user.id).then(({data}) => {
            queryClient.invalidateQueries('allChats').then(() => {
                setSelectedChat(data);
            });
        })
    }

    const onSelectChat = (val) => {
        setSelectedChat(val);
        if(val) {
            ChatService.readChat(val.id).then();
            setSearchParams(prev => ({...prev, chat: val.id}));
        } else {
            searchParams.delete('chat');
            setSearchParams(searchParams);
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Chats</title>
            </Helmet>
            <Show>
                <Show.When isTrue={!!isMobile}>
                    <div className="flex-grow flex flex-col md:mt-8 mb-2 w-screen">
                        <Show>
                            <Show.When isTrue={!!selectedChat}>
                                <div className="flex-grow flex flex-col md:mt-8 mb-2 w-screen">
                                    <MessagesSection getParticipant={getParticipant} chat={selectedChat} setSelectedChat={onSelectChat}/>

                                    <MinimizedSendMessage getParticipant={getParticipant} selectedChat={selectedChat}/>
                                </div>
                            </Show.When>

                            <Show.Else>
                                <div className="flex-grow flex flex-col md:mt-8 mb-2 w-screen">
                                    <div className="flex relative border-[1px] border-gray h-[70px]">
                                        <div className="inline-block absolute text-xl left-6 top-5">Messages</div>
                                        <div className="inline-block absolute text-3xl font-mono inline-flex right-24 top-3">
                                            ...
                                        </div>
                                        <WriteInIcon className="fill-black w-16 h-16 inline-block absolute right-0 top-6"/>
                                    </div>
                                    <div className="flex border-[1px] border-gray py-3">
                                        <SearchConnections selectCallback={onNewChat}/>
                                    </div>

                                    <div className="inline-block flex-grow border-r-gray border-r-[1px] px-4 pt-2.5">
                                        <ChatsSection getParticipant={getParticipant} selectedChat={selectedChat} setSelectedChat={onSelectChat}/>
                                    </div>
                                </div>
                            </Show.Else>
                        </Show>
                    </div>
                </Show.When>

                <Show.Else>
                    <div className="flex-grow flex flex-col md:mt-8 mb-2 mx-auto w-[1170px]">
                        <div className="flex relative border-[1px] border-gray rounded-t-3xl h-[70px]">
                            <div className="w-1/3 inline-block border-r-gray border-r-[1px] overflow-hidden relative">
                                <div className="inline-block absolute left-10 top-6">Messages</div>
                                <div className="inline-block absolute text-3xl font-mono inline-flex right-24 top-3">
                                    ...
                                </div>
                                <WriteInIcon className="fill-black w-16 h-16 inline-block absolute right-0 top-6"/>
                            </div>
                            <div className="hidden md:flex flex-row items-center w-2/3 px-[30px] py-[13px]">
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
                            <div className="w-1/3 inline-block border-r-gray border-r-[1px] px-4 pt-2.5">
                                <ChatsSection getParticipant={getParticipant} selectedChat={selectedChat} setSelectedChat={onSelectChat}/>
                            </div>

                            <div className="hidden md:flex w-2/3 flex-col">
                                <MessagesSection getParticipant={getParticipant} chat={selectedChat} setSelectedChat={onSelectChat}/>

                                <SendMessage getParticipant={getParticipant} selectedChat={selectedChat}/>
                            </div>
                        </div>
                    </div>
                </Show.Else>
            </Show>
        </React.Fragment>
    )
};

export default Chats;
