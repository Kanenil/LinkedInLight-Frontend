import noDataImage from "../../assets/empty-messages.png";
import {useQuery} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import Show from "../../elements/shared/Show";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";

const NoData = () => {
    return (
        <div className="my-auto mx-auto">
            <img className="mx-auto" src={noDataImage} alt="noData"></img>
        </div>
    )
}

const MessagesSection = ({ getParticipant, chat }) => {
    const {isLoading, data} = useQuery({
        queryFn: ({queryKey}) => ChatService.getAllMessages(queryKey[1]),
        queryKey: ['allChats', chat?.id],
        select: ({data}) => data,
        enabled: chat?.id !== undefined
    })

    const participant = getParticipant(chat);

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
                    {
                        !isLoading && data && data.map(message => (
                            <div
                                className="border-b-gray-200 border-b-[1px] pt-2 hover:bg-gray-200 transition-colors duration-300 transform cursor-pointer"
                            >

                            </div>
                        ))
                    }
                </Show.When>

                <Show.Else>
                    <NoData/>
                </Show.Else>
            </Show>
        </div>
    )
}
export default MessagesSection;