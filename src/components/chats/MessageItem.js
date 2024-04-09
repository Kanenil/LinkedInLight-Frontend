import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import {getSendingTime} from "../../utils/date";
import {CheckIcon} from "@heroicons/react/16/solid";
import Show from "../../elements/shared/Show";

const DoubleCheck = ({className = 'w-4 h-4'}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 7L12 11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )
}

const MessageItem = ({message, participant}) => {
    if(message.sender.id === participant.id)
        return (
            <div className="flex flex-row gap-3">
                <div className="pl-1">
                    <div
                        className="rounded-full bg-gray-500 h-10 w-10 flex items-center justify-center border-2 border-black overflow-hidden">
                        <img
                            className="w-full h-full"
                            src={message.sender?.image ? APP_ENV.UPLOADS_URL + "/" + message.sender?.image : defaultImage}
                            alt="image"
                        />
                    </div>
                </div>

                <div className="flex-shrink border-[1px] border-[#B4BFDD] rounded-xl p-2 max-w-[20vw]">
                    <h3 className="font-jost text-wrap break-words">
                        {message.content}
                    </h3>
                </div>

                <h3 className="font-jost font-light text-sm mt-auto">
                    {getSendingTime(new Date(message?.sentAt))}
                </h3>

                <div className="mt-auto">
                    <Show>
                        <Show.When isTrue={message.isRead}>
                            <DoubleCheck className="w-6 h-6 stroke-black"/>
                        </Show.When>
                        <Show.Else>
                            <CheckIcon className="w-6 h-6"/>
                        </Show.Else>
                    </Show>
                </div>
            </div>
        )

    return (
        <div className="ml-auto flex flex-row gap-3">
            <div className="mt-auto">
                <Show>
                    <Show.When isTrue={message.isRead}>
                        <DoubleCheck className="w-6 h-6 stroke-black"/>
                    </Show.When>
                    <Show.Else>
                        <CheckIcon className="w-6 h-6"/>
                    </Show.Else>
                </Show>
            </div>

            <h3 className="font-jost font-light text-sm mt-auto">
                {getSendingTime(new Date(message?.sentAt))}
            </h3>

            <div className="flex-shrink bg-[#EEF1FB] rounded-xl p-2 max-w-[20vw]">
                <h3 className="font-jost text-wrap break-words">
                    {message.content}
                </h3>
            </div>

            <div className="pr-1">
                <div
                    className="rounded-full bg-gray-500 h-10 w-10 flex items-center justify-center border-2 border-black overflow-hidden">
                    <img
                        className="w-full h-full"
                        src={message.sender?.image ? APP_ENV.UPLOADS_URL + "/" + message.sender?.image : defaultImage}
                        alt="image"
                    />
                </div>
            </div>
        </div>
    )
}
export default MessageItem;