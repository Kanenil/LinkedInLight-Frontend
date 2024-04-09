import noDataImage from "../../assets/empty-messages.png";
import {useQuery} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import Show from "../../elements/shared/Show";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import useOverflow from "../../hooks/useOverflow";
import {useEffect} from "react";
import MessagesList from "./MessagesList";

const NoData = () => {
    return (
        <div className="my-auto mx-auto">
            <img className="mx-auto" src={noDataImage} alt="noData"></img>
        </div>
    )
}

const MessagesSection = ({getParticipant, chat}) => {
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
        <div className="h-full flex-shrink">
            <ConditionalWrapper condition={!!chat?.id}>
                <div className="flex flex-row items-center gap-4 w-full border-b-[1px] border-gray py-2 px-4">
                    <div
                        className="rounded-full bg-gray-500 h-10 w-10 flex items-center justify-center border-2 border-black overflow-hidden">
                        <img
                            className="w-full h-full"
                            src={participant?.image ? APP_ENV.UPLOADS_URL + "/" + participant?.image : defaultImage}
                            alt="noData"
                        />
                    </div>

                    <h1 className="font-jost text-lg font-medium">{participant?.firstName} {participant?.lastName}</h1>
                </div>
            </ConditionalWrapper>

            <Show>
                <Show.When isTrue={data && data.length > 0}>
                    <div id="container" ref={containerRef}
                         className={`max-h-[51.5vh] overflow-x-hidden overflow-y-${isOverflow ? 'scroll' : 'hidden'}`}>
                        <div ref={contentRef} className="flex flex-col px-3 py-4 gap-5">
                            {
                                !isLoading && data &&
                                <MessagesList messages={[...data].reverse()} participant={participant}/>
                            }
                        </div>
                    </div>
                </Show.When>

                <Show.When isTrue={(!data || data.length === 0) && !chat}>
                    <NoData/>
                </Show.When>
            </Show>
        </div>
    )
}
export default MessagesSection;