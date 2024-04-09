import {XMarkIcon} from "@heroicons/react/24/solid";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import React, {useEffect} from "react";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import MinimizedSendMessage from "./MinimizedSendMessage";
import noDataImage from "../../assets/empty-messages.png";
import {useQuery} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import useOverflow from "../../hooks/useOverflow";
import Show from "../../elements/shared/Show";
import MessageItem from "./MessageItem";

const NoData = () => {
    return (
        <div className="my-auto mx-auto">
            <img className="mx-auto" src={noDataImage} alt="noData"></img>
        </div>
    )
}

const MinimizedMessages = ({chat, setSelectedChat, getParticipant}) => {
    const {isLoading, data} = useQuery({
        queryFn: ({queryKey}) => ChatService.getAllMessages(queryKey[1]),
        queryKey: ['allChats', chat?.id],
        select: ({data}) => data,
        enabled: chat?.id !== undefined
    });
    const {contentRef, containerRef, isOverflow} = useOverflow();

    const participant = getParticipant(chat);

    useEffect(() => {
        let iteration = 0;

        const waitForOffsetTop = () => {
            if (containerRef.current?.scrollHeight >= contentRef.current?.scrollHeight) {
                containerRef.current?.scrollTo(0, contentRef.current?.scrollHeight);
                iteration = 5;
            } else if (iteration < 5) {
                setTimeout(waitForOffsetTop, 30);
                iteration++;
            }
        };

        waitForOffsetTop();
    }, [chat, containerRef, contentRef])

    return (
        <ConditionalWrapper condition={!!chat}>
            <div className="w-80 h-[50vh] mt-auto mb-10 bg-white rounded-xl flex flex-col"
                 style={{boxShadow: "0px 2px 10px rgba(71, 77, 92, 0.25)"}}>
                <div className="flex flex-row gap-4 py-4 px-2 border-b-[1px] border-b-[#B4BFDD]">
                    <div
                        className="rounded-full bg-gray-500 h-10 w-10 flex items-center justify-center border-2 border-black overflow-hidden">
                        <img
                            className="w-full h-full"
                            src={participant?.image ? APP_ENV.UPLOADS_URL + "/" + participant?.image : defaultImage}
                            alt="noData"
                        />
                    </div>

                    <h1 className="font-jost text-lg font-medium">{participant?.firstName} {participant?.lastName}</h1>

                    <button onClick={() => setSelectedChat(null)} className="ml-auto mb-auto hover:text-gray-900">
                        <XMarkIcon className="w-7 h-7"/>
                    </button>
                </div>

                <Show>
                    <Show.When isTrue={data && data.length > 0}>
                        <div id="container" ref={containerRef}
                             className={`overflow-x-hidden overflow-y-${isOverflow ? 'scroll' : 'hidden'}`}>
                            <div ref={contentRef} className="flex flex-col px-3 py-4 gap-5">
                                {
                                    !isLoading && data && [...data].reverse().map(message => (
                                        <MessageItem key={`message-${message.id}`} participant={participant} message={message}/>
                                    ))
                                }
                            </div>
                        </div>
                    </Show.When>

                    <Show.When isTrue={(!data || data.length === 0) && !chat}>
                        <NoData/>
                    </Show.When>
                </Show>

                <MinimizedSendMessage getParticipant={getParticipant} selectedChat={chat}/>
            </div>
        </ConditionalWrapper>
    )
}
export default MinimizedMessages;