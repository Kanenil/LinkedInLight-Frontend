import noDataImage from "../../assets/empty-messages.png";
import {useQuery} from "@tanstack/react-query";
import ChatService from "../../services/chatService";
import Show from "../../elements/shared/Show";

const NoData = () => {
    return (
        <div className="my-auto mx-auto">
            <img className="mx-auto" src={noDataImage} alt="noData"></img>
        </div>
    )
}

const MessagesSection = ({ chat }) => {
    const {isLoading, data} = useQuery({
        queryFn: ({queryKey}) => ChatService.getAllMessages(queryKey[1]),
        queryKey: ['allChats', chat?.id],
        select: ({data}) => data,
        enabled: chat?.id !== undefined
    })

    return (
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
    )
}
export default MessagesSection;