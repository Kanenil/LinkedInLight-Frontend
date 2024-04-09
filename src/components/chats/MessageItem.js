import {APP_ENV} from "../../env";
import defaultImage from "../../assets/default-image.jpg";
import {getSendingTime} from "../../utils/date";
import {CheckIcon} from "@heroicons/react/16/solid";
import Show from "../../elements/shared/Show";
import ConditionalWrapper from "../../elements/shared/ConditionalWrapper";
import {DocumentIcon} from "@heroicons/react/24/outline";
import React from "react";
import {Link} from "react-router-dom";

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
    const fileExt = message.attachedFileName.split('.').pop() || '';
    const isImage = fileExt.match(/(jpg|jpeg|png|gif)$/i)?.length > 0;

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

                <div className="flex flex-col gap-1">
                    <ConditionalWrapper condition={fileExt}>
                        <Show>
                            <Show.When isTrue={isImage}>
                                <div
                                    className="rounded-lg border-[1px] border-[#B4BFDD] h-56 w-56 flex items-center justify-center overflow-hidden">
                                    <img
                                        className="object-contain"
                                        src={APP_ENV.UPLOADS_URL + "/" + message.attachedFileName}
                                        alt="attachedImage"
                                    />
                                </div>
                            </Show.When>

                            <Show.Else>
                                <Link to={`${APP_ENV.UPLOADS_URL}/${message.attachedFileName}`} target="_blank" className="flex flex-row gap-3 rounded-lg overflow-hidden items-center bg-gray-500 max-w-[20vw]">
                                    <div className="bg-gray-300 px-2 py-2">
                                        <DocumentIcon className="w-8 h-8"/>
                                    </div>

                                    <div className="pr-2">
                                        <h3 className="font-jost text-xl text-white truncate break-words">{message.attachedFileName}</h3>
                                    </div>
                                </Link>
                            </Show.Else>
                        </Show>
                    </ConditionalWrapper>


                    <div className="flex-shrink border-[1px] border-[#B4BFDD] rounded-xl p-2 max-w-[20vw]">
                        <h3 className="font-jost text-wrap break-words">
                            {message.content}
                        </h3>
                    </div>
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

            <div className="flex flex-col gap-1">
                <ConditionalWrapper condition={fileExt}>
                    <Show>
                        <Show.When isTrue={isImage}>
                            <div
                                className="rounded-lg ml-auto bg-[#EEF1FB] h-56 w-56 flex items-center justify-center overflow-hidden">
                                <img
                                    className="object-contain"
                                    src={APP_ENV.UPLOADS_URL + "/" + message.attachedFileName}
                                    alt="attachedImage"
                                />
                            </div>
                        </Show.When>

                        <Show.Else>
                            <Link to={`${APP_ENV.UPLOADS_URL}/${message.attachedFileName}`} target="_blank" className="flex flex-row gap-3 rounded-lg overflow-hidden items-center bg-gray-500 max-w-[20vw]">
                                <div className="bg-gray-300 px-2 py-2">
                                    <DocumentIcon className="w-8 h-8"/>
                                </div>

                                <div className="pr-2">
                                    <h3 className="font-jost text-xl text-white truncate break-words">{message.attachedFileName}</h3>
                                </div>
                            </Link>
                        </Show.Else>
                    </Show>
                </ConditionalWrapper>

                <div className="flex-shrink bg-[#EEF1FB] rounded-xl p-2 max-w-[20vw]">
                    <h3 className="font-jost text-wrap break-words">
                        {message.content}
                    </h3>
                </div>
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